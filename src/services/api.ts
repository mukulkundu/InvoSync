// API service for fetching invoice data
// Replace the base URL with your actual API endpoint

import staticData from '../Data/invoices.json';

const API_BASE_URL = 'https://68ca7f27430c4476c349b61c.mockapi.io/api/v1/invoices'; // Replace with your actual API URL

export interface Invoice {
  id: string;
  client_name: string;
  due_amount: number;
  due_date: string;
  status: string | null;
}

export interface IncomeTrendData {
  month: string;
  income: number;
  momGrowth: number;
}

export interface DashboardData {
  totalEarnings: number;
  paymentAwaited: number;
  paymentOverdue: number;
  incomeTrend: IncomeTrendData[];
  invoices: Invoice[];
}

// Function to fetch all dashboard data
export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    // MockAPI returns invoices directly as an array
    const invoicesResponse = await fetch(`${API_BASE_URL}`);
    
    if (!invoicesResponse.ok) {
      throw new Error(`HTTP error! status: ${invoicesResponse.status}`);
    }
    
    const invoices = await invoicesResponse.json();
    
    // MockAPI typically returns an array, so we need to handle that
    const invoicesArray = Array.isArray(invoices) ? invoices : [invoices];
    
    // Calculate stats from invoices data
    const totalEarnings = invoicesArray
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.due_amount, 0);
    
    const paymentAwaited = invoicesArray
      .filter(inv => inv.status === 'awaited')
      .reduce((sum, inv) => sum + inv.due_amount, 0);
    
    const paymentOverdue = invoicesArray
      .filter(inv => inv.status === 'overdue')
      .reduce((sum, inv) => sum + inv.due_amount, 0);
    
    // Use static income trend data from invoices.json
    const incomeTrend = staticData.incomeTrend;
    
    return {
      totalEarnings,
      paymentAwaited,
      paymentOverdue,
      incomeTrend,
      invoices: invoicesArray
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Function to fetch only invoices data
export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

// Function to update invoice status
export const updateInvoiceStatus = async (invoiceId: string, newStatus: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${invoiceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating invoice status:', error);
    throw error;
  }
};

// Function to fetch income trend data (when API endpoint is available)
export const fetchIncomeTrend = async (): Promise<IncomeTrendData[]> => {
  try {
    // Replace with actual API endpoint when available
    const response = await fetch(`${API_BASE_URL}/income-trend`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching income trend:', error);
    throw error;
  }
};
