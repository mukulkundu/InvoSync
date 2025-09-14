import { Pencil, Bell, ChevronDown } from "lucide-react";

export type Invoice = {
  client: string;
  amount: number;
  due: string;
  status: string;
};

type InvoiceCardProps = {
  invoice: Invoice;
  index?: number;
};

export default function InvoiceCard({ invoice, index }: InvoiceCardProps) {
  const statusColors: Record<string, string> = {
    Paid: "bg-green-100 text-green-600",
    Unpaid: "bg-gray-100 text-gray-600",
    Disputed: "bg-red-100 text-red-600",
    "Partially Paid": "bg-yellow-100 text-yellow-600",
    Overdue: "bg-red-100 text-red-600",
    Awaited: "bg-orange-100 text-orange-600",
    Draft: "bg-gray-100 text-gray-500",
    "Update Status": "bg-purple-500 text-white",
  };

  const showDropdown = index === 0 && invoice.status === "Update Status";
  const showEditIcon = invoice.status === "Draft";
  const showBellIcon =
    invoice.status === "Overdue" || invoice.status === "Awaited";

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-2xl border-3 border-gray-100 mb-3 mx-4 lg:mx-0">
      {/* Left side (Client Info) */}
      <div className="flex-1">
        <p className="font-medium text-gray-800 mb-1">{invoice.client}</p>
        <p className="text-xs text-gray-500">
          ₹{invoice.amount.toLocaleString()}, Due {invoice.due}
        </p>
      </div>

      {/* Right side (Status + optional icon or dropdown) */}
      <div className="flex items-center gap-2">
        {/* Status label */}
        <span
          className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 ${
            statusColors[invoice.status] || statusColors.Draft
          }`}
        >
          {invoice.status}
          {showDropdown && <ChevronDown size={14} />}
        </span>

        {/* Optional icons */}
        {showEditIcon && <Pencil size={16} className="text-gray-400" />}
        {showBellIcon && <Bell size={16} className="text-gray-400" />}
      </div>
    </div>
  );
}
