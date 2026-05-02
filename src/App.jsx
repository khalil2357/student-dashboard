import { useEffect } from 'react'
import './App.css'
import { AddStudentForm } from './components/AddStudentForm.jsx'
import { DashboardHeader } from './components/DashboardHeader.jsx'
import { SearchBar } from './components/SearchBar.jsx'
import { SortControls } from './components/SortControls.jsx'
import { StatBadge } from './components/StatBadge.jsx'
import { StudentCard } from './components/StudentCard.jsx'
import { useStudentContext } from './contexts/StudentContext.jsx'

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Students', href: '#students' },
  { label: 'Progress', href: '#progress' },
]

function App() {
  const { visibleStudents, isLoading, totalStudents, favoriteCount, visibleStudentCount } =
    useStudentContext()

  useEffect(() => {
    document.title = `Dashboard — ${visibleStudentCount} Students`
  }, [visibleStudentCount])

  return (
    <div className="dashboard-shell">
      <DashboardHeader
        title="Student Dashboard"
        tagline="An interactive lab shell for tracking academic progress, search, sort, and favorite students."
        navLinks={navLinks}
      />

      <main className="dashboard-main">
        <section className="overview-panel" id="overview">
          <div className="overview-copy">
            <p className="eyebrow">Lab 03 • Context, Validation & Persistence</p>
            <h1>Global student state with a validated registration flow.</h1>
            <p className="overview-text">
              Theme, student data, search, sorting, favorites, and persistence now live in global
              context while the registration form adds new students without a page reload.
            </p>
            <div className="stat-row">
              <StatBadge label="Loaded" value={isLoading ? '0' : `${totalStudents}`} />
              <StatBadge label="Visible" value={`${visibleStudentCount}`} />
              <StatBadge label="Favorites" value={`${favoriteCount}`} />
            </div>
          </div>

          <aside className="overview-card" id="progress">
            <p className="card-label">Weekly Focus</p>
            <h2>Search and filter without reloading the page.</h2>
            <div className="progress-metrics">
              <StatBadge label="Attendance" value="96%" />
              <StatBadge label="Assignments" value="18 due" />
            </div>
            <p className="supporting-copy">
              The document title follows the number of students shown after filtering.
            </p>
          </aside>
        </section>

        <AddStudentForm />

        <section className="student-section" id="students">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Student Roster</p>
              <h2>Filter, sort, favorite, and remove students.</h2>
            </div>
            <p className="section-note">
              Search, sort, and manage the roster from shared context state.
            </p>
          </div>

          <div className="controls-row">
            <SearchBar />
            <SortControls />
          </div>

          {isLoading ? (
            <div className="loading-state" aria-live="polite">
              <div className="spinner" aria-hidden="true" />
              <p>Loading student data...</p>
            </div>
          ) : visibleStudents.length > 0 ? (
            <div className="student-grid">
              {visibleStudents.map((student) => (
                <StudentCard key={student.id} {...student} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No students matched your search.</h3>
              <p>Try a different name or major, or clear the search box to restore the full list.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App