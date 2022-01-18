import Link from 'next/link'
import Layout from '@/components/Layout'

export default function AboutPage() {
  return (
    <Layout title='About DJ Event'>
      <h1>About</h1>
      <p>This is an app to find the latest IT events and study meetings</p>
      <p>Version: 1.0.0</p>
      {/* <a href='/'>Home</a> */}
      <Link href='/'>Home</Link>
    </Layout>
  )
}
