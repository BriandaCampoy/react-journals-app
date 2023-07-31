/**
 * Formats a date object into a string with the format "day month year".
 * @param {Date} date - The date object to be formatted.
 * @returns {string} The formatted date string in the format "day month year".
 */
const DateFormater = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return `${day} ${months[month - 1]} ${year}`;
};

export default DateFormater;
