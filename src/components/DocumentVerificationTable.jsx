import { useEffect, useState } from "react";
import api from "../services/api";

export default function DocumentVerificationTable() {
  const [documents, setDocuments] = useState([]);

  // Fetch documents from API
  useEffect(() => {
    api
      .get("/admin/documents")
      .then((res) => setDocuments(res.data))
      .catch((err) => console.error("Failed to fetch documents:", err));
  }, []);

  // Verify a document
  const verifyDoc = async (id) => {
    try {
      await api.post(`/admin/documents/${id}`, { status: "VERIFIED" });
      setDocuments((prev) =>
        prev.map((doc) =>
          doc._id === id ? { ...doc, status: "VERIFIED" } : doc
        )
      );
    } catch (err) {
      console.error("Failed to verify document:", err);
      alert("Failed to verify document. Try again.");
    }
  };

  // Truncate long document names
  const truncateName = (name, maxLength = 25) => {
    return name.length > maxLength ? name.slice(0, maxLength - 3) + "..." : name;
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-3">📄 Document Verification</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-left p-2 border">User</th>
            <th className="text-left p-2 border">Document</th>
            <th className="text-left p-2 border">Status</th>
            <th className="text-left p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr key={doc._id} className="hover:bg-gray-50">
              <td className="p-2 border">{doc.user?.name}</td>

              {/* Clickable, concise document link */}
              <td className="p-2 border">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                  title={doc.name} // full name on hover
                >
                  {truncateName(doc.name)}
                </a>
              </td>

              <td className="p-2 border">{doc.status}</td>

              <td className="p-2 border">
                {doc.status === "UPLOADED" ? (
                  <button
                    onClick={() => verifyDoc(doc._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Verify
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold">✔ Verified</span>
                )}
              </td>
            </tr>
          ))}

          {documents.length === 0 && (
            <tr>
              <td colSpan={4} className="p-2 text-center text-gray-500">
                No documents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
