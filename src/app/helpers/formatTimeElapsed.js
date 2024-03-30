function formatTimeElapsed(createdAt) {
  const createdAtDate = new Date(createdAt); // Convert createdAt to a Date object
  const currentTime = new Date(); // Current time

  // Calculate the difference in milliseconds
  const timeDifference = currentTime - createdAtDate;

  // Convert milliseconds to seconds
  const secondsElapsed = Math.floor(timeDifference / 1000);

  // Convert seconds to minutes
  const minutesElapsed = Math.floor(secondsElapsed / 60);

  // Convert minutes to hours
  const hoursElapsed = Math.floor(minutesElapsed / 60);

  // Convert hours to days
  const daysElapsed = Math.floor(hoursElapsed / 24);

  // Construct the elapsed time string based on the difference
  if (daysElapsed > 0) {
    return `${daysElapsed} day${daysElapsed === 1 ? "" : "s"}`;
  } else if (hoursElapsed > 0) {
    return `${hoursElapsed} hour${hoursElapsed === 1 ? "" : "s"}`;
  } else if (minutesElapsed > 0) {
    return `${minutesElapsed} minute${minutesElapsed === 1 ? "" : "s"}`;
  } else {
    return `${secondsElapsed} second${secondsElapsed === 1 ? "" : "s"}`;
  }
}



export default formatTimeElapsed