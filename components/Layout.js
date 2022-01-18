import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'
import styles from '@/styles/Layout.module.css'
import { useRouter } from 'next/router'

export default function Layout({title, keywords, description, children}) {
  const router = useRouter()
  
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Header />

      { router.pathname === '/' && <Showcase />}

      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'IT イベント | IT勉強会支援', 
  description: 'IT勉強会支援プラットフォーム',
  keywords: 'IT, エンジニア, 勉強会, イベント'
}