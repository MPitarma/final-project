import { expect, test } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    // Static locators
    this.totalPrice = page.getByTestId("cart-total-value");
    this.goToPaymentsButton = page.getByTestId("cart-go-to-payment");
    this.emptyCartMessage = page.getByTestId("cart-empty-message");
  }

  //Dynamic Locators
  productName(position) {
    return this.page.getByTestId(`cart-item-name-${position}`);
  }

  quantity(position) {
    return this.page.getByTestId(`cart-item-quantity-${position}`);
  }

  price(position) {
    return this.page.getByTestId(`cart-item-total-value-${position}`);
  }

  unitPrice(position) {
    return this.page.getByTestId(`cart-item-price-value-${position}`);
  }

  //Actions and methods
  async validateCartInfo(
    productName,
    quantity,
    price,
    position,
    unitPrice,
    totalPrice
  ) {
    await test.step(`${productName} - Validate cart information product`, async () => {
      await expect(this.productName(position)).toHaveText(productName);
      await expect(this.price(position)).toHaveText(price);
      await expect(this.quantity(position)).toHaveText(quantity.toString());
      await expect(this.unitPrice(position)).toHaveText(unitPrice);
      await expect(this.totalPrice).toHaveText(totalPrice);
    });
  }

  async clickOnGoToPayments() {
    await test.step("Click on the go to payments button", async () => {
      await this.goToPaymentsButton.click();
    });
  }

  async validateEmptyCart() {
    await test.step("Validate the cart is empty", async () => {
      await expect(this.emptyCartMessage).toHaveText("Your cart is empty.");
      await expect(this.goToPaymentsButton).toBeHidden();
    });
  }
}
