import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <p>Copyright &copy; IT Events 2022</p>
        <p>
          <Link href='/about'>About This Project</Link>
        </p>
      </footer>
    </div>
  )
}
