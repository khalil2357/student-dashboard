import './App.css'
import { DashboardHeader } from './components/DashboardHeader.jsx'
import { StatBadge } from './components/StatBadge.jsx'
import { StudentCard } from './components/StudentCard.jsx'

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Students', href: '#students' },
  { label: 'Progress', href: '#progress' },
]

const dashboardStats = [
  { label: 'Students', value: '4 active' },
  { label: 'Average GPA', value: '3.74' },
  { label: 'Credits', value: '342 total' },
]

const students = [
  {
    name: 'MD.Ibrahim Khalil',
    id: '22-00000-2',
    avatar:'https://res.cloudinary.com/di1vdilgj/image/upload/v1771232115/619341310_122270096810080301_1226781632614892647_n.jpg_td9xor.jpg',
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
    avatar:'https://res.cloudinary.com/di1vdilgj/image/upload/v1771251441/20250123_133704_-_Zahid_Hossain_vz8yhb.jpg',
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
    avatar:'https://res.cloudinary.com/di1vdilgj/image/upload/v1762953429/581003583_3733038910337042_4141296100562369170_n_sjzcir.jpg',
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
    avatar:'https://res.cloudinary.com/di1vdilgj/image/upload/v1771251397/new_image_-_Md._Atikur_Rahman_hqfp44.jpg',
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
  return (
    <div className="dashboard-shell">
      <DashboardHeader
        title="Student Dashboard"
        tagline="A static UI shell for tracking academic progress, enrolled courses, and key performance stats."
        navLinks={navLinks}
      />

      <main className="dashboard-main">
        <section className="overview-panel" id="overview">
          <div className="overview-copy">
            <p className="eyebrow">Lab 01 • React Components, Props & Custom Styling</p>
            <h1>Reusable components, consistent props, and a clean design system.</h1>
            <p className="overview-text">
              This dashboard demonstrates component decomposition with reusable student cards,
              course badges, and stat badges, all styled with CSS variables.
            </p>
            <div className="stat-row">
              {dashboardStats.map((stat) => (
                <StatBadge key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          </div>

          <aside className="overview-card" id="progress">
            <p className="card-label">Weekly Focus</p>
            <h2>Course momentum is steady across all active students.</h2>
            <div className="progress-metrics">
              <StatBadge label="Attendance" value="96%" />
              <StatBadge label="Assignments" value="18 due" />
            </div>
            <p className="supporting-copy">
              Summary cards are reused here and inside each student card to keep the dashboard
              visually consistent.
            </p>
          </aside>
        </section>

        <section className="student-section" id="students">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Student Roster</p>
              <h2>Four students, one shared component system.</h2>
            </div>
            <p className="section-note">
              Each card receives its data through props, and every badge is rendered from a
              reusable component.
            </p>
          </div>

          <div className="student-grid">
            {students.map((student) => (
              <StudentCard key={student.id} {...student} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App