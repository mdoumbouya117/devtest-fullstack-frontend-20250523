export interface Country {
	name: string
	code: string
	capital: string
	continent: {
		name: string
		code: string
	}
	currencies: string[]
	emoji: string
}