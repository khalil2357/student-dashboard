import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StudentContext = createContext(null)
const studentStorageKey = 'student-dashboard-student-state'

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

function readStoredStudentState() {
  try {
    const rawState = window.localStorage.getItem(studentStorageKey)

    if (!rawState) {
      return null
    }

    return JSON.parse(rawState)
  } catch {
    return null
  }
}

function StudentProvider({ children }) {
  const [students, setStudents] = useState([])
  const [query, setQuery] = useState('')
  const [sortPreference, setSortPreference] = useState('default')
  const [favoriteIds, setFavoriteIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedState = readStoredStudentState()

      if (storedState && Array.isArray(storedState.students)) {
        setStudents(storedState.students)
        setQuery(typeof storedState.query === 'string' ? storedState.query : '')
        setSortPreference(
          storedState.sortPreference === 'name' || storedState.sortPreference === 'gpa'
            ? storedState.sortPreference
            : 'default',
        )
        setFavoriteIds(Array.isArray(storedState.favoriteIds) ? storedState.favoriteIds : [])
      } else {
        setStudents(studentSeed)
      }

      setIsLoading(false)
      setHasHydrated(true)
    }, 1500)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (!hasHydrated) {
      return
    }

    try {
      window.localStorage.setItem(
        studentStorageKey,
        JSON.stringify({ students, query, sortPreference, favoriteIds }),
      )
    } catch {
      // Ignore storage failures and keep the in-memory version working.
    }
  }, [students, query, sortPreference, favoriteIds, hasHydrated])

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

  const addStudent = (student) => {
    setStudents((currentStudents) => [...currentStudents, student])
  }

  const removeStudent = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId),
    )
    setFavoriteIds((currentFavoriteIds) =>
      currentFavoriteIds.filter((favoriteId) => favoriteId !== studentId),
    )
  }

  const toggleFavorite = (studentId) => {
    setFavoriteIds((currentFavoriteIds) =>
      currentFavoriteIds.includes(studentId)
        ? currentFavoriteIds.filter((favoriteId) => favoriteId !== studentId)
        : [...currentFavoriteIds, studentId],
    )
  }

  const value = useMemo(
    () => ({
      students,
      visibleStudents,
      query,
      setQuery,
      sortPreference,
      setSortPreference,
      favoriteIds,
      favoriteCount: favoriteIds.length,
      isLoading,
      addStudent,
      removeStudent,
      toggleFavorite,
      totalStudents: students.length,
      visibleStudentCount: visibleStudents.length,
    }),
    [
      students,
      visibleStudents,
      query,
      sortPreference,
      favoriteIds,
      isLoading,
      addStudent,
      removeStudent,
    ],
  )

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
}

function useStudentContext() {
  const context = useContext(StudentContext)

  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider')
  }

  return context
}

StudentProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { StudentContext, StudentProvider, studentSeed, useStudentContext }