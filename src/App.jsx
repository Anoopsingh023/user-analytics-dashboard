import { NavLink, Outlet } from 'react-router-dom'

export default function App(){
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-extrabold text-xl">User Analytics</div>
          <div className="space-x-4">
            <NavLink to="/" end className={({isActive}) => `px-3 py-2 rounded-lg ${isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}>Dashboard</NavLink>
            <NavLink to="/users" className={({isActive}) => `px-3 py-2 rounded-lg ${isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}>Users</NavLink>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <Outlet />
      </main>
      <footer className="text-center text-sm text-gray-500 py-8">© {new Date().getFullYear()} User Analytics Dashboard</footer>
    </div>
  )
}
