import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminLoans() {
  const [loans, setLoans] = useState([]);
  const [expandedLoan, setExpandedLoan] = useState(null);

  // Fetch all loans for admin
  const fetchLoans = async () => {
    try {
      const res = await api.get("/admin/loans");
      setLoans(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Admin loan fetch error:", err);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Update loan status (APPROVED / REJECTED)
  const updateLoanStatus = async (loanId, status) => {
    if (!loanId) {
      console.error("Loan ID is undefined");
      return;
    }

    try {
      await api.post(`/admin/loans/${loanId}`, { status });
      fetchLoans();
    } catch (err) {
      console.error("Failed to update loan status:", err);
      alert("Failed to update loan status. Please try again.");
    }
  };

  // Update document status (VERIFIED / REJECTED)
  const updateDocumentStatus = async (docId, status) => {
    if (!docId) {
      console.error("Document ID is undefined");
      return;
    }

    try {
      await api.post(`/admin/documents/${docId}`, { status });
      fetchLoans();
    } catch (err) {
      console.error("Failed to update document status:", err);
      alert("Failed to update document status. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Loan Approvals</h1>

      {loans.map((loan) => (
        <div key={loan._id} className="border rounded mb-4">
          {/* LOAN ROW */}
          <div
            className="flex justify-between p-4 cursor-pointer bg-gray-100"
            onClick={() =>
              setExpandedLoan(expandedLoan === loan._id ? null : loan._id)
            }
          >
            <div>
              <p><b>User:</b> {loan.user?.name || "N/A"}</p>
              <p><b>Amount:</b> ₹{loan.amount}</p>
              <p><b>Status:</b> {loan.status}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateLoanStatus(loan._id, "APPROVED");
                }}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Approve
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateLoanStatus(loan._id, "REJECTED");
                }}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>

          {/* DOCUMENTS */}
          {expandedLoan === loan._id && (
            <div className="p-4 bg-white border-t">
              <h3 className="font-semibold mb-2">Documents</h3>

              {loan.documents?.length === 0 && (
                <p className="text-gray-500">No documents uploaded</p>
              )}

              {loan.documents?.map((doc) => (
                <div
                  key={doc._id}
                  className="flex justify-between items-center mb-2"
                >
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {doc.name}
                  </a>

                  <div className="space-x-2">
                    <span>{doc.status}</span>

                    <button
                      onClick={() =>
                        updateDocumentStatus(doc._id, "VERIFIED")
                      }
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Verify
                    </button>

                    <button
                      onClick={() =>
                        updateDocumentStatus(doc._id, "REJECTED")
                      }
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
