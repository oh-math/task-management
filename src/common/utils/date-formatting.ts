function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function skipDay(days: number): Date {
  const today = new Date();
  const plusOne = today.setDate(today.getDate() + days);
  const convertToDate = new Date(plusOne);

  return convertToDate;
}

export { formatDate, skipDay  };
