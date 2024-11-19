import cron from 'node-cron'

export const numberEnumToArray = (numberEnum: { [key: string]: string | number }) => {
  return Object.values(numberEnum).filter((value) => typeof value === 'number')
}

export const createNodeCron = (payload: {
  startTime: Date
  startTimeFunc: () => any
  endTime: Date
  endTimeFunc: () => any
}) => {
  // Parse ISO 8601 timestamps for accurate scheduling
  const startTime = new Date(payload.startTime)
  const endTime = new Date(payload.endTime)
  // console.log(startTime.getTime(), 'startTime')
  // Ensure startTime is before endTime to prevent unexpected behavior
  if (startTime >= endTime) {
    throw new Error('Start time must be before end time')
  }

  const cronJobOnGoingSchedule = `${startTime.getMinutes()} ${startTime.getHours()} ${startTime.getDate()} ${startTime.getMonth() + 1} *`

  const cronJobCompletedSchedule = `${endTime.getMinutes()} ${endTime.getHours()} ${endTime.getDate()} ${endTime.getMonth() + 1} *`
  const startJob = cron.schedule(cronJobOnGoingSchedule, async () => {
    console.log(payload?.startTimeFunc())
    await payload?.startTimeFunc()
  })
  startJob.start()
  const endJob = cron.schedule(cronJobCompletedSchedule, async () => {
    await payload?.endTimeFunc()
  })
  endJob.start()
  return {
    startJob,
    endJob
  }
}
