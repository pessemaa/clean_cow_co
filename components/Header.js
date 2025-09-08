'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { BsCart3 } from 'react-icons/bs'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems, isLoaded } = useCart()
  const totalItems = getTotalItems()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoContainer}>
                <Image 
                  src="/logo.jpeg" 
                  alt="Clean Cow Co Logo" 
                  width={40} 
                  height={40}
                  className={styles.logoImage}
                  priority
                />
                <h2 className={styles.logoText}>Clean Cow Co. </h2>
              </div>
            </Link>
          </div>
          
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/inventory" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
            </ul>
          </nav>

          <div className={styles.headerActions}>
            {/* Cart Icon */}
            <Link href="/cart" className={styles.cartButton}>
              <BsCart3 className={styles.cartIcon} />
              {isLoaded && totalItems > 0 && (
                <span className={styles.cartBadge}>
                  {totalItems}
                </span>
              )}
              {!isLoaded && (
                <span className={styles.cartLoading}></span>
              )}
            </Link>

            <button 
              className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}