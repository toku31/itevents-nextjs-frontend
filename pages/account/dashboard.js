import { parseCookies } from '@/helpers/index'
import { useRouter } from 'next/router'
import Layout from "@/components/Layout"
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'
import DashboardEvent from '@/components/DashboardEvent'


export default function DashboardPage({ events, token }) {
  // console.log({ events })
  console.log(events)

  const router = useRouter()

  const deleteEvent = async(id) => {
    // console.log('delete')
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = res.json()

      if (!res.ok) {
        toast.error(data.message , {theme: 'colored'})
      } else {
        router.reload()
        // router.push('/events')
      }

    }
  }

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>マイ イベント</h3>
        {events.map((evt) => (
          <DashboardEvent evt={evt} key={evt.id}
           handleDelete={deleteEvent} />
          // <h3>{evt.name_ja} : {evt.name_en}</h3>
        )
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  console.log(token)
  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const events = await res.json()
  // console.log(events)
  return {
    props: {
      events,
      token
    },
  }
}