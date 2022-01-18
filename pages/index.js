// import Head from 'next/head'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import EventItem from '@/components/EventItem'
import Link from 'next/link'

export default function HomePage({events}) {　//クライアント側②
  console.log(events)  // webのコンソールに出力
  return (
    <Layout>
      <h1>新着イベント</h1>
      {events.length ===0 && <h3>No events to show</h3>}

      {/* {events.map((evt) => (
        <h3 key={evt.id}>{evt.name}</h3> */}
      
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/> 
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {　　　// getServerSideProps()
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)  // 22 Connecting to the Strapi Api
  // const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  console.log(events)  // サーバー側なので更新ごとにターミナルに出力

  return {
    props: {events},  // 22 Connecting to the Strapi Api
    // props: {events: events.slice(0, 3)},  // クライアントへ渡す①
    revalidate: 1,  // 1秒
  }
}
