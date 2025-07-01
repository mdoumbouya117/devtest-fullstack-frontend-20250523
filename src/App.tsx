import { useState, useRef, useCallback, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Card, Select, Space, Spin } from 'antd'
import { Country } from './types/ICountry'
import { debounce } from 'utils/debounce'
import { SearchInput } from './components/searchInput/SearchInput'
import { COUNTRIES_QUERY } from 'queries/countries'

interface QueryResult {
	countries: Country[]
}

const PAGE_SIZE = 10

export const App = () => {
	const { Option } = Select
	const [continentCode, setContinentCode] = useState('EU')
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCurrency, setSelectedCurrency] = useState('')
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
	const containerRef = useRef<HTMLDivElement>(null)
	const debouncedSearch = useRef<string>('')

	const debouncedSearchHandler = useCallback(
		debounce((term: string) => {
			if (!term) {
				debouncedSearch.current = ''
			} else {
				debouncedSearch.current = term
			}
			setVisibleCount(PAGE_SIZE) // Reset visible count when search changes
		}, 300),
		[]
	)

	const handleSearchChange = (value: string) => {
		setSearchTerm(value)
		debouncedSearchHandler(value)
	}

	const { data, loading } = useQuery<QueryResult>(COUNTRIES_QUERY, {
		variables: {
			continentCode,
		},
	})

	useEffect(() => {
		const handleScroll = () => {
			if (
				containerRef.current &&
				window.innerHeight + window.scrollY >=
					containerRef.current.offsetHeight - 200 && // 200px header-filters height
				!loading
			) {
				setVisibleCount((prev) => prev + PAGE_SIZE)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [loading])

	if (loading) {
		return <Spin size='large' style={{ display: 'block', margin: '20px' }} />
	}

	const { countries } = data || { countries: [] }

	if (!countries) {
		return <p>No countries found</p>
	}

	// Filter by search term (case-insensitive)
	const filteredCountries = searchTerm
		? countries.filter((country: Country) =>
				country.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: countries

	// Filter by currency if selected
	const finalFilteredCountries = selectedCurrency
		? filteredCountries.filter((country: Country) =>
				country.currencies.includes(selectedCurrency)
		  )
		: filteredCountries

	const visibleCountries = finalFilteredCountries.slice(0, visibleCount)

	return (
		<div ref={containerRef}>
			<Space direction='vertical' style={{ width: '100%' }}>
				<Space style={{ marginBottom: 16 }}>
					<Select
						value={continentCode}
						onChange={(value) => {
							setContinentCode(value)
							setVisibleCount(PAGE_SIZE) // Reset visible count when continent changes
						}}
						placeholder='Select a continent'
						style={{ width: 200 }}
					>
						<Option value='EU'>Europe</Option>
						<Option value='NA'>North America</Option>
						<Option value='SA'>South America</Option>
						<Option value='AS'>Asia</Option>
						<Option value='AF'>Africa</Option>
						<Option value='OC'>Oceania</Option>
					</Select>

					<Select
						value={selectedCurrency}
						onChange={(value) => {
							setSelectedCurrency(value)
							setVisibleCount(PAGE_SIZE)
						}}
						placeholder='Select a currency'
						style={{ width: 200 }}
					>
						<Option value=''>All currencies</Option>
						{countries
							.flatMap((country: Country) => country.currencies)
							.filter(
								(currency, index, self) =>
									index === self.findIndex((t) => t === currency)
							)
							.map((currency) => (
								<Option key={currency} value={currency}>
									{currency}
								</Option>
							))}
					</Select>

					<SearchInput
						value={searchTerm}
						onChange={handleSearchChange}
						placeholder='Search by country name'
					/>
				</Space>

				{visibleCountries.map((country) => (
					<Card key={country.code}>
						<h2>
							{country.emoji}
							{country.name}
						</h2>
						<div style={{ marginTop: 8 }}>
							{country.currencies.map((currency) => (
								<span key={currency} style={{ marginRight: 12 }}>
									{currency}
								</span>
							))}
						</div>
						<p>Capital: {country.capital}</p>
						<p>Continent: {country.continent.name}</p>
					</Card>
				))}

				{visibleCount >= finalFilteredCountries.length &&
					finalFilteredCountries.length > 0 && (
						<div style={{ textAlign: 'center', padding: '20px' }}>
							All countries loaded
						</div>
					)}
			</Space>
		</div>
	)
}
