import React, { useState } from 'react';
import './App.css'; // Optional: For additional styling

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [formattedLoanAmount, setFormattedLoanAmount] = useState('10,000');
  const [showAmortization, setShowAmortization] = useState(false);

  const handleLoanAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setLoanAmount(parseInt(value));
    setFormattedLoanAmount(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  }

  const handleInterestRateChange = (e) => {
    setInterestRate(parseFloat(e.target.value));
  }

  const calculateLoan = () => {
    const monthlyInterestRate = (interestRate / 100) / 12;
    const monthlyPayment = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm) / (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
    setMonthlyPayment(monthlyPayment.toFixed(2));

    const totalInterest = monthlyPayment * loanTerm - loanAmount;
    setTotalInterest(totalInterest.toFixed(2));

    const amortizationSchedule = [];
    let balance = loanAmount;
    for (let i = 0; i < loanTerm; i++) {
      const interest = balance * monthlyInterestRate;
      const principal = monthlyPayment - interest;
      balance -= principal;
      amortizationSchedule.push({
        month: i + 1,
        payment: monthlyPayment.toFixed(2),
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        balance: balance.toFixed(2)
      });
    }
    setAmortizationSchedule(amortizationSchedule);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-4">Loan Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Loan Amount</label>
          <input type="text" value={formattedLoanAmount} onChange={handleLoanAmountChange} className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
          <input type="number" step="0.01" value={interestRate} onChange={handleInterestRateChange} className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Loan Term (months)</label>
          <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(parseInt(e.target.value))} className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>
      <button onClick={calculateLoan} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:ring-blue-500 focus:border-blue-500">Calculate</button>
      <div className="mt-4">
        <h3 className="text-2xl font-bold mb-2">Results</h3>
        <p className="text-lg mb-2">Monthly Payment: ₱{parseFloat(monthlyPayment).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        <p className="text-lg mb-2">Total Interest: ₱{parseFloat(totalInterest).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        <p className="text-lg mb-2">Total Paid: ₱{parseFloat(parseFloat(monthlyPayment) * loanTerm).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      </div>
        <div className="mt-4 flex justify-center">
        <div>
          <h3 className="text-2xl font-bold mb-2">Amortization Schedule</h3>
          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:ring-blue-500 focus:border-blue-500"
          >
            {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
          </button>
          
          {showAmortization && (
            <div className="overflow-hidden transition-max-height duration-300">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Month</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Interest</th>
                    <th className="px-4 py-2">Principal</th>
                    <th className="px-4 py-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((schedule, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{schedule.month}</td>
                      <td className="px-4 py-2">₱{parseFloat(schedule.payment).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-2">₱{parseFloat(schedule.interest).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-2">₱{parseFloat(schedule.principal).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-2">₱{parseFloat(schedule.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return <LoanCalculator />;
}

export default App;
