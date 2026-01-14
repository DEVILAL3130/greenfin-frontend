// import { useEffect, useState } from "react";
// import api from "../services/api";

// export default function UserDocuments() {
//   const [documents, setDocuments] = useState([]);

//   const fetchDocuments = async () => {
//     try {
//       const res = await api.get("/user/documents"); // Fetch logged-in user's documents
//       setDocuments(res.data);
//     } catch (err) {
//       console.error("Failed to fetch documents:", err);
//     }
//   };

//   const deleteDocument = async (id) => {
//     try {
//       await api.delete(`/user/documents/${id}`);
//       setDocuments((prev) => prev.filter((doc) => doc._id !== id));
//     } catch (err) {
//       console.error("Failed to delete document:", err);
//       alert("Cannot delete this document.");
//     }
//   };

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h2 className="font-bold mb-3">📄 My Documents</h2>

//       {documents.length === 0 && <p>No documents uploaded.</p>}

//       <table className="w-full border">
//         <thead>
//           <tr>
//             <th>Document</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {documents.map((doc) => (
//             <tr key={doc._id}>
//               <td>
//                 <a
//                   href={doc.fileUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-blue-600 underline"
//                   title={doc.name}
//                 >
//                   {doc.name.length > 25
//                     ? doc.name.slice(0, 25) + "..."
//                     : doc.name}
//                 </a>
//               </td>
//               <td>{doc.status}</td>
//               <td>
//                 {doc.status === "UPLOADED" ? (
//                   <button
//                     onClick={() => deleteDocument(doc._id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 ) : (
//                   <span className="text-gray-500">✔ Locked</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserDocuments() {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const res = await api.get("/user/documents"); // Fetch logged-in user's documents
      setDocuments(res.data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    }
  };

  const deleteDocument = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      await api.delete(`/user/documents/${id}`);
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
      alert("Document deleted successfully!");
    } catch (err) {
      console.error("Failed to delete document:", err);
      alert(err.response?.data?.message || "Cannot delete this document.");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-3">📄 My Documents</h2>

      {documents.length === 0 && <p>No documents uploaded.</p>}

      <table className="w-full border">
        <thead>
          <tr>
            <th>Document</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc._id}>
              <td>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                  title={doc.name}
                >
                  {doc.name.length > 25 ? doc.name.slice(0, 25) + "..." : doc.name}
                </a>
              </td>
              <td>{doc.status}</td>
              <td>
                {doc.status === "UPLOADED" ? (
                  <button
                    onClick={() => deleteDocument(doc._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                ) : (
                  <span className="text-gray-500">✔ Locked</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
