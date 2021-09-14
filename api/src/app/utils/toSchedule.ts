const toSchedule = (start: Date, end: Date) => {
  const startDateTime = new Date(start)
  const endDateTime = new Date(end)

  const startDate = startDateTime.toLocaleDateString()
  const endDate = endDateTime.toLocaleDateString()

  const startTime = startDateTime.toTimeString()
  const endTime = endDateTime.toTimeString()

  return {
    start_date_time: startDateTime,
    end_date_time: endDateTime,
    start_date: startDate,
    end_date: endDate,
    start_time: startTime,
    end_time: endTime,
  }
}

export default toSchedule
