// alertTest.spec.js
const { test, expect } = require('@playwright/test');

test('alert appears and disappears after specified time', async ({ page }) => {
    // Navigate to the page where the alert is implemented
    await page.goto('http://localhost:3000'); 

    // Click the datepicker.
    await page.locator('.react-datepicker__input-container').click();
  
    // Choose specific date.
    await page.locator('.react-datepicker__day--010').click();

    const alertShowing = await page.locator('.alert');

    // Check if the alert is visible
    await expect(alertShowing).toBeVisible();

    // Click the datepicker again.
    await page.locator('.react-datepicker__input-container').click();
  
    // Click the previous arrow three times.
    await page.locator('.react-datepicker__navigation--previous').click({ clickCount: 3});

    // Choose specific date.
    await page.locator('.react-datepicker__day--010').click();

    const alertHidden = await page.locator('.alert');
    // Check if the alert is visible
    await expect(alertHidden).toBeHidden();
});
