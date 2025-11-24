import { expect, test } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    // Static locators
    this.inventoryTab = page.getByTestId("store-tab-inventory");
    this.catalogTab = page.getByTestId("store-tab-catalog");
    this.addProductButton = page.getByRole("button", { name: "Add Product" });
    this.addedProductName = page.getByTestId("inventory-product-name-8");
    this.addedProductQuantity = page.getByTestId(
      "inventory-product-quantity-8"
    );
    this.addedProductPrice = page.getByTestId(
      "inventory-product-price-value-8"
    );
    this.firstProductQuantity = page.getByTestId(
      "inventory-product-quantity-0"
    );
  }

  //Dynamic Locators
  input(inputName) {
    return this.page.getByTestId(`inventory-input-${inputName}`);
  };

  productQuantityValue(position) {
    return this.page.getByTestId(`inventory-product-quantity-${position}`);
  };

  increaseButton(position) {
    return this.page.getByTestId(`inventory-product-increase-${position}`);
  };

  decreaseButton(position) {
    return this.page.getByTestId(`inventory-product-decrease-${position}`);
  };

  //Actions and Methods
  async navigateToInventory() {
    await test.step("Navigate to the invenvtory page", async () => {
      await this.page.goto("/store");
      await this.inventoryTab.click();
    });
  };

  async navigateToCatalog() {
    await test.step("Navigate to the invenvtory page", async () => {
      await this.catalogTab.click();
    });
  };

  async fillInput(inputName, inputValue) {
    await this.input(inputName).fill(inputValue);
  };

  async addProduct() {
    await this.addProductButton.click();
  };

  async validateAddedProductInfo(name, price, quantity) {
    await test.step("Validate added product information", async () => {
      await expect(this.addedProductName).toHaveText(name);
      await expect(this.addedProductPrice).toHaveText(price);
      await expect(this.addedProductQuantity).toHaveText(quantity);
    });
  };

  async validateErrorMessage(actualMessage, expectedMessage) {
    await test.step("Valdiate error message value", async () => {
      await expect(actualMessage).toContain(expectedMessage);
    });
  };

  async checkFirstProductQuantity(quantity) {
    await test.step("Check the stock value of the first product", async () => {
      await expect(this.firstProductQuantity).toHaveText(quantity);
    });
  };

  async increaseStockBy1(position) {
    await test.step("Increase stock by 1", async () => {
     await this.increaseButton(position).click();
    });
  };

  async decreaseStockBy1(position) {
    await test.step("Decrease stock by 1", async () => {
      await this.decreaseButton(position).click();
    });
  };
}