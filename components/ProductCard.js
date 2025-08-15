import Link from 'next/link'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const primaryImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/placeholder-soap.jpg'

  return (
    <Link href={`/product/${product.id}`} className={styles.productCardLink}>
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <img 
            src={primaryImage} 
            alt={product.name}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgODBDMTcwLjk4NyA4MCAyMDAgOTMuNDMxNSAyMDAgMTIwQzIwMCAxNDYuNTY5IDE3MC45ODcgMTYwIDE1MCAxNjBDMTI5LjAxMyAxNjAgMTAwIDE0Ni41NjkgMTAwIDEyMEMxMDAgOTMuNDMxNSAxMjkuMDEzIDgwIDE1MCA4MFoiIGZpbGw9IiMyNTYzRUIiLz4KPHA+YXRoIGQ9Ik0xNTAgMTQwSDE1MEMxNzAuOTg3IDE0MCAyMDAgMTUzLjQzMSAyMDAgMTgwQzIwMCAyMDYuNTY5IDE3MC45ODcgMjIwIDE1MCAyMjBIMTUwQzEyOS4wMTMgMjIwIDEwMCAyMDYuNTY5IDEwMCAxODBDMTAwIDE1My40MzEgMTI5LjAxMyAxNDAgMTUwIDE0MFoiIGZpbGw9IiMzQjgyRjYiLz4KPHA+YXRoIGQ9Ik0xNTAgMTYwSDE1MEMxNjUuNDY0IDE2MCAyMDAgMTY1LjA5NyAyMDAgMTgwQzIwMCAxOTQuOTAzIDE2NS40NjQgMjAwIDE1MCAyMDBIMTUwQzEzNC41MzYgMjAwIDEwMCAxOTQuOTAzIDEwMCAxODBDMTAwIDE2NS4wOTcgMTM0LjUzNiAxNjAgMTUwIDE2MFoiIGZpbGw9IiNEQkVBRkUiLz4KPC9zdmc+'
            }}
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
  )
}