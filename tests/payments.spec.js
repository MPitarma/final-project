import { test } from "@playwright/test";
import { CatalogPage } from "./pom/catalog.page";
import { CATALOG_CASES } from "./data/catalog.data";
import { PAYMENT_DATA } from "./data/paymentMethods.data";
import { CartPage } from "./pom/cart.page";
import { PaymentsPage } from "./pom/payments.page";
import { OrdersPage } from "./pom/orders.page";

test.beforeEach(async ({ page }) => {
  const catalog = new CatalogPage(page);
  const cart = new CartPage(page);
  await page.goto("");
  await catalog.addProductsToCartAndNavigateToCart(true);
  await cart.clickOnGoToPayments();
});

test("Validate products information", async ({ page }) => {
  const payments = new PaymentsPage(page);
  const productsToAdd = CATALOG_CASES.ADD_TO_CART.productData;
  productsToAdd.forEach(async (product) => {
    await payments.validateProductInfo(
      product.name,
      product.quantity,
      product.price,
      product.position,
      product.unitPrice,
      CATALOG_CASES.ADD_TO_CART.productsTotalPrice
    );
  });
});

const paymentMethods = PAYMENT_DATA.PPAYMENT_METHODS;

paymentMethods.forEach((method) => {
  test(`Validate payment method - ${method}`, async ({ page }) => {
    const payments = new PaymentsPage(page);
    await payments.selectPaymentMethod(method);
    await payments.confirmPayment();
    const orders = new OrdersPage(page);
    await orders.validateAmOnOrdersPage();
  });
});

test("Empty payments page once we comfirm the payment", async ({ page }) => {
  const payments = new PaymentsPage(page);
  const message = PAYMENT_DATA.EMPTY_PAYMENT_PAGE_MESSAGE;
  await payments.selectPaymentMethod(PAYMENT_DATA.PPAYMENT_METHODS[0]);
  await payments.confirmPayment();
  await payments.navigateToPaymentsPage();
  await payments.validateEmptyPaymentsPage(message);
});

test("Cant confirm payment without selecting method", async ({ page }) => {
  const payments = new PaymentsPage(page);
  const expectedMessage = PAYMENT_DATA.BLOCKED_PAYMENT_MESSAGE;
  page.once("dialog", async (alert) => {
    // console.log(`text from alert box: ${alert.message()}`);
    const actualMessage = alert.message();
    await payments.validateBlockPaymentMessage(actualMessage, expectedMessage);
    await alert.accept();
  });
  await payments.confirmPayment();
});
