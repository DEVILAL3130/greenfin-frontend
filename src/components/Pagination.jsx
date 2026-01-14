export default function Pagination({
  page,
  total,
  perPage,
  onChange,
}) {
  const pages = Math.ceil(total / perPage);

  return (
    <div className="flex justify-end p-3 gap-2">
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`px-3 py-1 rounded text-sm ${
            page === i + 1
              ? "bg-green-600 text-white"
              : "bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
