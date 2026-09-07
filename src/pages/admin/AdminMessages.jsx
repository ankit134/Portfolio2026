import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchContactMessages, markMessageRead } from '../../lib/queries'

export default function AdminMessages() {
  const queryClient = useQueryClient()
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: fetchContactMessages,
  })

  async function toggleRead(id, isRead) {
    await markMessageRead(id, !isRead)
    await queryClient.invalidateQueries({ queryKey: ['admin-messages'] })
  }

  if (isLoading) return <p className="text-[#8A8A93]">Loading…</p>

  return (
    <div>
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="mt-2 text-[#8A8A93]">Contact form submissions from your portfolio.</p>

      {messages.length === 0 ? (
        <p className="mt-8 text-[#8A8A93]">No messages yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`rounded-xl border p-5 ${
                msg.is_read ? 'border-white/10 bg-[#111113]' : 'border-[#FF5733]/30 bg-[#161616]'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-white">{msg.name}</p>
                  <a href={`mailto:${msg.email}`} className="text-sm text-[#FF5733] hover:underline">
                    {msg.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <time className="text-xs text-[#8A8A93]">
                    {new Date(msg.created_at).toLocaleString()}
                  </time>
                  <button
                    type="button"
                    onClick={() => toggleRead(msg.id, msg.is_read)}
                    className="text-xs text-[#8A8A93] hover:text-white"
                  >
                    {msg.is_read ? 'Mark unread' : 'Mark read'}
                  </button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[#c4c4cc]">
                {msg.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
