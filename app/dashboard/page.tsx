import { createClient } from '@/lib/supabaseClient'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  // Supabase server client
  const supabase = await createClient()

  // Ambil user login (server-side)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Jika tidak login, arahkan ke halaman login
  if (error || !user) {
    redirect('/login')
  }

  // Ambil data announcements dari Supabase (server-side)
  const { data: announcements, error: annError } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-blue-600">{user.email}</span>
        </h1>
      </div>

      {/* Announcements */}
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>

      {annError && <p className="text-red-600">Gagal memuat data.</p>}

      {!announcements || announcements.length === 0 ? (
        <p className="text-gray-600">Belum ada pengumuman.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {announcements.map((item: any) => (
            <article key={item.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
