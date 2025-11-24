import { expect, test } from "@playwright/test";

export class PaymentsPage {
  constructor(page) {
    this.page = page;

    // Static locators
    this.paymentsPageTitle = page.getByTestId('payment-title');
  };

  //Dynamic Locators
  productName(position) {
    return this.page.getByTestId(`cart-item-name-${position}`);
  };


  //Actions and methods
  async validateOnPaymentsPage(){
    await test.step('Validate I am on the payments page', async()=>{
        await expect(this.paymentsPageTitle).toHaveText('Payment');
    });
  };

  async clickOnGoToPayments(){
    test.step('Click on the go to payments button', async()=>{
      this.goToPaymentsButton.click();
    });
  };
}
