export function formatDateTime(toBeFormatted) {
  const dateTime = new Date(toBeFormatted);

  const day = String(dateTime.getUTCDate()).padStart(2, "0");
  const month = String(dateTime.getUTCMonth() + 1).padStart(2, "0");
  const year = dateTime.getUTCFullYear();

  let hours = String(dateTime.getUTCHours()).padStart(2, "0");
  const minutes = String(dateTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(dateTime.getUTCSeconds()).padStart(2, "0");

  const amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = String(hours).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${amPm}`;
}
