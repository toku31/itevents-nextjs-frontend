import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'

export default function LoginPage() {
  const [email, setEmail]=useState('')
  const [password, setPassword] = useState('')

  const { login, error } = useContext(AuthContext)

  // 36
  useEffect(() => error && toast.error(error))
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('submit')
    // console.log({ email, password })
    login({ email, password })
  }
    // // Validation
    // const hasEmptyFields = Object.values(values).some((element)=>element ==='')
    // if (hasEmptyFields) {
    //   toast.error('Please fill in all fields')
    // }

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email}
            onChange={(e) => setEmail(e.target.value) } />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password}
            onChange={(e) => setPassword(e.target.value) } />
          </div>
          <input type="submit" value="Login" className='btn'/>
        </form>
        <p>
          Don't have an account? <Link href='/account/register'>Register</Link>
        </p>
      </div>
    </Layout>
  )
}
