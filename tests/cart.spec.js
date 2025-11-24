import { test } from "@playwright/test";
import { CatalogPage } from "./pom/catalog.page";
import { CATALOG_CASES } from "./data/catalog.data";
import { CartPage } from "./pom/cart.page";
import { PaymentsPage } from "./pom/payments.page";

test.beforeEach(async ({ page }) => {
  const catalog = new CatalogPage(page);
  const productsToAdd = CATALOG_CASES.ADD_TO_CART.productData;
  await catalog.navigateToCatalog();
  for (const product of productsToAdd) {
    await catalog.addProductsToCart(
      product.name,
      product.quantity,
      product.position,
      product.stockAfterClicks
    );
  }
  await catalog.navigateToCart();
});

test("Go to payments through the cart", async ({ page }) => {
    const cart = new CartPage(page);
    await cart.clickOnGoToPayments();
    const payments = new PaymentsPage(page);
    await payments.validateOnPaymentsPage();
});

test("Go to payments without any products in the cart", async ({ page }) => {
    const cart = new CartPage(page);
    const catalog = new CatalogPage(page);
    await page.reload();
    await catalog.navigateToCart();
    await cart.validateEmptyCart();
});