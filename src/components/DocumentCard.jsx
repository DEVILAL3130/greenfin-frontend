import { motion } from "framer-motion";

export default function DocumentCard({ document, onDelete }) {
  const statusColors = {
    UPLOADED: "bg-yellow-100 text-yellow-700",
    VERIFIED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  // SAFETY CHECK
  if (!document || !document._id || !document.url) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border rounded-lg flex justify-between items-center"
    >
      {/* LEFT */}
      <div>
        <p className="font-medium">{document.name}</p>
        <span
          className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${statusColors[document.status]}`}
        >
          {document.status}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex gap-4 items-center">
        {/* VIEW */}
        <a
          href={document.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:underline"
        >
          View
        </a>

        {/* DELETE */}
        {document.deletable && (
          <button
            onClick={() => onDelete(document._id)}
            className="text-red-600 text-sm hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
}
