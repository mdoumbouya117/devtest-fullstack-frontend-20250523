import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd'
import { theme } from './theme'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
	uri: 'https://countries.trevorblades.com/',
	cache: new InMemoryCache(),
})

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<ConfigProvider theme={theme}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</ConfigProvider>
	</React.StrictMode>
)
