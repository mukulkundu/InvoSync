import data from '../Data/invoices.json';

export default function StatsGrid() {
  return (
    <div className="mt-4 mx-4 lg:mx-0 space-y-4">
      {/* Top Card: Total Earnings */}
      <div className="bg-white p-4 rounded-2xl border-3 border-gray-100">
        <p className="text-xs text-gray-400 font-bold mb-1">Total Earnings</p>
        <p className="text-xl font-semibold text-[#8E44AD]">
          ${data.totalEarnings.toLocaleString("en-US")}
        </p>
      </div>

      {/* Bottom Row: Payment Awaited + Payment Overdue */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border-3 border-gray-100">
          <p className="text-xs text-gray-400 font-bold mb-1">Payment Awaited</p>
          <p className="text-xl font-semibold text-[#8E44AD]">
            ${data.paymentAwaited.toLocaleString("en-US")}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border-3 border-gray-100">
          <p className="text-xs text-gray-400 font-bold mb-1">Payment Overdue</p>
          <p className="text-xl font-semibold text-[#8E44AD]">
            ${data.paymentOverdue.toLocaleString("en-US")}
          </p>
        </div>
      </div>
    </div>
  );
}
