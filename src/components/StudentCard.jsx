import PropTypes from 'prop-types'
import { CourseTag } from './CourseTag.jsx'
import { StatBadge } from './StatBadge.jsx'

function StudentCard({ name, id, avatar, gpa, major, credits, courses }) {
	return (
		<article className="student-card">
			<div className="student-card__top">
				<img className="student-card__avatar" src={avatar} alt={`${name} avatar`} />
				<div>
					<h3 className="student-card__name">{name}</h3>
					<p className="student-card__meta">
						{id} · {major}
					</p>
				</div>
			</div>

			<div className="student-card__details">
				<div className="student-card__badges">
					<StatBadge label="GPA" value={gpa} />
					<StatBadge label="Credits" value={credits} />
				</div>

				<div className="student-card__badges">
					{courses.map((course) => (
						<CourseTag key={course.courseName} courseName={course.courseName} color={course.color} />
					))}
				</div>
			</div>
		</article>
	)
}

StudentCard.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	gpa: PropTypes.string.isRequired,
	major: PropTypes.string.isRequired,
	credits: PropTypes.string.isRequired,
	courses: PropTypes.arrayOf(
		PropTypes.shape({
			courseName: PropTypes.string.isRequired,
			color: PropTypes.string.isRequired,
		}),
	).isRequired,
}

export { StudentCard }
