import PropTypes from 'prop-types'

function DashboardHeader({ title, tagline, navLinks }) {
	return (
		<header className="dashboard-header">
			<div className="dashboard-header__brand">
				<p className="eyebrow">Course 01</p>
				<h2>{title}</h2>
				<p className="dashboard-header__tagline">{tagline}</p>
			</div>

			<nav className="dashboard-header__nav" aria-label="Dashboard navigation">
				{navLinks.map((link) => (
					<a key={link.label} href={link.href}>
						{link.label}
					</a>
				))}
			</nav>
		</header>
	)
}

DashboardHeader.propTypes = {
	title: PropTypes.string.isRequired,
	tagline: PropTypes.string.isRequired,
	navLinks: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			href: PropTypes.string.isRequired,
		}),
	).isRequired,
}

export { DashboardHeader }
