import { useState } from "react";
import { Calendar } from "lucide-react"; // for custom calendar icon
import { Crown } from "lucide-react"; // for premium crown icon

export default function TimePeriodSelector() {
  const [selected, setSelected] = useState("3Months");
  const [customDateRange, setCustomDateRange] = useState({
    startDate: "",
    endDate: ""
  });
  const [showDateInputs, setShowDateInputs] = useState(false);
  
  const options = [
    { label: "1Month", value: "1Month" },
    { label: "3Months", value: "3Months" },
    { label: "1Year", value: "1Year", premium: true },
  ];

  const handleCustomClick = () => {
    setSelected("Custom");
    setShowDateInputs(true);
  };

  const handleDateChange = (type: 'startDate' | 'endDate', value: string) => {
    setCustomDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const formatDateRange = () => {
    if (selected === "Custom" && customDateRange.startDate && customDateRange.endDate) {
      const start = new Date(customDateRange.startDate).toLocaleDateString();
      const end = new Date(customDateRange.endDate).toLocaleDateString();
      return `${start} - ${end}`;
    }
    return "dd:mm:yyyy - dd:mm:yyyy";
  };

  return (
    <div className="mt-4 mx-4 lg:mx-0 bg-white p-4 rounded-2xl border-3 border-gray-100">
      {/* Header with Title + Date Range */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-gray-500">Time Period</div>
        <div className="text-xs text-gray-400">{formatDateRange()}</div>
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
          onClick={handleCustomClick}
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

      {/* Date Input Fields - Show when Custom is selected */}
      {showDateInputs && selected === "Custom" && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-2">Select Date Range</div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                type="date"
                value={customDateRange.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">End Date</label>
              <input
                type="date"
                value={customDateRange.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Selected: {customDateRange.startDate && customDateRange.endDate 
              ? `${new Date(customDateRange.startDate).toLocaleDateString()} - ${new Date(customDateRange.endDate).toLocaleDateString()}`
              : 'Please select both dates'
            }
          </div>
        </div>
      )}
    </div>
  );
}
