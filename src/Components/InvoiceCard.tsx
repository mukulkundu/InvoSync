import { useState, useRef, useEffect } from "react";
import { Pencil, Bell, ChevronDown } from "lucide-react";

export type Invoice = {
  id: string;
  client_name: string;
  due_amount: number;
  due_date: string;
  status: string | null;
};

type InvoiceCardProps = {
  invoice: Invoice;
  index?: number;
  onStatusChange?: (invoiceId: string, newStatus: string) => void;
};

export default function InvoiceCard({ invoice, onStatusChange }: InvoiceCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(invoice.status || 'draft');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusColors: Record<string, string> = {
    paid: "bg-green-100 text-green-600",
    unpaid: "bg-gray-100 text-gray-600",
    disputed: "bg-red-100 text-red-600",
    "partially paid": "bg-yellow-100 text-yellow-600",
    overdue: "bg-red-100 text-red-600",
    awaited: "bg-orange-100 text-orange-600",
    draft: "bg-gray-100 text-gray-500",
  };

  const availableStatuses = [
    { value: 'draft', label: 'Draft' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'paid', label: 'Paid' },
    { value: 'partially paid', label: 'Partially Paid' },
    { value: 'awaited', label: 'Awaited' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'disputed', label: 'Disputed' },
  ];

  const showEditIcon = currentStatus === "draft";
  const showBellIcon = currentStatus === "overdue" || currentStatus === "awaited";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleStatusSelect = (newStatus: string) => {
    setCurrentStatus(newStatus);
    setShowDropdown(false);
    if (onStatusChange) {
      onStatusChange(invoice.id, newStatus);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-2xl border-3 border-gray-100 mb-3 mx-4 lg:mx-0">
      {/* Left side (Client Info) */}
      <div className="flex-1">
        <p className="font-medium text-gray-800 mb-1">{invoice.client_name}</p>
        <p className="text-xs text-gray-500">
          ₹{invoice.due_amount.toLocaleString()}, Due {new Date(invoice.due_date).toLocaleDateString()}
        </p>
      </div>

      {/* Right side (Status + optional icon or dropdown) */}
      <div className="flex items-center gap-2 relative">
        {/* Status label with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleStatusClick}
            className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors hover:opacity-80 ${
              statusColors[currentStatus] || statusColors.draft
            }`}
          >
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
            <ChevronDown size={14} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px]">
              {availableStatuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => handleStatusSelect(status.value)}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    currentStatus === status.value ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Optional icons */}
        {showEditIcon && <Pencil size={16} className="text-gray-400" />}
        {showBellIcon && <Bell size={16} className="text-gray-400" />}
      </div>
    </div>
  );
}
