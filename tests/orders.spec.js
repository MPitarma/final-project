import { test } from "@playwright/test";
import { CatalogPage } from "./pom/catalog.page";
import { CATALOG_CASES } from "./data/catalog.data";
import { ORDERS_DATA } from "./data/orders.data";
import { CartPage } from "./pom/cart.page";
import { PaymentsPage } from "./pom/payments.page";
import { OrdersPage } from "./pom/orders.page";

test.beforeEach(async ({ page }) => {
  const orderPage = new OrdersPage(page);
  const catalog = new CatalogPage(page);
  const payments = new PaymentsPage(page);
  const orders = ORDERS_DATA.ADD_ORDERS;
  await page.goto("");

  //Loop to iterate through the number of order in the data file
  for (const order of orders) {
    await test.step(`Add a new order - ${order.name}`, async () => {
      const productsToAdd = order.productData;
      await catalog.navigateToCatalog();
      //Loop to iterare through the products of an order
      for (const product of productsToAdd) {
        await catalog.addProductsToCart(
          product.name,
          product.quantity,
          product.position,
          product.stockAfterClicks
        );
      }
      await payments.navigateToPaymentsPage();
      await payments.selectPaymentMethod(order.paymentMethod);
      await payments.confirmPayment();
    });
  }
});

test("Validate orders exist", async ({ page }) => {
  const orders = new OrdersPage(page);
  await orders.validateOrdersExist();
});

test("Validate order information", async ({ page }) => {
  const ordersPage = new OrdersPage(page);
  const orders = ORDERS_DATA.ADD_ORDERS;

  for (const order of orders) {
    await ordersPage.validateOrderInformation(order);
  }
});
