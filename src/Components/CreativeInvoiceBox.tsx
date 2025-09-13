import { Plus } from 'lucide-react';

export default function CreativeInvoiceBox() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm text-center mx-4 lg:mx-0 mt-4">
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Plus className="w-6 h-6 text-purple-500" />
      </div>
      <h2 className="font-semibold text-lg text-gray-800 mb-2">Create New Invoice</h2>
      <p className="text-sm text-gray-500 mb-3">Start by creating and sending new invoice</p>
      <p className="text-xs text-purple-600 underline cursor-pointer">
        Or Upload an existing invoice and set payment reminder
      </p>
    </div>
  );
}