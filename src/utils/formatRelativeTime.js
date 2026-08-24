const TIME_INTERVALS = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
]

export function formatRelativeTime(date) { 
  console.log("date : " , date)
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

  let duration = (date.getTime() - Date.now()) / 1000

  for (const division of TIME_INTERVALS) {
    if (Math.abs(duration) < division.amount) {
      
      return formatter.format(Math.round(duration), division.unit)
    }
    duration /= division.amount
  }
}
