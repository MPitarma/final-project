
# Automation warmup with Playwright - Final Project - Store
As a final porject for the course of Test Automation with Playwright, we were asked to create a test suit to cover the funcionallity of a simple store application.;
The store itself consists on a number of pages for different porposes: inventory page to add or remove inventory a catalog to check inventory count and to add products to the cart; the cart page where you can check the product information and proceed to payments; payments page were we can select the payment method and comfirm the payment; orders page where we can see the list of orders performed.


## File Structure
This test suite is divided between 3 types of files we use for our tests

- Data files
- Spec files
- Page Object Models

## Test Cases
In this test suite our test cases are divided by pages and so the list of test cases presents are:

### Inventory Page
- Add a product to the Inventory
- Add product without info and check error message
- Increase item quantity
- Decrease item quantity

### Catalog Page
- Add out of stock product to the cart
- Add a products to the cart

### Cart Page
- Go to payments through the cart
- Go to payments without products in the cart

### Payments Page
- Validate product information
- Empty page after payment confirmation
- Cant confirm payment without selecting a method

### Orders Page
- Validate orders exist
- Validate order information






## How to run

Clone the project

```bash
  git clone https://github.com/MPitarma/final-project.git
```

Entre no diretório do projeto

```bash
  cd final-project
```

Install dependencies

```bash
  npm install
```

run the test 

```bash
  npx playwright test
```

to run with ui mode

```bash
  npx playwright test --ui
```

to run a specific test file add the file path to the end of the run command

```bash
  npx playwright test tests/cart.spec.js
```



## 🔗 Links
Test suite project and application
[![repository](https://img.icons8.com/ios_filled/50/github.jpg)](https://github.com/MPitarma/final-project)
[[application]](https://playground-drab-six.vercel.app/store)