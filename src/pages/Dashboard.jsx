import { useEffect, useMemo, useState } from 'react'
import { fetchUsers } from '../services/api'
import Loader from '../components/Loader'
import TotalUsersTile from '../components/TotalUsersTile'
import UsersPerDayChart from '../components/UsersPerDayChart'
import AvatarDistributionChart from '../components/AvatarDistributionChart'
import SignupTimeChart from '../components/SignupTimeChart'
import RecentlyJoinedUsers from '../components/RecentlyJoinedUsers'

export default function Dashboard(){
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    fetchUsers().then(setUsers).catch(e=>setError(e.message))
  }, [])

  const kpi = useMemo(()=>{
    if(!users) return { total: 0, perDay: [], avatar: [], byHour: [], recent: [] }
    const now = new Date()
    const days = [...Array(30)].map((_,i) => {
      const d = new Date(now)
      d.setDate(now.getDate() - (29 - i))
      const key = d.toISOString().slice(0,10)
      return { key, label: key.slice(5), count: 0 }
    })
    const perDayMap = Object.fromEntries(days.map(d => [d.key, d]))
    let withAvatar = 0, withoutAvatar = 0
    const byHour = [...Array(24)].map((_,h)=>({ hour: String(h).padStart(2,'0'), count:0 }))

    users.forEach(u => {
      const created = new Date(u.createdAt)
      const key = created.toISOString().slice(0,10)
      if(perDayMap[key]) perDayMap[key].count++
      const hasAvatar = !!(u.avatar && u.avatar.trim())
      hasAvatar ? withAvatar++ : withoutAvatar++
      byHour[created.getHours()].count++
    })

    const perDay = days.map(d => ({ date: d.label, count: d.count }))
    const avatar = [
      { name: 'With Avatar', value: withAvatar },
      { name: 'No Avatar', value: withoutAvatar }
    ]
    const sorted = [...users].sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5)

    return { total: users.length, perDay, avatar, byHour, recent: sorted }
  }, [users])

  if(error) return <div className="text-red-600">{error}</div>
  if(!users) return <Loader />

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TotalUsersTile total={kpi.total} />
        <AvatarDistributionChart data={kpi.avatar} />
        <SignupTimeChart data={kpi.byHour} />
      </div>

      <UsersPerDayChart data={kpi.perDay} />

      <RecentlyJoinedUsers users={kpi.recent} />
    </div>
  )
}
