const data = {
  sdata: [
    {
      Customer: "mohamed@gmail.com",
      Transaction: "1001",
      Order_Date: new Date(), // Optional, can be omitted to use default
      Total_Amount: 36.00,
      Status: "Pending", // Optional, can be omitted to use default
      Items: [
        {
          ID: 1,
          Product: "6860ff23dcadd7af40640895",
          Quantity: 2,
          Price: 12.00
        },
        {
          ID: 2,
          Product: "6860ff23dcadd7af40640895",
          Quantity: 1,
          Price: 12.00
        }
      ]
    }
  ]
};

export default data;
