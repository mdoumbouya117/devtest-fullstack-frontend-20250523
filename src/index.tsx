import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
	uri: 'https://countries.trevorblades.com/',
	cache: new InMemoryCache(),
})

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)
