import { test } from "@playwright/test";
import { CatalogPage } from "./pom/catalog.page";
import { CartPage } from "./pom/cart.page";
import { PaymentsPage } from "./pom/payments.page";

test.beforeEach(async ({ page }) => {
  const catalog = new CatalogPage(page);
  await page.goto('');
  await catalog.addProductsToCartAndNavigateToCart(true);
});

test("Go to payments through the cart", async ({ page }) => {
    const cart = new CartPage(page);
    await cart.clickOnGoToPayments();
    const payments = new PaymentsPage(page);
    await payments.validateAmOnPaymentsPage();
});

test("Go to payments without any products in the cart", async ({ page }) => {
    const cart = new CartPage(page);
    const catalog = new CatalogPage(page);
    test.step('Reload the page to reset data', async({})=>{
      await page.reload();
    })
    await catalog.navigateToCart();
    await cart.validateEmptyCart();
});