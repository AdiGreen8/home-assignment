export function calculateMonthlyUtilization(data) {
    const dailyUtilizations = [];

    for (let day = 1; day <= 31; day++) {
        const dayData = data.filter(item => {
            const itemDate = new Date(item.start);
            return itemDate.getDate() === day;
        });

        const totalMinutes = 16 * 60; // Total operational minutes in a day
        let usedMinutes = 0;
        dayData.forEach(entry => {
            const start = new Date(entry.start);
            const end = new Date(entry.end);
            usedMinutes += (end - start) / (1000 * 60);
        });

        const dailyUtilization = ((usedMinutes / totalMinutes) * 100) / 32;
        dailyUtilizations.push(dailyUtilization);
    }

    // Calculate the monthly average utilizaion precent. Assuming not working on Sundays.
    const averageUtilization = (dailyUtilizations.reduce((sum, current) => sum + current, 0) / 27);

    return averageUtilization.toFixed(2);
}