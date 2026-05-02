import PropTypes from 'prop-types'
import { StatBadge } from './StatBadge.jsx'

function DashboardHeader({ title, tagline, navLinks, favoriteCount }) {
	return (
		<header className="dashboard-header">
			<div className="dashboard-header__brand">
				<p className="eyebrow">Course 01</p>
				<h2>{title}</h2>
				<p className="dashboard-header__tagline">{tagline}</p>
			</div>

			<div className="dashboard-header__meta">
				<StatBadge label="Favorites" value={`${favoriteCount}`} />
				<nav className="dashboard-header__nav" aria-label="Dashboard navigation">
					{navLinks.map((link) => (
						<a key={link.label} href={link.href}>
							{link.label}
						</a>
					))}
				</nav>
			</div>
		</header>
	)
}

DashboardHeader.propTypes = {
	title: PropTypes.string.isRequired,
	tagline: PropTypes.string.isRequired,
	favoriteCount: PropTypes.number.isRequired,
	navLinks: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			href: PropTypes.string.isRequired,
		}),
	).isRequired,
}

export { DashboardHeader }
