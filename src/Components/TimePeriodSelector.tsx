import { useState } from 'react';

export default function TimePeriodSelector() {
  const [selected, setSelected] = useState("3Months");
  const options = [
    { label: "1Month", value: "1Month" },
    { label: "3Months", value: "3Months" },
    { label: "1Year", value: "1Year" },
    { label: "Custom", value: "Custom" }
  ];

  return (
    <div className="mt-4 mx-4 lg:mx-0 bg-white p-4 rounded-2xl shadow-sm">
      <div className="text-xs text-gray-500 mb-3 text-center lg:text-left">Time Period</div>
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelected(option.value)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selected === option.value
                ? 'bg-purple-500 text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-purple-50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}