const transactions = [
    {
      type: 'Payment',
      status: 'Completed',
      amount: 250,
      date: '2023-06-01',
      recipientName: 'Jane Doe',
    },
    {
        type: 'Payment',
        status: 'Completed',
        amount: 50,
        date: '2023-06-01',
        recipientName: 'Jane Doe',
      },
    {
      type: 'Withdrawal',
      status: 'Pending',
      amount: 100,
      date: '2023-06-02',
    },
    {
        type: 'Deposit',
        status: 'Completed',
        amount: 1000,
        date: '2023-06-02',
      },
];

export default transactions;