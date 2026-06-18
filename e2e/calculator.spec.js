import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/calculator.html');
});

test('enters numbers by clicking digit buttons', async ({ page }) => {
    const display = page.locator('#display');

    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '3' }).click();

    await expect(display).toHaveText('123');
});

test('calculates result after pressing operation buttons', async ({ page }) => {
    const display = page.locator('#display');

    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await expect(display).toHaveText('12');
});

test('supports multiplication and displays the result', async ({ page }) => {
    const display = page.locator('#display');

    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await expect(display).toHaveText('42');
});

test('shows an error when dividing by zero', async ({ page }) => {
    const display = page.locator('#display');

    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await expect(display).toHaveText('Ошибка');
});
