const { test, expect } = require('@playwright/test');

test('test that daily utilization is calculated and displayed correctly', async ({ page, request }) => {
    await page.goto('http://localhost:3000');

    // Click the datepicker.
    await page.locator('.react-datepicker__input-container').click();

    // Click the previous arrow four times.
    await page.locator('.react-datepicker__navigation--previous').click({ clickCount: 4});

    // Choose the 26th of the month.
    await page.getByLabel('December 26th, 2023').click();

    // Get the data.
    const response = await request.get('http://localhost:3002/data');
    const data = await response.json();
  
    // Calculate the daily utilization of December 26th.
    const specificDate = '2023-12-26';
    const filterData = data.filter(entry => entry.start.startsWith(specificDate));
    let totalUsedMinutes = 0;
    let totalMinutes = 16 * 60;
  
    filterData.forEach(entry => {
      const start = new Date(entry.start);
      const end = new Date(entry.end);
      const duration = (end.getTime() - start.getTime()) / (1000 * 60); // Duration in minutes
      totalUsedMinutes += duration;
    });

    const utilization = (((totalUsedMinutes / totalMinutes) * 100) / 32).toFixed(2);

    // Get the utilization that displayed to the user.
    const expectedUtilization = await page.getByTestId('utilization-num').innerText();
  
    // Check if equal.
    await expect(expectedUtilization).toContain(utilization);  
});