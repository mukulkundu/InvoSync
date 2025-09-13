import { useState } from "react";
import { Calendar } from "lucide-react"; // for custom calendar icon
import { Crown } from "lucide-react"; // for premium crown icon

export default function TimePeriodSelector() {
  const [selected, setSelected] = useState("3Months");
  const options = [
    { label: "1Month", value: "1Month" },
    { label: "3Months", value: "3Months" },
    { label: "1Year", value: "1Year", premium: true },
  ];

  return (
    <div className="mt-4 mx-4 lg:mx-0 bg-white p-4 rounded-2xl border-3 border-gray-100">
      {/* Header with Title + Date Range */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-gray-500">Time Period</div>
        <div className="text-xs text-gray-400">dd:mm:yyyy - dd:mm:yyyy</div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelected(option.value)}
            className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-1
              ${
                selected === option.value
                  ? "bg-purple-500 text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-purple-50"
              }`}
          >
            {option.label}
            {option.premium && <Crown size={14} className="text-purple-400" />}
          </button>
        ))}

        {/* Custom Option with Calendar Icon */}
        <button
          onClick={() => setSelected("Custom")}
          className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-1
            ${
              selected === "Custom"
                ? "bg-purple-500 text-white"
                : "border border-gray-200 text-gray-600 hover:bg-purple-50"
            }`}
        >
          <Calendar size={14} />
          Custom
        </button>
      </div>
    </div>
  );
}
