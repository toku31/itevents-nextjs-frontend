import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import AuthContext from '@/context/AuthContext'
import { useContext } from 'react'

export default function Header() {
  const { user, logout } = useContext(AuthContext) 

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/' >
          <a>ITイベント情報</a>
        </Link>
      </div>

      {/* 24 */}
      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>全てのイベント</a>
            </Link>
          </li>
          {user ? (
            // If logged in
            <>
              <li>
                <Link href='/events/add'>
                  <a>イベントの追加</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button onClick={() => logout()} className="btn-secondary btn-icon">
                  <FaSignOutAlt />Logout
                </button>
              </li>
            </> 
          ) : (
            // If logged out
            <>
              <li>
                <Link href='/account/login'>
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt />
                  </a>
                </Link>
              </li>
            </>
          )}
       </ul>
      </nav>
    </header>
  )
}
