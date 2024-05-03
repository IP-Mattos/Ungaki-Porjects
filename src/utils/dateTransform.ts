export function dateTransform(date: string): string {
  const formattedDate = date.split('T')[0]

  return `User was created at ${formattedDate}`
}
