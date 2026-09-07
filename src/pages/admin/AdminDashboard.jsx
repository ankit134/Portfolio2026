import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchContactMessages } from '../../lib/queries'

export default function AdminDashboard() {
  const { data: messages = [] } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: fetchContactMessages,
  })

  const unread = messages.filter((m) => !m.is_read).length

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-[#8A8A93]">Manage your portfolio content and messages.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/admin/profile"
          className="rounded-xl border border-white/10 bg-[#111113] p-5 transition-colors hover:border-[#FF5733]/30"
        >
          <p className="font-semibold">Profile</p>
          <p className="mt-1 text-sm text-[#8A8A93]">Edit bio, contact, summaries</p>
        </Link>
        <Link
          to="/admin/projects"
          className="rounded-xl border border-white/10 bg-[#111113] p-5 transition-colors hover:border-[#FF5733]/30"
        >
          <p className="font-semibold">Projects</p>
          <p className="mt-1 text-sm text-[#8A8A93]">Add and edit case studies</p>
        </Link>
        <Link
          to="/admin/messages"
          className="rounded-xl border border-white/10 bg-[#111113] p-5 transition-colors hover:border-[#FF5733]/30"
        >
          <p className="font-semibold">Messages</p>
          <p className="mt-1 text-sm text-[#8A8A93]">
            {unread > 0 ? `${unread} unread` : 'View contact submissions'}
          </p>
        </Link>
      </div>
    </div>
  )
}
