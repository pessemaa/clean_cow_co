'use client'

import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import { getProducts } from '../../lib/supabase'
import styles from './page.module.css'

export default function Inventory() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className={styles.inventory}>
        <div className="container">
          <div className={styles.loadingContainer}>
            <div className="loading-spinner"></div>
            <p>Loading our beautiful soaps...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.inventory}>
        <div className="container">
          <div className={styles.errorContainer}>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.inventory}>
      <div className="container">
        <div className={styles.inventoryHeader}>
          <h1>Our Handmade Soap Collection</h1>
          <p className={styles.inventorySubtitle}>
            Discover our carefully crafted selection of premium soaps, each made with natural ingredients 
            and traditional methods for a luxurious bathing experience.
          </p>
        </div>

        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No products available</h3>
            <p>We&apos;re currently updating our inventory. Please check back soon!</p>
          </div>
        ) : (
          <>
            <div className={styles.productsCount}>
              <p>Showing {products.length} product{products.length !== 1 ? 's' : ''}</p>
            </div>
            
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}