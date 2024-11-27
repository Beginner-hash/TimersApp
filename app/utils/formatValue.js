export const formatTimeValue = (value, maxVal) => {
  // Remove non-numeric characters
  let numericValue = value.replace(/\D/g, "");

  // Clamp the value between 0 and maxValue
  numericValue = Math.min(Math.max(0, parseInt(numericValue) || 0), maxVal);

  // Return the value as a 2-digit string
  return numericValue.toString().padStart(2, "0");
};
