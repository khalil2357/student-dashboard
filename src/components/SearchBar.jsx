import PropTypes from 'prop-types'
import { useStudentContext } from '../contexts/StudentContext.jsx'


function SearchBar() {
	const { query, setQuery } = useStudentContext()

	return (
		<label className="search-bar">
			<span className="search-bar__label">Search</span>
			<input
				type="search"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				placeholder="Search by name or major"
			/>
		</label>
	)
}

SearchBar.propTypes = {
	query: PropTypes.string,
}

export { SearchBar }