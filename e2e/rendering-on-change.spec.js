const { test, expect } = require('@playwright/test');

test('test changing dates and update data', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    // Click the datepicker.
    await page.locator('.react-datepicker__input-container').click();
  
    // Click the previous arrow four times.
    await page.locator('.react-datepicker__navigation--previous').click({ clickCount: 4});
  
    // Choose specific date.
    await page.locator('.react-datepicker__day--025').click();

    // Daily utilization of the chosen day.
    await page.locator('[data-testid="utilization-num"]').waitFor();
    const currentUtil = await page.locator('[data-testid="utilization-num"]').textContent();

    // Click the datepicker again.
    await page.locator('.react-datepicker__input-container').click();
  
    // Click the next arrow.
    await page.locator('.react-datepicker__navigation--next').click();

    // Choose specific date.
    await page.locator('.react-datepicker__day--010').click();

    // Daily utilization of the chosen day.
    await page.locator('[data-testid="utilization-num"]').waitFor();
    const changedUtil = await page.locator('[data-testid="utilization-num"]').textContent();

    // Expects both daily utilization to be different.
    await expect(currentUtil).not.toEqual(changedUtil);
});

