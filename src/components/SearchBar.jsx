import PropTypes from 'prop-types'

function SearchBar({ query, onQueryChange, placeholder }) {
	return (
		<label className="search-bar">
			<span className="search-bar__label">Search</span>
			<input
				type="search"
				value={query}
				onChange={(event) => onQueryChange(event.target.value)}
				placeholder={placeholder}
			/>
		</label>
	)
}

SearchBar.propTypes = {
	query: PropTypes.string.isRequired,
	onQueryChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
}

SearchBar.defaultProps = {
	placeholder: 'Search students',
}

export { SearchBar }