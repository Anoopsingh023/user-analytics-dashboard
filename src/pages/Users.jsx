import { useEffect, useState } from 'react'
import { fetchUsers } from '../services/api'
import Loader from '../components/Loader'
import UserTable from '../components/UserTable'

export default function Users(){
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    fetchUsers().then(setUsers).catch(e=>setError(e.message))
  }, [])

  if(error) return <div className="text-red-600">{error}</div>
  if(!users) return <Loader />

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">All Users</h2>
      <UserTable users={users} />
    </div>
  )
}
