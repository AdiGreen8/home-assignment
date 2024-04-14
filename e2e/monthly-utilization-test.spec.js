const { test, expect } = require('@playwright/test');

test('test the accuracy of monthly average calculations for utilization', async ({ page, request }) => {
    await page.goto('http://localhost:3000');

    // Click the datepicker.
    await page.locator('.react-datepicker__input-container').click();

    // Click the previous arrow four times.
    await page.locator('.react-datepicker__navigation--previous').click({ clickCount: 4});

    // Choose the 1st of the month.
    await page.getByLabel('December 29th, 2023').click();

    // Get the data.
    const response = await request.get('http://localhost:3002/data');
    const data = await response.json();
  
    // Filter the data according to December 2023.
    const specificDate = '2023-12';
    const filterData = data.filter(entry => entry.start.startsWith(specificDate));

    // Calculate the precent of utilization each day.
    const dailyUtilizations = [];

    for (let day = 1; day <= 31; day++) {
        const dayData = filterData.filter(item => {
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
    const averageUtilization = await (dailyUtilizations.reduce((sum, current) => sum + current, 0) / 27).toFixed(2);

    // Get the monthly average utilizaion precent that displyed to the user.
    const expectedAverageStaffAmount = await page.getByTestId('monthly-utilization-num').innerText();
  
    // Check if equal.
    await expect(expectedAverageStaffAmount).toContain(averageUtilization);  
});