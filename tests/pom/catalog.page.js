import { expect, test } from "@playwright/test";

export class CatalogPage {
  constructor(page) {
    this.page = page;

    // Static locators
    this.catalogTab = page.getByTestId("store-tab-catalog");
    this.cartTab = page.getByTestId("store-tab-cart");
    this.addedProductName = page.getByTestId("catalog-item-name-8");
    this.addedProductQuantity = page.getByTestId("catalog-item-quantity-8");
    this.addedProductPrice = page.getByTestId("catalog-item-price-value-8");
  };

  //Dynamic Locators
  productName(position) {
    return this.page.getByTestId(`catalog-item-name-${position}`);
  };

  productQuantity(position) {
    return this.page.getByTestId(`catalog-item-quantity-${position}`);
  };

  addToCartButton(position) {
    return this.page.getByTestId(`catalog-item-add-button-${position}`);
  };

  //Actions and methods
  async navigateToCatalog() {
    await test.step("Navigate to the invenvtory page", async () => {
      await this.page.goto("/store");
      await this.catalogTab.click();
    });
  };

  async navigateToCart(){
    await test.step('Nabigate to the cart', async ()=>{
        await this.cartTab.click();
    });
  };

  async validateAddedProductInfo(name, price, quantity) {
    await test.step("Validate added product information on catalog", async () => {
      await expect(this.addedProductName).toHaveText(name);
      await expect(this.addedProductPrice).toHaveText(price);
      await expect(this.addedProductQuantity).toHaveText(quantity);
    });
  };

  async validateProductEntry(position, name, quantity) {
    await test.step("Validate product without stock exists", async () => {
      await expect(this.productName(position)).toHaveText(name);
      await expect(this.productQuantity(position)).toHaveText(quantity);
    });
  };

  async validateAddToCartIsDisabled(position, buttonText) {
    await test.step("Validate that the add to cart button is disabled", async () => {
      await expect(this.addToCartButton(position)).toBeDisabled();
      await expect(this.addToCartButton(position)).toHaveText(buttonText);
    });
  };

  async addProductsToCart(productName, quantity, position, stockAfterClicks) {
    await test.step(`Add ${productName} to the basket ${quantity} times`,  async () => {
      // loop to click the add to cart button the number of times equal to the quantity from the data file
      for (let i = 0; i < quantity; i++) {
        await this.addToCartButton(position).click();
      };
       await expect(this.productQuantity(position)).toHaveText(stockAfterClicks);
    });
  };
}
