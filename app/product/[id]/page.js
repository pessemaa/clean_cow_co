'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProductGallery from '../../../components/ProductGallery'
import InquiryForm from '../../../components/InquiryForm'
import { getProduct } from '../../../lib/supabase'
import styles from './page.module.css'

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const data = await getProduct(params.id)
        setProduct(data)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Product not found')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className={styles.productDetail}>
        <div className="container">
          <div className={styles.loadingContainer}>
            <div className="loading-spinner"></div>
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className={styles.productDetail}>
        <div className="container">
          <div className={styles.errorContainer}>
            <h2>Product Not Found</h2>
            <p>The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <div className={styles.errorActions}>
              <Link href="/inventory" className="btn btn-primary">
                Browse All Products
              </Link>
              <button 
                onClick={() => router.back()} 
                className="btn btn-secondary"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.productDetail}>
      <div className="container">
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <Link href="/inventory">Products</Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        <div className={styles.productContent}>
          <div className={styles.productGallerySection}>
            <ProductGallery 
              images={product.images} 
              productName={product.name} 
            />
          </div>

          <div className={styles.productInfoSection}>
            <div className={styles.productHeader}>
              <h1>{product.name}</h1>
              <div className={styles.productMeta}>
                <span className={styles.productPrice}>${product.price}</span>
                <span className={styles.productSize}>{product.size}</span>
              </div>
            </div>

            <div className={styles.productDescription}>
              <h3>About This Soap</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.productFeatures}>
              <h4>Product Features</h4>
              <ul>
                <li>Handcrafted with natural ingredients</li>
                <li>Free from harsh chemicals</li>
                <li>Suitable for all skin types</li>
                <li>Eco-friendly packaging</li>
                <li>Cruelty-free and vegan</li>
              </ul>
            </div>

            <div className={styles.productActions}>
              <Link href="/inventory" className="btn btn-secondary">
                ← Back to Products
              </Link>
            </div>
          </div>
        </div>

        <InquiryForm 
          productId={product.id} 
          productName={product.name} 
        />
      </div>
    </div>
  )
}