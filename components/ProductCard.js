'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../contexts/CartContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  
  const primaryImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/placeholder-soap.jpg'

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <div className={styles.productCardWrapper}>
      <Link href={`/product/${product.id}`} className={styles.productCardLink}>
        <div className={styles.productCard}>
          <div className={styles.productImage}>
            <Image 
              src={primaryImage} 
              alt={product.name}
              width={300}
              height={300}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+PC9zdmc+"
            />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productDescription}>{product.short_description}</p>
            <div className={styles.productSize}>{product.size}</div>
          </div>
        </div>
      </Link>
      
      <button
        onClick={handleAddToCart}
        className={styles.addToCartButton}
      >
        Add to Cart - ${product.price}
      </button>
    </div>
  )
}