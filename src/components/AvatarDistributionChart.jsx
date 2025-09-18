import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

export default function AvatarDistributionChart({ data }){
  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-3">Avatar Distribution</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" label outerRadius={90}>
            {data.map((_, idx) => <Cell key={idx} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
