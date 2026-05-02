import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useStudentContext } from '../contexts/StudentContext.jsx'

const coursePalette = ['#2957ff', '#7c3aed', '#0ea5e9', '#16a34a', '#f97316', '#ef4444']

function createAvatarUrl(fullName) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=2957ff&color=ffffff&size=256`
}

function buildCourseRecords(courseNames) {
  return courseNames.map((courseName, index) => ({
    courseName,
    color: coursePalette[index % coursePalette.length],
  }))
}

function AddStudentForm() {
  const { addStudent, students } = useStudentContext()
  const [formState, setFormState] = useState({
    fullName: '',
    studentId: '',
    major: '',
    gpa: '',
    courses: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (!successMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage('')
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [successMessage])

  const handleFieldChange = (fieldName) => (event) => {
    const nextValue = event.target.value

    setFormState((currentState) => ({
      ...currentState,
      [fieldName]: nextValue,
    }))

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: '',
    }))
  }

  const validateForm = () => {
    const nextErrors = {}
    const trimmedName = formState.fullName.trim()
    const trimmedId = formState.studentId.trim()
    const trimmedMajor = formState.major.trim()
    const parsedGpa = Number.parseFloat(formState.gpa)

    if (!trimmedName) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!trimmedId) {
      nextErrors.studentId = 'Student ID is required.'
    } else if (!/^\d+$/.test(trimmedId)) {
      nextErrors.studentId = 'Student ID must contain numbers only.'
    } else if (students.some((student) => student.id === trimmedId)) {
      nextErrors.studentId = 'Student ID must be unique.'
    }

    if (!trimmedMajor) {
      nextErrors.major = 'Major is required.'
    }

    if (formState.gpa.trim() === '') {
      nextErrors.gpa = 'GPA is required.'
    } else if (Number.isNaN(parsedGpa) || parsedGpa < 0 || parsedGpa > 4) {
      nextErrors.gpa = 'GPA must be between 0 and 4.0.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      setSuccessMessage('')
      return
    }

    const courseNames = formState.courses
      .split(',')
      .map((courseName) => courseName.trim())
      .filter(Boolean)

    const normalizedName = formState.fullName.trim()
    const normalizedStudentId = formState.studentId.trim()
    const normalizedMajor = formState.major.trim()
    const normalizedGpa = Number.parseFloat(formState.gpa).toFixed(2)
    const parsedCourses = buildCourseRecords(
      courseNames.length > 0 ? courseNames : ['General Studies'],
    )

    addStudent({
      name: normalizedName,
      id: normalizedStudentId,
      avatar: createAvatarUrl(normalizedName),
      gpa: normalizedGpa,
      major: normalizedMajor,
      credits: String(Math.max(12, parsedCourses.length * 3)),
      courses: parsedCourses,
    })

    setFormState({
      fullName: '',
      studentId: '',
      major: '',
      gpa: '',
      courses: '',
    })
    setFieldErrors({})
    setSuccessMessage(`${normalizedName} was added successfully.`)
  }

  return (
    <section className="registration-panel" id="register">
      <div className="section-heading registration-panel__heading">
        <div>
          <p className="eyebrow">Registration</p>
          <h2>Add a new student</h2>
        </div>
        <p className="section-note">
          Validation happens inline, and a success message disappears automatically after three
          seconds.
        </p>
      </div>

      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="field-group">
            <span className="field-label">Full Name</span>
            <input
              type="text"
              value={formState.fullName}
              onChange={handleFieldChange('fullName')}
              placeholder="Enter student full name"
            />
            {fieldErrors.fullName ? <span className="field-error">{fieldErrors.fullName}</span> : null}
          </label>

          <label className="field-group">
            <span className="field-label">Student ID</span>
            <input
              type="text"
              inputMode="numeric"
              value={formState.studentId}
              onChange={handleFieldChange('studentId')}
              placeholder="Numeric ID only"
            />
            {fieldErrors.studentId ? (
              <span className="field-error">{fieldErrors.studentId}</span>
            ) : null}
          </label>

          <label className="field-group">
            <span className="field-label">Major</span>
            <input
              type="text"
              value={formState.major}
              onChange={handleFieldChange('major')}
              placeholder="Enter major"
            />
            {fieldErrors.major ? <span className="field-error">{fieldErrors.major}</span> : null}
          </label>

          <label className="field-group">
            <span className="field-label">GPA</span>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={formState.gpa}
              onChange={handleFieldChange('gpa')}
              placeholder="0.00 - 4.00"
            />
            {fieldErrors.gpa ? <span className="field-error">{fieldErrors.gpa}</span> : null}
          </label>
        </div>

        <label className="field-group field-group--full">
          <span className="field-label">Courses</span>
          <textarea
            rows="3"
            value={formState.courses}
            onChange={handleFieldChange('courses')}
            placeholder="Comma-separated courses, e.g. Web Design, Algorithms, Research"
          />
          <span className="field-help">Separate multiple courses with commas.</span>
        </label>

        <div className="form-actions">
          <button type="submit" className="form-submit">
            Add Student
          </button>
          {successMessage ? (
            <p className="form-notification form-notification--success" aria-live="polite">
              {successMessage}
            </p>
          ) : (
            <p className="form-notification">The new student appears immediately in the roster.</p>
          )}
        </div>
      </form>
    </section>
  )
}

AddStudentForm.propTypes = {}

export { AddStudentForm }