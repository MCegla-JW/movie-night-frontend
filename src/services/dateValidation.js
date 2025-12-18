 const validateDates = (date) => {
  const errors = {}
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const start = new Date(date)

  if (start < today) {
    errors.date = 'Start date cannot be in the past'
  }

  return errors
}

export default validateDates;