export default function LoanTypeCard({ type, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-6 border rounded-xl cursor-pointer transition
      ${selected ? "border-green-500 bg-green-50" : "hover:border-gray-400"}`}
    >
      <h3 className="text-xl">{type}</h3>
      {type === "GREEN" && (
        <p className="text-green-600 text-sm mt-2">
          🌱 Lower interest, eco-friendly
        </p>
      )}
    </div>
  );
}
