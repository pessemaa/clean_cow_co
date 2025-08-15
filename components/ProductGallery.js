'use client'

import { useState } from 'react'
import styles from './ProductGallery.module.css'

export default function ProductGallery({ images, productName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Fallback for empty or invalid images array
  const validImages = images && images.length > 0 ? images : [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNTAgMTAwQzI5MC4yMTcgMTAwIDMzMCAxMTguOTA1IDMzMCAxNTBDMzMwIDE4MS4wOTUgMjkwLjIxNyAyMDAgMjUwIDIwMEMyMDkuNzgzIDIwMCAxNzAgMTgxLjA5NSAxNzAgMTUwQzE3MCAxMTguOTA1IDIwOS43ODMgMTAwIDI1MCAxMDBaIiBmaWxsPSIjMjU2M0VCIi8+CjxwYXRoIGQ9Ik0yNTAgMTgwSDI1MEMyOTAuMjE3IDE4MCAzMzAgMTk4LjkwNSAzMzAgMjMwQzMzMCAyNjEuMDk1IDI5MC4yMTcgMjgwIDI1MCAyODBIMjUwQzIwOS43ODMgMjgwIDE3MCAyNjEuMDk1IDE3MCAyMzBDMTcwIDE5OC45MDUgMjA5Ljc4MyAxODAgMjUwIDE4MFoiIGZpbGw9IiMzQjgyRjYiLz4KPHA+YXRoIGQ9Ik0yNTAgMjIwSDI1MEMyNzYuOTQ0IDIyMCAzMzAgMjI4LjgzOSAzMzAgMjQwQzMzMCAyNTEuMTYxIDI3Ni45NDQgMjYwIDI1MCAyNjBIMjUwQzIyMy4wNTYgMjYwIDE3MCAyNTEuMTYxIDE3MCAyNDBDMTcwIDIyOC44MzkgMjIzLjA1NiAyMjAgMjUwIDIyMFoiIGZpbGw9IiNEQkVBRkUiLz4KPHA+YXRoIGQ9Ik0yNTAgMzIwSDI1MEMyOTAuMjE3IDMyMCAzMzAgMzM4LjkwNSAzMzAgMzcwQzMzMCA0MDEuMDk1IDI5MC4yMTcgNDIwIDI1MCA0MjBIMjUwQzIwOS43ODMgNDIwIDE3MCA0MDEuMDk1IDE3MCAzNzBDMTcwIDMzOC45MDUgMjA5Ljc4MyAzMjAgMjUwIDMyMFoiIGZpbGw9IiMzQjgyRjYiLz4KPC9zdmc+'
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === validImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? validImages.length - 1 : prev - 1
    )
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className={styles.productGallery}>
      <div className={styles.mainImageContainer}>
        <img 
          src={validImages[currentImageIndex]} 
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className={styles.mainImage}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNTAgMTAwQzI5MC4yMTcgMTAwIDMzMCAxMTguOTA1IDMzMCAxNTBDMzMwIDE4MS4wOTUgMjkwLjIxNyAyMDAgMjUwIDIwMEMyMDkuNzgzIDIwMCAxNzAgMTgxLjA5NSAxNzAgMTUwQzE3MCAxMTguOTA1IDIwOS43ODMgMTAwIDI1MCAxMDBaIiBmaWxsPSIjMjU2M0VCIi8+CjxwYXRoIGQ9Ik0yNTAgMTgwSDI1MEMyOTAuMjE3IDE4MCAzMzAgMTk4LjkwNSAzMzAgMjMwQzMzMCAyNjEuMDk1IDI5MC4yMTcgMjgwIDI1MCAyODBIMjUwQzIwOS43ODMgMjgwIDE3MCAyNjEuMDk1IDE3MCAyMzBDMTcwIDE5OC45MDUgMjA5Ljc4MyAxODAgMjUwIDE4MFoiIGZpbGw9IiMzQjgyRjYiLz4KPHA+YXRoIGQ9Ik0yNTAgMjIwSDI1MEMyNzYuOTQ0IDIyMCAzMzAgMjI4LjgzOSAzMzAgMjQwQzMzMCAyNTEuMTYxIDI3Ni45NDQgMjYwIDI1MCAyNjBIMjUwQzIyMy4wNTYgMjYwIDE3MCAyNTEuMTYxIDE3MCAyNDBDMTcwIDIyOC44MzkgMjIzLjA1NiAyMjAgMjUwIDIyMFoiIGZpbGw9IiNEQkVBRkUiLz4KPHA+YXRoIGQ9Ik0yNTAgMzIwSDI1MEMyOTAuMjE3IDMyMCAzMzAgMzM4LjkwNSAzMzAgMzcwQzMzMCA0MDEuMDk1IDI5MC4yMTcgNDIwIDI1MCA0MjBIMjUwQzIwOS43ODMgNDIwIDE3MCA0MDEuMDk1IDE3MCAzNzBDMTcwIDMzOC45MDUgMjA5Ljc4MyAzMjAgMjUwIDMyMFoiIGZpbGw9IiMzQjgyRjYiLz4KPC9zdmc+'
          }}
        />
        
        {validImages.length > 1 && (
          <>
            <button 
              className={`${styles.navButton} ${styles.prevButton}`} 
              onClick={prevImage}
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button 
              className={`${styles.navButton} ${styles.nextButton}`} 
              onClick={nextImage}
              aria-label="Next image"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className={styles.thumbnailContainer}>
          {validImages.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
              onClick={() => goToImage(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img 
                src={image} 
                alt={`${productName} thumbnail ${index + 1}`}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjIwIiBmaWxsPSIjMjU2M0VCIi8+Cjwvc3ZnPg=='
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}