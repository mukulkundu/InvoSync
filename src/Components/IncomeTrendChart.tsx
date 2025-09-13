import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';

type TrendData = {
  month: string;
  income: number;
  momGrowth: number;
};

export default function IncomeTrendChart({ data }: { data: TrendData[] }) {
  return (
    <div className="bg-white mx-4 lg:mx-0 p-4 rounded-2xl shadow-sm mt-4">
      <h3 className="font-semibold mb-1 text-gray-800">Income Trend</h3>
      <p className="text-xs text-gray-500 mb-4">Your monthly income and growth for the last 6 months</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis yAxisId="right" orientation="right" hide/>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar 
              yAxisId="left" 
              dataKey="income" 
              fill="url(#purpleGradient)" 
              radius={[4,4,0,0]} 
              name="Income"
              barSize={20}
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="momGrowth" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              name="MoM Growth"
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
            />
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={1}/>
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}