import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { DashboardHeader } from './components/DashboardHeader.jsx'
import { SearchBar } from './components/SearchBar.jsx'
import { SortControls } from './components/SortControls.jsx'
import { StatBadge } from './components/StatBadge.jsx'
import { StudentCard } from './components/StudentCard.jsx'

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Students', href: '#students' },
  { label: 'Progress', href: '#progress' },
]

const studentSeed = [
  {
    name: 'MD.Ibrahim Khalil',
    id: '22-00000-2',
    avatar:
      'https://res.cloudinary.com/di1vdilgj/image/upload/v1771232115/619341310_122270096810080301_1226781632614892647_n.jpg_td9xor.jpg',
    gpa: '3.92',
    major: 'Computer Science',
    credits: '96',
    courses: [
      { courseName: 'UI Design', color: '#3b82f6' },
      { courseName: 'Data Structures', color: '#10b981' },
      { courseName: 'Calculus II', color: '#f97316' },
    ],
  },
  {
    name: 'Zahid Hossain',
    id: '22-00001-1',
    avatar:
      'https://res.cloudinary.com/di1vdilgj/image/upload/v1771251441/20250123_133704_-_Zahid_Hossain_vz8yhb.jpg',
    gpa: '3.71',
    major: 'Information Systems',
    credits: '88',
    courses: [
      { courseName: 'Database Systems', color: '#8b5cf6' },
      { courseName: 'Project Management', color: '#ef4444' },
      { courseName: 'Business Writing', color: '#14b8a6' },
    ],
  },
  {
    name: 'Nur Hossain',
    id: '22-00002-0',
    avatar:
      'https://res.cloudinary.com/di1vdilgj/image/upload/v1762953429/581003583_3733038910337042_4141296100562369170_n_sjzcir.jpg',
    gpa: '3.84',
    major: 'Data Science',
    credits: '102',
    courses: [
      { courseName: 'Machine Learning', color: '#22c55e' },
      { courseName: 'Statistics', color: '#eab308' },
      { courseName: 'Research Methods', color: '#0ea5e9' },
    ],
  },
  {
    name: 'Atikur Rahman',
    id: '22-00003-3',
    avatar:
      'https://res.cloudinary.com/di1vdilgj/image/upload/v1771251397/new_image_-_Md._Atikur_Rahman_hqfp44.jpg',
    gpa: '3.57',
    major: 'Software Engineering',
    credits: '90',
    courses: [
      { courseName: 'Web APIs', color: '#06b6d4' },
      { courseName: 'Mobile Dev', color: '#f43f5e' },
      { courseName: 'Algorithms', color: '#84cc16' },
    ],
  },
]

function App() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sortPreference, setSortPreference] = useState('default')
  const [favoriteIds, setFavoriteIds] = useState([])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setStudents(studentSeed)
      setIsLoading(false)
    }, 1500)

    return () => window.clearTimeout(timeoutId)
  }, [])

  const visibleStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const filteredStudents = students.filter((student) => {
      if (!normalizedQuery) {
        return true
      }

      return (
        student.name.toLowerCase().includes(normalizedQuery) ||
        student.major.toLowerCase().includes(normalizedQuery)
      )
    })

    const sortedStudents = [...filteredStudents]

    if (sortPreference === 'name') {
      sortedStudents.sort((leftStudent, rightStudent) =>
        leftStudent.name.localeCompare(rightStudent.name),
      )
    }

    if (sortPreference === 'gpa') {
      sortedStudents.sort(
        (leftStudent, rightStudent) =>
          Number.parseFloat(rightStudent.gpa) - Number.parseFloat(leftStudent.gpa),
      )
    }

    return sortedStudents
  }, [query, sortPreference, students])

  useEffect(() => {
    document.title = `Dashboard — ${visibleStudents.length} Students`
  }, [visibleStudents.length])

  const handleFavoriteToggle = (studentId, nextFavoriteState) => {
    setFavoriteIds((currentFavoriteIds) => {
      if (nextFavoriteState) {
        if (currentFavoriteIds.includes(studentId)) {
          return currentFavoriteIds
        }

        return [...currentFavoriteIds, studentId]
      }

      return currentFavoriteIds.filter((favoriteId) => favoriteId !== studentId)
    })
  }

  return (
    <div className="dashboard-shell">
      <DashboardHeader
        title="Student Dashboard"
        tagline="An interactive lab shell for tracking academic progress, search, sort, and favorite students."
        navLinks={navLinks}
        favoriteCount={favoriteIds.length}
      />

      <main className="dashboard-main">
        <section className="overview-panel" id="overview">
          <div className="overview-copy">
            <p className="eyebrow">Lab 02 • State Management, Side Effects & Interactivity</p>
            <h1>Dynamic student cards with search, sorting, and favorites.</h1>
            <p className="overview-text">
              Student data loads after a short simulated fetch, the list updates live as you type,
              and sort controls keep the roster organized.
            </p>
            <div className="stat-row">
              <StatBadge label="Loaded" value={isLoading ? '0' : `${students.length}`} />
              <StatBadge label="Visible" value={`${visibleStudents.length}`} />
              <StatBadge label="Favorites" value={`${favoriteIds.length}`} />
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

        <section className="student-section" id="students">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Student Roster</p>
              <h2>Filter, sort, and favorite the current students.</h2>
            </div>
            <p className="section-note">
              Search by name or major, then choose a sort order before reviewing each student card.
            </p>
          </div>

          <div className="controls-row">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              placeholder="Search by name or major"
            />
            <SortControls sortPreference={sortPreference} onSortChange={setSortPreference} />
          </div>

          {isLoading ? (
            <div className="loading-state" aria-live="polite">
              <div className="spinner" aria-hidden="true" />
              <p>Loading student data...</p>
            </div>
          ) : visibleStudents.length > 0 ? (
            <div className="student-grid">
              {visibleStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  {...student}
                  isFavorite={favoriteIds.includes(student.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
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