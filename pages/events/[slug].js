import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
// import EventMap from '@/components/EventMap'  

export default function EventPage({ evt }) {
  const router = useRouter()
  //console.log(router)
  // const deleteEvent = async(e) => {
  //   // console.log('delete')
  //   if (confirm('Are you sure?')) {
  //     const res = await fetch(`${API_URL}/events/${evt.id}`, { method: 'DELETE' })
  //     const data = res.json()

  //     if (!res.ok) {
  //       toast.error(data.message)
  //     } else {
  //       router.push('/events')
  //     }

  //   }
  // }

  return (
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div> */}
      </div>
      {/* <h1>{evt.name}</h1>  //18 削除 */}

      {/* <h1>{router.query.slug}</h1>
      <button onClick={()=> router.push('/')}>Click</button> */}
      <span>{new Date(evt.date).toLocaleDateString('ja-JP')} at {evt.time}</span>
      <h1>{evt.name_ja}</h1>
      <ToastContainer />
      {evt.image && (
        <div className={styles.image}>
          <Image
            src={evt.image.formats.small.url}
            width={960}
            height={600}
          />
        </div>
      )}
      <h3>Organizer:</h3>
              <p>{evt.organizers}</p>
              <h3>Description:</h3>
              <p>{evt.description}</p>
              <h3>Venue: {evt.venue}</h3>
              <p>{evt.address}</p>
              {/* <EventMap evt={evt} /> */}

              <Link href='/events'>
                <a className={styles.back}>{'<'} Go Back</a>
              </Link>

    
    </Layout>
  )
}

// 49 Comment Out
// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`)
//   // const res = await fetch(`${API_URL}/api/events`)
//   const events = await res.json()

//   const paths = events.map(evt => ({
//     params: {slug: evt.slug}
//   }))

//   return {
//     paths,
//     fallback: true,
//     // [
//     //   {params: {slug:1}},
//     //   {params: {slug:2}},
//     //   {params: {slug:3}},
//     // ]

//   }
// }

// export async function getStaticProps({ params: {slug} }) {

//     console.log(slug)
//     const res = await fetch(`${API_URL}/events?slug=${slug}`)
//     // const res = await fetch(`${API_URL}/api/events/${slug}`)
//     const events = await res.json()
  
//     return  {
//       props: {
//         evt: events[0],
//       },
//       revalidate: 1
//     }
//   }
  

// 49
export async function getServerSideProps({query: {slug}}) {

  console.log(slug)
  // const res = await fetch(`${API_URL}/api/events/${slug}`)
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return  {
    props: {
      evt: events[0]
    }

  }
}
