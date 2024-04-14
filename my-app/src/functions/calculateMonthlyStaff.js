import { calculateStaffPerDay } from "./calculateStaffPerDay";

export function calculateMonthlyStaff(data) {
    const dailyStaff = [];

    for (let day = 1; day <= 31; day++) {
        const dayData = data.filter(item => {
            const itemDate = new Date(item.start);
            return itemDate.getDate() === day;
        });

        const staff = calculateStaffPerDay(dayData);
        dailyStaff.push(staff);
    }

    // Calculate the monthly average number of staff. Assuming not working on Sundays.
    const averageStaff = (dailyStaff.reduce((sum, current) => sum + current, 0) / 27).toFixed(0);

    return averageStaff;
}