import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/EventItem.module.css'

export default function EventItem({evt}) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
         {/* 22 connecting Strapi api */}
        <Image src={evt.image ? evt.image.formats.thumbnail.url : '/images/event-default.png'} width={170} height={100} />
        {/* <Image src={evt.image ? evt.image : '/images/event-default.png'} width={170} height={100} /> */}
      </div>

      <div className={styles.info}>
        <span>
          
          {new Date(evt.date).toLocaleDateString('ja-JP')} at {evt.time}
        </span>
        <h3>{evt.name_ja}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn">詳細</a>
        </Link>
      </div>
    </div>
  )
}
