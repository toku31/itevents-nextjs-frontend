import qs from 'qs'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import EventItem from '@/components/EventItem'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function SearchPage({events}) {　//クライアント側②
  // console.log(events)  // webのコンソールに出力
  const router = useRouter()

  return (
    <Layout title='Search Results'>
      {/* <h1>{router.query.term} の検索結果</h1> */}
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length ===0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/> 
      ))}
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {

  const query = qs.stringify({
    _where: {
      _or: [
        { name_ja_contains: term },
        { name_en_contains: term },
        { organizers_contains: term },
        { description_contains: term },
        { venue_contains: term }
      ]
    }
  })

  const res = await fetch(`${API_URL}/events?${query}`)
  // const res = await fetch(`${API_URL}/events?name_ja_contains=${term}`)
  // const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  console.log(events)  // サーバー側なので更新ごとにターミナルに出力

  return {
    props: {events},  // クライアントへ渡す①
  }
}
