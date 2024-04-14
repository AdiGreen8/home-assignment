const { test, expect } = require('@playwright/test');

test('test the accuracy of monthly average calculations for staff amount', async ({ page, request }) => {
    await page.goto('http://localhost:3000');

    // Click the datepicker.
    await page.locator('.react-datepicker__input-container').click();

    // Click the previous arrow three times.
    await page.locator('.react-datepicker__navigation--previous').click({ clickCount: 3});

    // Choose the 1st of the month.
    await page.getByLabel('January 1st, 2024').click();

    // Get the data.
    const response = await request.get('http://localhost:3002/data');
    const data = await response.json();
  
    // Filter the data according to January 2024.
    const specificDate = '2024-01';
    const filterData = data.filter(entry => entry.start.startsWith(specificDate));

    // Calculate the amount of staff each day.
    const dailyStaff = [];

    for (let day = 1; day <= 31; day++) {
        const dayData = filterData.filter(item => {
            const itemDate = new Date(item.start);
            return itemDate.getDate() === day;
        });

        let allStaff = [];

        dayData.forEach(entry => {
            allStaff = allStaff.concat(entry.staff);
        });
        const uniqueStaff = new Set(allStaff);
        await dailyStaff.push(uniqueStaff.size);
    }

    // Calculate the monthly average number of staff. Assuming not working on Sundays.
    const averageStaff = await (dailyStaff.reduce((sum, current) => sum + current, 0) / 27).toFixed(0);

    // Get the monthly staff amount that displyed to the user.
    const expectedAverageStaffAmount = await page.getByTestId('monthly-staff-num').innerText();
  
    // Check if equal.
    await expect(expectedAverageStaffAmount).toContain(averageStaff);  
});
