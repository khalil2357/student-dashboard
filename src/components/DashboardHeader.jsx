import PropTypes from 'prop-types'
import { useStudentContext } from '../contexts/StudentContext.jsx'
import { useTheme } from '../contexts/ThemeContext.jsx'
import { StatBadge } from './StatBadge.jsx'


function DashboardHeader({ title, tagline, navLinks }) {
	const { favoriteCount } = useStudentContext()
	const { theme, toggleTheme } = useTheme()
	const nextThemeLabel = theme === 'light' ? 'Dark Mode' : 'Light Mode'

	return (
		<header className="dashboard-header">
			<div className="dashboard-header__brand">
				<p className="eyebrow">Course 01</p>
				<h2>{title}</h2>
				<p className="dashboard-header__tagline">{tagline}</p>
			</div>

			<div className="dashboard-header__meta">
				<button type="button" className="theme-toggle" onClick={toggleTheme}>
					{nextThemeLabel}
				</button>
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
	navLinks: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			href: PropTypes.string.isRequired,
		}),
	).isRequired,
}

export { DashboardHeader }
