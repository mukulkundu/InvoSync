import { useState, useEffect } from 'react';
import CreativeInvoiceBox from '../Components/CreativeInvoiceBox';
import TimePeriodSelector from '../Components/TimePeriodSelector';
import IncomeTrendChart from '../Components/IncomeTrendChart';
import InvoiceCard from '../Components/InvoiceCard';
import DashboardHeader from '../Components/DashboardHeader';
import StatsGrid from '../Components/StatsGrid';
import { PawPrint } from 'lucide-react';
import { fetchDashboardData, updateInvoiceStatus } from '../services/api';
import type { DashboardData } from '../services/api';



export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (invoiceId: string, newStatus: string) => {
    if (!dashboardData) return;
    
    try {
      // Update the invoice status on the server
      await updateInvoiceStatus(invoiceId, newStatus);
      
      // Update the invoice status in the dashboard data
      const updatedInvoices = dashboardData.invoices.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: newStatus }
          : invoice
      );
      
      // Recalculate stats based on updated invoices
      const totalEarnings = updatedInvoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.due_amount, 0);
      
      const paymentAwaited = updatedInvoices
        .filter(inv => inv.status === 'awaited')
        .reduce((sum, inv) => sum + inv.due_amount, 0);
      
      const paymentOverdue = updatedInvoices
        .filter(inv => inv.status === 'overdue')
        .reduce((sum, inv) => sum + inv.due_amount, 0);
      
      // Update the dashboard data with new stats and invoices
      setDashboardData({
        ...dashboardData,
        totalEarnings,
        paymentAwaited,
        paymentOverdue,
        invoices: updatedInvoices
      });
    } catch (error) {
      console.error('Error updating invoice status:', error);
      // You could show a toast notification here
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#EACDEB] md:bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#EACDEB] md:bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show dashboard with data
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-[#EACDEB] md:bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

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
          <IncomeTrendChart data={dashboardData.incomeTrend} />
          
          <div className="mt-6 mx-4">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">Your Invoices</h2>
            {dashboardData.invoices.map((inv, i) => (
              <InvoiceCard key={inv.id} invoice={inv} index={i} onStatusChange={handleStatusChange} />
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
              <IncomeTrendChart data={dashboardData.incomeTrend} />
            </div>
            <div className="xl:col-span-1">
  <div className="bg-white rounded-2xl border-3 border-gray-100 p-4 h-svh overflow-y-auto">
    <h2 className="font-semibold text-lg text-gray-800 mb-4">Your Invoices</h2>
    <div className="space-y-3">
      {dashboardData.invoices.map((inv, i) => (
        <InvoiceCard key={inv.id} invoice={inv} index={i} onStatusChange={handleStatusChange} />
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