'use client'

import { useEffect } from 'react'
import styles from './Notification.module.css'

export default function Notification({ type, message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (onClose && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [onClose, duration])

  if (!message) return null

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓'
      case 'error': return '✕'
      case 'info': return 'i'
      case 'warning': return '⚠'
      default: return 'i'
    }
  }

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.notificationContent}>
        <div className={styles.notificationIcon}>
          {getIcon()}
        </div>
        <div className={styles.notificationMessage}>
          {message}
        </div>
        {onClose && (
          <button 
            className={styles.notificationClose}
            onClick={onClose}
            aria-label="Close notification"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}