export default function AlertsPanel({ alerts }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-2">Alerts</h3>

      {alerts.length === 0 ? (
        <p className="text-gray-500">No alerts</p>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert, index) => (
            <li
              key={index}
              className="text-sm text-red-600"
            >
              • {alert.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
