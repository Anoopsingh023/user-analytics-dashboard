export default function RecentlyJoinedUsers({ users }){
  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-3">Recently Joined (5)</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {users.map(u => (
          <div key={u.id} className="min-w-[180px] border rounded-xl p-3 bg-gray-50">
            <img src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}`} alt={u.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="mt-2 font-semibold text-sm">{u.name}</div>
            <div className="text-xs text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
