import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  const features = [
    { 
      icon: '🌿', 
      title: 'Natural Ingredients', 
      desc: 'We use only the finest natural and organic ingredients in our handmade soaps.' 
    },
    { 
      icon: '🤲', 
      title: 'Handcrafted Quality', 
      desc: 'Each soap is carefully handmade using traditional methods for superior quality.' 
    },
    { 
      icon: '✨', 
      title: 'Luxurious Experience', 
      desc: 'Transform your daily routine into a spa-like experience with our premium soaps.' 
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
            <h1>Welcome to Clean Cow Co</h1>
            <p className={styles.heroSubtitle}>
              Discover our premium collection of handmade soaps crafted with natural ingredients. 
              Each bar is carefully made to provide you with a luxurious and nourishing bathing experience.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/inventory" className="btn btn-primary btn-large">
                Shop Our Products
              </Link>
              <Link href="/about" className="btn btn-secondary btn-large">
                Learn Our Story
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
    </div>
  )
}