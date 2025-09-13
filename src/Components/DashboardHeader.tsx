import { ArrowLeft, User } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <nav className="w-full px-4 py-3 flex justify-between items-center backdrop-blur-2xl lg:bg-white lg:shadow-sm">
      <div className="flex items-center gap-3 lg:hidden">
        <ArrowLeft className="w-5 h-5 text-gray-700" />
        <span className="text-lg font-semibold text-gray-800">Dashboard</span>
      </div>
      <h1 className="hidden lg:block text-xl font-bold text-gray-800">Dashboard</h1>
      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>
    </nav>
  );
}