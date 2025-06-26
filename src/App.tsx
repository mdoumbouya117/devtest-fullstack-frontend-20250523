import { useState, useRef, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { Card, Select, Space } from 'antd'
import { Country } from './types/ICountry'
import { debounce } from 'utils/debounce'
import { SearchInput } from './components/searchInput/SearchInput'
import { COUNTRIES_QUERY } from 'queries/countries'

interface QueryResult {
	countries: Country[]
}

export const App = () => {
	const { Option } = Select
	const [continentCode, setContinentCode] = useState('EU')
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCurrency, setSelectedCurrency] = useState('')
	const debouncedSearch = useRef<string>('')

	const debouncedSearchHandler = useCallback(
		debounce((term: string) => {
			if (!term) {
				debouncedSearch.current = ''
			} else {
				debouncedSearch.current = term
			}
		}, 300),
		[]
	)

	// Create a handler for search changes
	const handleSearchChange = (value: string) => {
		setSearchTerm(value)
		debouncedSearchHandler(value)
	}

	const { data, loading } = useQuery<QueryResult>(COUNTRIES_QUERY, {
		variables: {
			continentCode,
		},
	})

	if (loading) {
		return <p>Loading...</p>
	}

	const { countries } = data || { countries: [] }

	if (!data?.countries) {
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

	return (
		<Space direction='vertical' style={{ width: '100%' }}>
			<Space style={{ marginBottom: 16 }}>
				<Select
					value={continentCode}
					onChange={setContinentCode}
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
					onChange={setSelectedCurrency}
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

			{finalFilteredCountries.map((country: Country) => (
				<Card key={country.code}>
					<h2>
						{country.emoji}
						{country.name}
					</h2>
					<div style={{ marginTop: 8 }}>
						{country.currencies.map((currency, index) => (
							<span key={currency} style={{ marginRight: 12 }}>
								{currency}
							</span>
						))}
					</div>
					<p>Capital: {country.capital}</p>
					<p>Continent: {country.continent.name}</p>
				</Card>
			))}
		</Space>
	)
}
