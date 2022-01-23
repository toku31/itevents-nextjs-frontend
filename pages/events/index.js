// import Head from 'next/head'
import Layout from '@/components/Layout'
import {API_URL, PER_PAGE} from '@/config/index'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'

export default function EventsPage({ events, page, total }) {　//クライアント側②
  // console.log(events)  // webのコンソールに出力
  
  return (
    <Layout>
      <h1>イベント</h1>
      {events.length ===0 && <h3>No events to show</h3>}

      {/* {events.map((evt) => (
        <h3 key={evt.id}>{evt.name}</h3> */}
      
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/> 
      ))}

      <Pagination page={page} total={total} />

      {/* {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>前ページ</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary'>次ページ</a>
        </Link>
      )} */}

      {/* {events.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View All Events</a>
        </Link>
      )} */}
    </Layout>
  )
}

// 32 Pagenation  localhost:3000/events?page=2
// export async function getServerSideProps({query: {page = 1}}) {
export async function getServerSideProps(context) {
  const { query } = context
  const { page = 1 } = query
  console.log(page)

  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetch events
  const eventRes = await fetch(`${API_URL}/events?_sort=date:DESC&_limit=${PER_PAGE}&_start=${start}`)
  // const res = await fetch(`${API_URL}/api/events`)
  const events = await eventRes.json()

  // console.log(events)  // サーバー側なので更新ごとにターミナルに出力

  return {
    props: { events, page: +page, total },  // クライアントへ渡す①
  }
}

// export async function getStaticProps() {　　　// getServerSideProps()
//   const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
//   // const res = await fetch(`${API_URL}/api/events`)
//   const events = await res.json()

//   console.log(events)  // サーバー側なので更新ごとにターミナルに出力

//   return {
//     props: {events},  // クライアントへ渡す①
//     revalidate: 1,  // 1秒
//   }
// }