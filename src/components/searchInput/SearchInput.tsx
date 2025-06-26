import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

export const SearchInput = ({
	value,
	onChange,
	placeholder,
}: {
	value: string
	onChange: (value: string) => void
	placeholder: string
}) => {
	return (
		<Input
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			prefix={<SearchOutlined />}
			style={{ width: 200 }}
		/>
	)
}
