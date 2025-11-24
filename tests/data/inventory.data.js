export const INVENTORY_CASES = {
  ADD_PRODUCT: [
    {
      inputName: "name",
      inputValue: "Lego Spaceship",
    },
    {
      inputName: "price",
      inputValue: "10",
    },
    {
      inputName: "quantity",
      inputValue: "100",
    },
  ],
  VALIDATE_ADDED_PRODUCT:{
    name: "Lego Spaceship",
    quantity: "100",
    catalogQuantity: "100 units",
    price: "10.00",
  },
  VALIDATE_ERROR_MESSAGE:{
    message: 'Please fill in all fields!'
  },
};
