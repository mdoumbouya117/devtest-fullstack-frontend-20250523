import React, { Fragment } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Country } from './types/ICountry'
import { Card } from 'antd'

interface QueryResult {
	countries: Country[]
}

const COUNTRIES_QUERY = gql`
	query Counties($code: String) {
		countries(filter: { continent: { eq: $code } }) {
			name
			code
			capital
			continent {
				name
			}
			emoji
		}
	}
`

export const App: React.FC = () => {
	const continentCode = 'EU'
	const { data, loading } = useQuery<QueryResult>(COUNTRIES_QUERY, {
		variables: {
			code: continentCode,
		},
	})

	if (loading) {
		return <p>Loading...</p>
	}

	if (!data?.countries) {
		return <p>No countries found</p>
	}

	const { countries } = data
	console.log('countries', countries)

	return (
		<>
			{countries.map((country: Country) => (
				<Card
					key={country.code}
					title={
						<>
							<h2>
								{country.name} <span>{country.emoji}</span>
							</h2>
						</>
					}
				>
					<p>Capital: {country.capital}</p>
					<p>Continent: {country.continent.name}</p>
				</Card>
			))}
		</>
	)
}
