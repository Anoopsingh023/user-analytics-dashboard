export default function TotalUsersTile({ total }){
  return (
    <div className="card text-center">
      <h3 className="text-sm font-semibold text-gray-500">Total Users</h3>
      <div className="text-5xl font-extrabold mt-2">{total}</div>
    </div>
  )
}
