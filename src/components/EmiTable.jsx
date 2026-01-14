import { payEmi } from "../services/api";

const EmiTable = ({ loan, refresh }) => {
  const handlePay = async () => {
    await payEmi(loan._id);
    refresh();
  };

  const dueEmi = loan.emis.find((e) => e.status === "due");

  return (
    <div>
      <h3>EMI Schedule</h3>

      <table>
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loan.emis.map((emi) => (
            <tr key={emi._id}>
              <td>{new Date(emi.dueDate).toDateString()}</td>
              <td>₹{emi.amount}</td>
              <td>{emi.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {dueEmi && (
        <button onClick={handlePay}>
          💳 Pay ₹{dueEmi.amount}
        </button>
      )}
    </div>
  );
};

export default EmiTable;
