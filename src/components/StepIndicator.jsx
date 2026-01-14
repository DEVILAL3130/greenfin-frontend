export default function StepIndicator({ step, steps }) {
  return (
    <div className="flex mb-10 gap-4">
      {steps.map((label, index) => (
        <div
          key={label}
          className={`flex-1 text-center p-2 border-b-2
          ${step === index ? "border-green-500 font-bold" : "border-gray-300"}`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
