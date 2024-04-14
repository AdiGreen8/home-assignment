export function calculateUtilization(dailyData) {
    const totalMinutes = 16 * 60; // Total minutes in a day
    let usedMinutes = 0;

    if (dailyData.length === 0) {
      return 0;
    }

    dailyData.forEach(entry => {
      const start = new Date(entry.start);
      const end = new Date(entry.end);
      const duration = (end - start) / (1000 * 60); // Duration in minutes
      usedMinutes += duration;
    });

    const utilizationPercentage = ((usedMinutes / totalMinutes) * 100) / 32;
    return utilizationPercentage.toFixed(2); // Keeping two decimal places
};
