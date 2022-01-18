import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from '@/helpers/index'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

export default function AddEventPage({token}) {

  const [values, setValues] = useState({
    name_ja: '',
    name_en: '',
    organizers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log('submit')
    // console.log(values)

    // Validation
    const hasEmptyFields = Object.values(values).some((element)=>element ==='')
    if (hasEmptyFields) {
      toast.error('Please fill in all fields', {theme: 'colored'})
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(values)
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included', { theme: 'colored' })
        return  // ⇓のエラー表示されなくなる
      }
      toast.error('Something Went Wrong!', {theme: 'colored'})
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({...values,  [name]: value })
  }

  return (
    <Layout title='イベントの追加'>
      <Link href='/events'>Go Back</Link>
      <h1>イベントの追加</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name_ja">イベント名 (Japanese)</label>
            <input type="text" id="name_ja" name="name_ja" value={values.name}
            onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="name_en">Event Name (English)</label>
            <input type="text" id="name_en" name="name_en" value={values.name}
            onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="organizers">主催者</label>
            <input type="text" id="organizers" name="organizers" value={values.name}
            onChange={handleInputChange} />
          </div>
          <div></div>
          <div>
            <label htmlFor="venue">場所</label>
            <input type="text" id="venue" name="venue" value={values.name}
            onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="address">アドレス</label>
            <input type="text" id="address" name="address" value={values.name}
            onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="date">日付</label>
            <input type="date" id="date" name="date" value={values.name}
            onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="time">時間</label>
            <input type="text" id="time" name="time" value={values.name}
            onChange={handleInputChange} />
          </div>
        </div>
        <div>
            <label htmlFor="description">イベント詳細</label>
            <textarea type="text" id="description" name="description" value={values.name}
            onChange={handleInputChange} ></textarea>
        </div>
        
        <input type="submit" value="イベントの追加" className='btn'/>
      </form>
    </Layout>
  )
}

// 45 Associating Events with users
export async function getServerSideProps({req}) {
  const { token } = parseCookies(req)

  return {
    props: {
      token
    }
  }
}