const { test, expect } = require('@playwright/test');

test('test the amount of staff for each day is accurate.', async ({ page, request }) => {
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
  
    // Calculate the daily staff amount of December 26th.
    const specificDate = '2023-12-26';
    const filterData = data.filter(entry => entry.start.startsWith(specificDate));
    let allStaff = [];

    filterData.forEach(entry => {
      allStaff = allStaff.concat(entry.staff);
    });

    const uniqueStaff = new Set(allStaff);
    const staffAmount = uniqueStaff.size.toFixed();

    // Get the staff amount that displyed to the user.
    const expectedStaffAmount = await page.getByTestId('staff-amount-num').innerText();
  
    // Check if equal.
    await expect(expectedStaffAmount).toContain(staffAmount);  
});