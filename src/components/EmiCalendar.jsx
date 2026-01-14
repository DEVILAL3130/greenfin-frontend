import API from "../services/api";

export default function EmiCalendar({
  emiCalendar = [],
  onPayEmi,
  payingEmiId,
}) {
  // 🔥 Find index of first DUE EMI
  const nextDueIndex = emiCalendar.findIndex(
    (emi) => emi.status === "due"
  );

  // 📜 Download EMI receipt
  const handleDownloadReceipt = async (loanId, emiId) => {
    try {
      const res = await API.get(
        `/emi/receipt/${loanId}/${emiId}`,
        { responseType: "blob" } // important for PDF
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `EMI_Receipt_${emiId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Receipt download error:", err);
      alert("Failed to download receipt");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">EMI Calendar</h3>

      <ul className="space-y-2">
        {emiCalendar.map((emi, index) => {
          const isNextPayable =
            index === nextDueIndex && emi.status === "due";

          const emiDate = emi.dueDate
            ? new Date(emi.dueDate).toLocaleString("default", {
                month: "short",
                year: "numeric",
              })
            : "N/A";

          return (
            <li
              key={emi.emiId}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{emiDate}</p>
                <p className="text-sm text-gray-500">
                  ₹{emi.amount} • {emi.status}
                </p>
              </div>

              <div className="flex gap-2">
                {/* ✅ PAY EMI (ONLY NEXT DUE) */}
                {emi.status === "due" && (
                  <button
                    onClick={() => onPayEmi(emi.emiId)}
                    disabled={!isNextPayable || payingEmiId === emi.emiId}
                    className={`px-3 py-1 rounded text-sm text-white
                      ${
                        isNextPayable
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {payingEmiId === emi.emiId
                      ? "Paying..."
                      : isNextPayable
                      ? "Pay EMI"
                      : "Locked"}
                  </button>
                )}

                {/* 📜 EMI RECEIPT (ONLY PAID) */}
                {emi.status === "paid" && emi.loanId && (
                  <button
                    onClick={() =>
                      handleDownloadReceipt(emi.loanId, emi.emiId)
                    }
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    Receipt
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
