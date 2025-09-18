export default function UserModal({ user, onClose }){
  if(!user) return null
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-20" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-4">
          <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <div className="text-xl font-bold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div><span className="font-semibold">ID:</span> {user.id}</div>
          <div><span className="font-semibold">Created:</span> {new Date(user.createdAt).toLocaleString()}</div>
        </div>
        <button className="mt-6 w-full bg-gray-900 text-white py-2 rounded-xl" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
