'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProductGallery from '../../../components/ProductGallery'
import InquiryForm from '../../../components/InquiryForm'
import { useCart } from '../../../contexts/CartContext'
import { getProduct } from '../../../lib/supabase'
import styles from './page.module.css'

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

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

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, Math.min(99, newQuantity))
    setQuantity(qty)
  }

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleQuantityIncrease = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

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
                <li>Handcrafted with locally-sourced beef tallow</li>
                <li>Simple ingredients, luxurious quality</li>
                <li>Formulated with love</li>
              </ul>
            </div>

            <div className={styles.quantitySelector}>
              <h4>Quantity</h4>
              <div className={styles.quantityControls}>
                <button 
                  type="button"
                  className={styles.quantityBtn}
                  onClick={handleQuantityDecrease}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className={styles.quantityInput}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max="99"
                />
                <button 
                  type="button"
                  className={styles.quantityBtn}
                  onClick={handleQuantityIncrease}
                  disabled={quantity >= 99}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.productActions}>
              <Link href="/inventory" className="btn btn-secondary">
                ← Back to Products
              </Link>
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
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
