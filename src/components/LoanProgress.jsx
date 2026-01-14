const LoanProgress = ({ progress = 0 }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold mb-4">Loan Progress</h3>

      <div className="w-full bg-gray-200 h-3 rounded">
        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {progress}% completed
      </p>
    </div>
  );
};

export default LoanProgress;
