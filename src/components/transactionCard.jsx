export default function TransactionCard(transaction){
    return (
    <>
        <div className="flex items-center max-w-full p-4 mx-auto my-4 overflow-hidden bg-gray-100 rounded-lg shadow-lg min-h-32">
            <div className="flex items-center justify-between w-full p-4">
                <div className="mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">Transaction Type: {transaction.type}</h2>
                    <p className={`text-md font-bold ${transaction.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                        Status: {transaction.status}
                    </p>
                </div>
                <div className="flex flex-col items-end justify-between mb-2 text-right">
                    <div className="flex justify-between my-2 text-xl">
                        <span className="text-right text-gray-600">Amount:</span>
                        <span className="ml-2 font-semibold text-gray-800">${transaction.amount}</span>
                    </div>
                    <div className="flex justify-between my-2 text-xl">
                        <span className="text-gray-600">Date:</span>
                        <span className="ml-2 font-semibold text-gray-800">{transaction.date}</span>
                    </div>
                    {transaction.type === 'Payment' && (
                    <div className="flex justify-between my-2 text-xl">
                        <span className="text-gray-600">Recipient Name:</span>
                        <span className="ml-2 font-bold text-gray-800">{transaction.recipient}</span>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </>
    )
}