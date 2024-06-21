import TransactionCard from '../components/transactionCard.jsx';
import transactions from '../components/transactions.js';
import Header from '../components/connectionheader';

export default function TransactionPage() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header heading="Transactions" link="Back to Home" href="/artisandashboard"/>
      <div className="relative py-6 mx-auto mt-5 bg-white max-h-[40rem] max-w-7xl sm:px-6 lg:px-8 rounded-xl overflow-y-scroll">
          {transactions.map((transaction, id)=>(
            <TransactionCard
             key={id}
             recipient={transaction.recipientName}
             date={transaction.date}
             type={transaction.type}
             status={transaction.status}
             amount={transaction.amount}
             />
          ))}
      </div>    
    </div>
  );
}
