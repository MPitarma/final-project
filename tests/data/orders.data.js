export const ORDERS_DATA = {
  ADD_ORDERS: [
    {
      name: "First Order",
      orderPosition: 0,
      paymentMethod: 'Visa',
      productsTotalPrice: "10149.96",
      productData: [
        {
          name: "Lightsaber (Star Wars)",
          price: "9999.99",
          quantity: 1,
          position: 0,
          unitPrice: "9999.99",
          stockAfterClicks: "1 units",
        },
        {
          name: "Giant Rubber Duck",
          price: "149.97",
          quantity: 3,
          position: 1,
          unitPrice: "49.99",
          stockAfterClicks: "12 units",
        },
      ],
    },
    {
      name: "Second Order",
      orderPosition: 1,
      paymentMethod: 'Multibanco',
      productsTotalPrice: "329.97",
      productData: [
        {
          name: "Bacon-Scented Candle",
          price: "29.98",
          quantity: 2,
          position: 5,
          unitPrice: "€14.99",
          stockAfterClicks: "18 units",
        },
        {
          name: "Shark Repellent",
          price: "299.99",
          quantity: 1,
          position: 2,
          unitPrice: "299.99",
          stockAfterClicks: "4 units",
        },
      ],
    },
  ],
};
