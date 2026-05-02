import PropTypes from 'prop-types'

const courseShape = PropTypes.shape({
	courseName: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
})

const navLinkShape = PropTypes.shape({
	label: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
})

export { courseShape, navLinkShape }
