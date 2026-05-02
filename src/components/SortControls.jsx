import PropTypes from 'prop-types'

const sortOptions = [
	{ value: 'default', label: 'Default order' },
	{ value: 'name', label: 'Name (A-Z)' },
	{ value: 'gpa', label: 'GPA (high to low)' },
]

function SortControls({ sortPreference, onSortChange }) {
	return (
		<div className="sort-controls" role="group" aria-label="Sort student cards">
			<span className="sort-controls__label">Sort</span>
			<div className="sort-controls__buttons">
				{sortOptions.map((option) => (
					<button
						key={option.value}
						type="button"
						className={option.value === sortPreference ? 'sort-controls__button sort-controls__button--active' : 'sort-controls__button'}
						onClick={() => onSortChange(option.value)}
					>
						{option.label}
					</button>
				))}
			</div>
		</div>
	)
}

SortControls.propTypes = {
	sortPreference: PropTypes.oneOf(['default', 'name', 'gpa']).isRequired,
	onSortChange: PropTypes.func.isRequired,
}

export { SortControls }