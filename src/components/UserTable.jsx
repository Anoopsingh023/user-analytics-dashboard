import { useMemo, useState } from 'react'
import UserModal from './UserModal'

export default function UserTable({ users }){
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')
  const [page, setPage] = useState(1)
  const perPage = 10
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const lower = query.toLowerCase()
    let u = users.filter(x => (x.name?.toLowerCase().includes(lower) || x.email?.toLowerCase().includes(lower)))
    const [field, dir] = sortBy.split('-')
    u.sort((a,b) => {
      let av = field === 'date' ? new Date(a.createdAt).getTime() : (a.name || '')
      let bv = field === 'date' ? new Date(b.createdAt).getTime() : (b.name || '')
      if(av < bv) return dir === 'asc' ? -1 : 1
      if(av > bv) return dir === 'asc' ? 1 : -1
      return 0
    })
    return u
  }, [users, query, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const start = (page - 1) * perPage
  const pageItems = filtered.slice(start, start + perPage)

  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages))

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <input value={query} onChange={e=>{setQuery(e.target.value); setPage(1)}} placeholder="Search by name or email…" className="border rounded-xl px-3 py-2 w-full md:w-80" />
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="border rounded-xl px-3 py-2 w-full md:w-56">
          <option value="name-asc">Sort: Name ↑</option>
          <option value="name-desc">Sort: Name ↓</option>
          <option value="date-desc">Sort: Newest</option>
          <option value="date-asc">Sort: Oldest</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(u => (
              <tr key={u.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={()=>setSelected(u)}>
                <td className="p-3 flex items-center gap-2">
                  <img src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}`} className="w-8 h-8 rounded-full object-cover" />
                  {u.name}
                </td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {pageItems.length === 0 && <tr><td className="p-6 text-center text-gray-500" colSpan="3">No users found.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <button className="px-3 py-1 rounded-lg border" onClick={()=>go(page-1)}>Prev</button>
        <div className="text-sm">Page {page} / {totalPages}</div>
        <button className="px-3 py-1 rounded-lg border" onClick={()=>go(page+1)}>Next</button>
      </div>

      <UserModal user={selected} onClose={()=>setSelected(null)} />
    </div>
  )
}
