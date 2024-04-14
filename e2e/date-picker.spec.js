// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Surgical Metrics/);
});

test('test date picker month', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the datepicker.
  await page.locator('.react-datepicker__input-container').click();

  // Click the previous arrow three times.
  await page.locator('.react-datepicker__navigation--previous').click({ clickCount: 3});

  const currentMonth = await page.locator('.react-datepicker__current-month').innerText();
  // Expects current month to be January.
  await expect(currentMonth).toContain('January');
});

test('test date picker day', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the datepicker.
  await page.locator('.react-datepicker__input-container').click();

  // Click the previous arrow four times.
  await page.locator('.react-datepicker__navigation--previous').click({ clickCount: 4});

  // Choose specific date.
  await page.locator('.react-datepicker__day--025').click();

  const currentDate = await page.getByTestId('chosen-date').innerText();
  // Expects current date to be December 25th, 2023.
  await expect(currentDate).toContain('December 25, 2023');
});

