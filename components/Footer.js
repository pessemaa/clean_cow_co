import Link from 'next/link'
import { FaInstagram, FaEnvelope, FaFacebook } from 'react-icons/fa'
import { HiExternalLink } from 'react-icons/hi'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Clean Cow Co. </h3>
            <p>Handcrafted soaps made with natural ingredients for a luxurious bathing experience.</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/inventory">Products</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Contact Info</h4>
            <p>Email: kelly.cubjj@gmail.com</p>
            <p>Phone: (312) 451-9499</p>
            <div className={styles.socialIcons}>
              <a href="https://www.instagram.com/cleancowco" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="https://www.facebook.com/CleanCowCo" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a href="mailto:kelly.cubjj@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaEnvelope />
                <span>Email</span>
              </a>
              <a href="https://linktr.ee/cleancowco" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <HiExternalLink />
                <span>Linktree</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Clean Cow Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}