import { test } from "@playwright/test";
import { CatalogPage } from "./pom/catalog.page";
import { CartPage } from "./pom/cart.page";
import { CATALOG_CASES } from "./data/catalog.data";

test.beforeEach(async ({ page }) => {
  const catalog = new CatalogPage(page);
  await page.goto("");
  await catalog.navigateToCatalog();
});

test("Add out of stock product to the basket", async ({ page }) => {
  const catalog = new CatalogPage(page);
  const position = CATALOG_CASES.OUT_OF_STOCK.position;

  await catalog.validateProductEntry(
    position,
    CATALOG_CASES.OUT_OF_STOCK.name,
    CATALOG_CASES.OUT_OF_STOCK.quantity
  );
  await catalog.validateAddToCartIsDisabled(
    position,
    CATALOG_CASES.OUT_OF_STOCK.buttonText
  );
});

test("Add a product to the cart", async ({ page }) => {
  const catalog = new CatalogPage(page);
  const productsToAdd = CATALOG_CASES.ADD_TO_CART.productData;

  await catalog.addProductsToCartAndNavigateToCart(true);

  const cart = new CartPage(page);

  productsToAdd.forEach(async (product) => {
    await cart.validateCartInfo(
      product.name,
      product.quantity,
      product.price,
      product.position,
      product.unitPrice,
      CATALOG_CASES.ADD_TO_CART.productsTotalPrice
    );
  });
});
