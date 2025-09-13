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
    "Update Status": "bg-purple-100 text-purple-600",
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-2xl border-3 border-gray-100 mb-3 mx-4 lg:mx-0">
      {/* Left side (Client Info) */}
      <div className="flex-1">
        <p className="font-medium text-gray-800 mb-1">{invoice.client}</p>
        <p className="text-xs text-gray-500">
          ₹{invoice.amount.toLocaleString()}, Due {invoice.due}
        </p>
      </div>

      {/* Right side (Status + dot) */}
      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[invoice.status] || statusColors.Draft
          }`}
        >
          {invoice.status}
        </span>
        {typeof index === "number" && index < 2 && (
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        )}
      </div>
    </div>
  );
}
