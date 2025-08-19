'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
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
            <Link href="/">
              <h2>Clean Cow Co</h2>
            </Link>
          </div>
          
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link href="/inventory" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
            </ul>
          </nav>

          <div className={styles.headerActions}>
            {/* Cart Icon */}
            <Link href="/cart" className={styles.cartButton}>
              <span className={styles.cartIcon}>🛒</span>
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