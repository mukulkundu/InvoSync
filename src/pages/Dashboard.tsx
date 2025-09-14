import data from '../Data/invoices.json';
import CreativeInvoiceBox from '../Components/CreativeInvoiceBox';
import TimePeriodSelector from '../Components/TimePeriodSelector';
import IncomeTrendChart from '../Components/IncomeTrendChart';
import InvoiceCard from '../Components/InvoiceCard';
import DashboardHeader from '../Components/DashboardHeader';
import StatsGrid from '../Components/StatsGrid';
import { PawPrint } from 'lucide-react';



export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#EACDEB] md:bg-white">
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
          <StatsGrid/>
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
  <div className="xl:col-span-2 space-y-6">
              <CreativeInvoiceBox />
              <TimePeriodSelector />
              <StatsGrid />
              <IncomeTrendChart data={data.incomeTrend} />
            </div>
            <div className="xl:col-span-1">
  <div className="bg-white rounded-2xl border-3 border-gray-100 p-4 h-svh overflow-y-auto">
    <h2 className="font-semibold text-lg text-gray-800 mb-4">Your Invoices</h2>
    <div className="space-y-3">
      {data.invoices.map((inv, i) => (
        <InvoiceCard key={i} invoice={inv} index={i} />
      ))}
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
<div className="w-full flex justify-center px-4 pb-16 pt-10 bg-white">
  <div className="px-6 py-4 text-center rounded-md w-full max-w-sm">
    <h2 className="text-xl font-semibold text-gray-800">
      <span className="text-gray-500 font-bold">Spark</span>
      <PawPrint className="inline w-4 h-4 text-purple-500 mx-1" />

      <span className="text-gray-400">nomy</span>
    </h2>
    <p className="text-sm text-gray-400">sparking the creator economy</p>
  </div>
</div>

    </div>
  );
}