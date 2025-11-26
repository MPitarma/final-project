import { expect, test } from "@playwright/test";

export class PaymentsPage {
  constructor(page) {
    this.page = page;

    // Static locators
    this.paymentsTab = page.getByTestId("store-tab-payments");
    this.paymentsPageTitle = page.getByTestId("payment-title");
    this.totalPrice = page.getByTestId("payment-total-value");
    this.confirmPaymentButton = page.getByTestId("payment-confirm-button");
    this.emptyPaymentsPageMessage = page.getByTestId("payment-empty-message");
  }

  //Dynamic Locators
  productName(position) {
    return this.page.getByTestId(`payment-item-name-${position}`);
  }

  quantity(position) {
    return this.page.getByTestId(`payment-item-quantity-${position}`);
  }

  price(position) {
    return this.page.getByTestId(`payment-item-total-value-${position}`);
  }

  unitPrice(position) {
    return this.page.getByTestId(`payment-item-price-value-${position}`);
  }

  paymentMethodRadioButton(paymentMethod) {
    return this.page.getByTestId(`payment-method-input-${paymentMethod}`);
  }

  //Actions and methods
  async validateAmOnPaymentsPage() {
    await test.step("Validate I am on the payments page", async () => {
      await expect(this.paymentsPageTitle).toHaveText("Payment");
    });
  }

  async validateProductInfo(
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

  async selectPaymentMethod(paymentMethod) {
    await test.step(`Select payment method - ${paymentMethod}`, async () => {
      await this.paymentMethodRadioButton(paymentMethod).click();
    });
  }

  async confirmPayment() {
    await test.step("Click on the confirm payment button", async () => {
      await this.confirmPaymentButton.click();
    });
  }

  async validateEmptyPaymentsPage(message) {
    await test.step("Validate that the payments page is empty", async () => {
      await expect(this.emptyPaymentsPageMessage).toHaveText(message);
    });
  }

  async navigateToPaymentsPage() {
    await test.step("Navigate to the payments page", async () => {
      await this.paymentsTab.click();
    });
  }

  async validateBlockPaymentMessage(actualMessage, expectedMessage) {
    await test.step("Validate blocked payment message", async () => {
      await expect(actualMessage).toContain(expectedMessage);
    });
  }
}
