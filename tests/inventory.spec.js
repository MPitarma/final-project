import { test } from "@playwright/test";
import { InventoryPage } from "./pom/inventory.page";
import { CatalogPage } from "./pom/catalog.page";
import { INVENTORY_CASES } from "./data/inventory.data";

test.beforeEach(async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.navigateToInventory();
});

test("Add product to inventory", async ({ page }) => {
  const inventory = new InventoryPage(page);

  const inputsToFill = INVENTORY_CASES.ADD_PRODUCT;
  const addedProductInfo = INVENTORY_CASES.VALIDATE_ADDED_PRODUCT;
  console.log(INVENTORY_CASES.ADD_PRODUCT);

  await test.step("Add a new product", async ({ page }) => {
    for (const input of inputsToFill) {
      await inventory.fillInput(input.inputName, input.inputValue);
    }
    await inventory.addProduct();
  });

  await inventory.validateAddedProductInfo(
    addedProductInfo.name,
    addedProductInfo.price,
    addedProductInfo.quantity
  );

  await inventory.navigateToCatalog();

  const catalog = new CatalogPage(page);

  await catalog.validateAddedProductInfo(
    addedProductInfo.name,
    addedProductInfo.price,
    addedProductInfo.catalogQuantity
  );
});

test("Add product without info and check error message", async ({ page }) => {
  const inventory = new InventoryPage(page);
  const expectedMessage = INVENTORY_CASES.VALIDATE_ERROR_MESSAGE.message;
  page.once("dialog", async (alert) => {
    const actualMessage = alert.message();
    await inventory.validateErrorMessage(actualMessage, expectedMessage);
    await alert.accept();
  });
  await inventory.addProduct();
});

test("Increase item quantity", async ({ page }) => {
  const inventory = new InventoryPage(page);
  const position = 0;

  await inventory.checkFirstProductQuantity("2");
  await inventory.increaseStockBy1(position);
  await test.step("Validate stock after the increase", async ({ page }) => {
    await inventory.checkFirstProductQuantity("3");
  });
});

test("Decrease item quantity", async ({ page }) => {
  const inventory = new InventoryPage(page);
  const position = 0;

  await inventory.checkFirstProductQuantity("2");

  await inventory.decreaseStockBy1(position);
  await test.step("Validate stock after the decrease", async ({ page }) => {
    await inventory.checkFirstProductQuantity("1");
  });
});
