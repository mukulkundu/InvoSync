import data from '../Data/invoices.json';
import CreativeInvoiceBox from '../Components/CreativeInvoiceBox';
import TimePeriodSelector from '../Components/TimePeriodSelector';
import IncomeTrendChart from '../Components/IncomeTrendChart';
import InvoiceCard from '../Components/InvoiceCard';
import DashboardHeader from '../Components/DashboardHeader';

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 mx-4 lg:mx-0">
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <p className="text-xs text-gray-500 mb-1">Total Earnings</p>
        <p className="text-xl font-semibold text-gray-800">₹{data.totalEarnings.toLocaleString()}</p>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <p className="text-xs text-gray-500 mb-1">Payment Awaited</p>
        <p className="text-xl font-semibold text-purple-600">₹{data.paymentAwaited.toLocaleString()}</p>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <p className="text-xs text-gray-500 mb-1">Payment Overdue</p>
        <p className="text-xl font-semibold text-red-500">₹{data.paymentOverdue.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-600 lg:bg-gray-50">
      {/* Mobile gradient background with content container */}
      <div className="lg:hidden">
        <DashboardHeader />
        <div 
          className="bg-white mt-8 min-h-screen"
          style={{
            borderTopLeftRadius: '46px',
            borderTopRightRadius: '46px',
            paddingTop: '24px',
            paddingBottom: '40px'
          }}
        >
          <CreativeInvoiceBox />
          <TimePeriodSelector />
          <StatsGrid />
          <IncomeTrendChart data={data.incomeTrend} />
          
          <div className="mt-6 mx-4">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">Your Invoices</h2>
            {data.invoices.map((inv, i) => (
              <InvoiceCard key={i} invoice={inv} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block">
        <DashboardHeader />
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <CreativeInvoiceBox />
              <TimePeriodSelector />
              <StatsGrid />
              <IncomeTrendChart data={data.incomeTrend} />
            </div>
            <div className="xl:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <h2 className="font-semibold text-lg text-gray-800 mb-4">Your Invoices</h2>
                <div className="max-h-96 overflow-y-auto">
                  {data.invoices.slice(0, 6).map((inv, i) => (
                    <InvoiceCard key={i} invoice={inv} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}