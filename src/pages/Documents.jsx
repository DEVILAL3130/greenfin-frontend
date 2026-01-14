import { useEffect, useState } from "react";
import UploadDropzone from "../components/UploadDropzone";
import DocumentCard from "../components/DocumentCard";
import GreenImpactCounter from "../components/GreenImpactCounter";
import api from "../services/api";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [paperSaved, setPaperSaved] = useState(0);
  const [carbonSaved, setCarbonSaved] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔹 FETCH DOCUMENTS
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await api.get("/documents");
        const docs = res.data?.documents || [];

        setDocuments(docs);

        setPaperSaved(docs.length * 5);
        setCarbonSaved(
          docs.reduce((sum, d) => sum + (d.carbonSaved || 25), 0)
        );
      } catch (err) {
        console.error("Failed to fetch documents", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // 🔹 AFTER UPLOAD — NORMALIZE TO `_id`
  const handleUploadSuccess = (doc) => {
    if (!doc || !(doc._id || doc.id)) return;

    const normalizedDoc = {
      _id: doc._id || doc.id, // ✅ ONLY _id
      name: doc.name || doc.documentType || "Document",
      url: doc.url || doc.fileUrl,
      status: doc.status || "UPLOADED",
      deletable: true,
      carbonSaved: doc.carbonSaved || 25,
    };

    setDocuments((prev) => [normalizedDoc, ...prev]);
    setPaperSaved((p) => p + 5);
    setCarbonSaved((c) => c + normalizedDoc.carbonSaved);
  };

  // 🔹 DELETE DOCUMENT (USING _id)
  const handleDelete = async (_id) => {
    if (!_id) return alert("Invalid document ID");

    try {
      await api.delete(`/documents/${_id}`);

      setDocuments((prev) => prev.filter((d) => d._id !== _id));
      setPaperSaved((p) => Math.max(0, p - 5));
      setCarbonSaved((c) => Math.max(0, c - 25));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Loan Documents</h1>

      {/* 🌱 GREEN IMPACT */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <GreenImpactCounter label="Paper Saved" value={paperSaved} unit="pages" />
        <GreenImpactCounter label="CO₂ Reduced" value={carbonSaved} unit="g" />
      </div>

      {/* ⬆️ UPLOAD */}
      <UploadDropzone onUploadSuccess={handleUploadSuccess} />

      {/* ⏳ LOADING */}
      {loading && <p className="mt-6 text-gray-500">Loading documents...</p>}

      {/* 📄 DOCUMENT LIST */}
      <div className="mt-8 space-y-4">
        {documents.map((doc) => (
          <DocumentCard
            key={doc._id}        // ✅ FIXED
            document={doc}
            onDelete={handleDelete}
          />
        ))}

        {!loading && documents.length === 0 && (
          <p className="text-gray-500 text-sm">
            No documents uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
