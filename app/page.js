import Link from 'next/link'
import InquiryForm from '../components/InquiryForm'
import styles from './page.module.css'

export default function Home() {
  const features = [
    { 
      icon: '🌿', 
      title: 'Natural Ingredients', 
      desc: 'The star ingredient of our soap is beef tallow, which we render ourselves from locally-raised cows. Beef fat is a byproduct of the beef processing industry, and is usually wasted. We turn this byproduct into our liquid gold, which makes amazing soap.' 
    },
    { 
      icon: '🤲', 
      title: 'Handcrafted Quality', 
      desc: 'Our soap is made in small batches, which means each bar is carefully handcrafted using traditional methods for superior quality.' 
    },
    { 
      icon: '❤️', 
      title: 'Care', 
      desc: 'Every product is made with love and attention to provide the best experience for our customers.' 
    },
    { 
      icon: '🤝', 
      title: 'Community', 
      desc: 'We support local suppliers and believe in building strong relationships with our community.' 
    }
  ]

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Welcome to Clean Cow Co. </h1>
            <p className={styles.heroSubtitle}>
              Small batch, handcrafted soaps and skincare products made from locally-sourced beef tallow in Urbana, Illinois.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/inventory" className="btn btn-primary btn-large">
                Shop Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why Choose Clean Cow Co?</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.inquirySection}>
        <div className="container">
          <h2>Get In Touch</h2>
          <p className={styles.inquirySectionText}>
            Have questions about our products or want to make a special request? Get in touch with us!
          </p>
          <InquiryForm 
            productId={null} 
            productName="General Inquiry" 
          />
        </div>
      </section>
    </div>
  )
}
