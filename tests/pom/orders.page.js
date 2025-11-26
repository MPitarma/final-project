import { expect, test } from "@playwright/test";
import { CATALOG_CASES } from "../data/catalog.data";
import { CatalogPage } from "./catalog.page";
import { PaymentsPage } from "./payments.page";

export class OrdersPage {
  constructor(page) {
    this.page = page;

    // Static locators
    this.pageTitle = page.getByTestId("orders-title");
    this.orderList = page.getByTestId("orders-list");
  }

  //Dynamic Locators
  orderDate(orderNumber) {
    return this.page.getByTestId(`order-date-${orderNumber}`);
  }

  paymentMethod(orderNumber) {
    return this.page.getByTestId(`order-payment-${orderNumber}`);
  }

  orderPrice(orderNumber) {
    return this.page.getByTestId(`order-total-value-${orderNumber}`);
  }

  productInfo(orderPosition, productNumber) {
    return this.page.getByTestId(
      `order-item-name-${orderPosition}-${productNumber}`
    );
  }

  productPrice(orderPosition, productNumber) {
    return this.page.getByTestId(
      `order-item-total-value-${orderPosition}-${productNumber}`
    );
  }

  //Actions and methods
  async validateAmOnOrdersPage() {
    await test.step("Validate that i am on the orders page", async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  async addNewOrder(name) {
    await test.step(`Add a new order - ${name}`, async () => {
      const catalog = new CatalogPage();
      const payments = new PaymentsPage();
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
      await payments.navigateToPaymentsPage();
      await payments.selectPaymentMethod("Visa");
      await payments.confirmPayment();
    });
  }

  async validateOrdersExist() {
    await test.step("Check if there are orders on the orders page", async () => {
      await expect(this.orderList.first()).toBeVisible();
    });
  }

  async validateOrderInformation(order) {
    await test.step(`Validate - ${order.name} - the information`, async () => {
      const now = new Date();
      const today = now.toLocaleDateString();
      await expect(this.orderDate(order.orderPosition)).toContainText(today);
      await expect(this.paymentMethod(order.orderPosition)).toContainText(
        order.paymentMethod
      );
      await expect(this.orderPrice(order.orderPosition)).toContainText(
        order.productsTotalPrice
      );

      const productData = order.productData;

      for (let position = 0; position < productData.length; position++) {
        await expect(
          this.productInfo(order.orderPosition, position)
        ).toContainText(order.productData[position].name);
        await expect(
          this.productInfo(order.orderPosition, position)
        ).toContainText(order.productData[position].quantity.toString());
        await expect(
          this.productPrice(order.orderPosition, position)
        ).toContainText(order.productData[position].price.toString());
      }
    });
  }
}
