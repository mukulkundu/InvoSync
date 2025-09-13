import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, Legend } from 'recharts';

type TrendData = {
  month: string;
  income: number;
  momGrowth: number;
};

export default function IncomeTrendChart({ data }: { data: TrendData[] }) {
  // Custom Legend Renderer
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-6 mt-2 text-sm">
        {payload.map((entry: any, index: number) => {
          if (entry.value === "income") {
            return (
              <div key={index} className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }}></span>
                <span className="text-gray-600">Income</span>
              </div>
            );
          }
          if (entry.value === "momGrowth") {
            return (
              <div key={index} className="flex items-center gap-1">
                <svg width="16" height="10">
                  <line x1="0" y1="5" x2="16" y2="5" stroke={entry.color} strokeWidth="2" />
                  <circle cx="8" cy="5" r="3" fill={entry.color} />
                </svg>
                <span className="text-gray-600">MoM Growth</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="bg-white mx-4 lg:mx-0 p-4 rounded-2xl border-3 border-gray-100 mt-4">
      <h3 className="font-semibold mb-1 text-gray-800">Income Trend</h3>
      <p className="text-xs text-gray-500 mb-4">Your monthly income and growth for the last 6 months.</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e5e7eb" />
            
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
              tick={{ fontSize: 12, fill: '#9333ea' }}
              tickFormatter={(value) => `$${(value/1000)}k`}
              domain={[0, 8000]}
            />

            <YAxis 
              yAxisId="right" 
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#7f1d1d' }}
              tickFormatter={(value) => `${value}%`}
              domain={[-100, 100]}
            />

            <Tooltip 
              formatter={(value: any, name: string) => {
                if (name === "income") return [`$${value}`, "Income"];
                if (name === "momGrowth") return [`${value}%`, "MoM Growth"];
                return value;
              }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />

            {/* ✅ Custom Legend */}
            <Legend content={renderLegend} />

            <Bar 
              yAxisId="left" 
              dataKey="income" 
              fill="#a855f7" 
              radius={[4,4,0,0]} 
              name="income"
              barSize={30}
            />

            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="momGrowth" 
              stroke="#7f1d1d" 
              strokeWidth={2}
              name="momGrowth"
              dot={{ fill: '#7f1d1d', r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
