import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Clean Cow Co</h3>
            <p>Handcrafted soaps made with natural ingredients for a luxurious bathing experience.</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/inventory">Products</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Contact Info</h4>
            <p>Email: info@cleancowco.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Clean Cow Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}