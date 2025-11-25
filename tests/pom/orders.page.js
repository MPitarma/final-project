import { expect, test } from "@playwright/test";

export class OrdersPage {
  constructor(page) {
    this.page = page;

    // Static locators
    this.pageTitle = page.getByTestId('orders-title');
  }

  //Dynamic Locators
  productName(position) {
    return this.page.getByTestId(`cart-item-name-${position}`);
  };

  //Actions and methods
  async validateAmOnOrdersPage(){
    await test.step('Validate that i am on the orders page', async()=>{
        await expect(this.pageTitle).toBeVisible();
    });
  };
}