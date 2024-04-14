export function calculateStaffPerDay(dailyData) {
    let allStaff = [];

    dailyData.forEach(entry => {
      allStaff = allStaff.concat(entry.staff);
    });

    const uniqueStaff = new Set(allStaff);
    return uniqueStaff.size;
};
