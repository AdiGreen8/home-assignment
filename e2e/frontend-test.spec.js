const { test, expect } = require('@playwright/test');

test('Check that the front disply the metrics.', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Click the datepicker.
    await page.locator('.react-datepicker__input-container').click();
  
    // Click the previous arrow four times.
    await page.locator('.react-datepicker__navigation--previous').click({ clickCount: 4});
  
    // Choose specific date.
    await page.locator('.react-datepicker__day--025').click();
    
    // Get the elements.
    const utilizationLocator = page.getByTestId('utilization-num');
    const staffLocator = page.getByTestId('staff-amount-num');

    // Wait for the elements to be loaded and visible.
    await utilizationLocator.waitFor();
    await staffLocator.waitFor();

    // Check that text content isn't empty.
    const utilizationText = await utilizationLocator.textContent();
    const staffText = await staffLocator.textContent();

    await expect(utilizationLocator).toHaveText(/.+/);
    await expect(staffLocator).toHaveText(/.+/);

    // Convert text to number and check if greater than zero and the calculation worked.
    const utilizationNum = parseFloat(utilizationText.match(/[\d\.]+/)[0]);
    const staffNum = parseInt(staffText.match(/[\d\.]+/)[0]);

    expect(utilizationNum).toBeGreaterThan(0);
    expect(staffNum).toBeGreaterThan(0);
  });







