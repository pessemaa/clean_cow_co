import InquiryForm from '../../components/InquiryForm'
import styles from './page.module.css'

export const metadata = {
  title: 'About Us - Clean Cow Co',
  description: 'Learn about Clean Cow Co\'s commitment to crafting premium handmade soaps with natural ingredients.',
}

export default function About() {
  return (
    <div className={styles.about}>
      <div className="container">
        <div className={styles.aboutHeader}>
          <h1>About Clean Cow Co</h1>
          <p className={styles.aboutIntro}>
            Our passion for natural skincare and sustainable practices drives us to create 
            the finest handmade soaps using traditional methods and premium ingredients.
          </p>
        </div>

        <section className={styles.aboutContent}>
          <div className={styles.contentSection}>
            <div className={styles.textContent}>
              <h2>Our Story</h2>
              <p>
                Clean Cow Co was born from a simple belief: that everyday skincare should be both 
                luxurious and natural. Founded in 2020, we started as a small family business with 
                a commitment to creating high-quality, handmade soaps that nourish your skin while 
                being gentle on the environment.
              </p>
              <p>
                Every bar of soap we create is handcrafted in small batches using traditional 
                cold-process methods. We carefully select premium natural ingredients, including 
                organic oils, essential oils, and botanicals, ensuring each soap provides a unique 
                and beneficial experience for your skin.
              </p>
            </div>
            <div className={styles.imageContent}>
              <div className={styles.aboutImage}>
                <img 
                    src="/about/soap_process.webp" 
                    alt="Soap making process at Clean Cow Co"
                    className={styles.aboutImageImg}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.contentSection} ${styles.reverse}`}>
            <div className={styles.textContent}>
              <h2>Our Mission</h2>
              <p>
                We believe that self-care should be accessible, sustainable, and enjoyable. 
                Our mission is to provide premium handmade soaps that transform your daily 
                routine into a moment of luxury and mindfulness.
              </p>
              <p>
                We&apos;re committed to using environmentally responsible practices, from sourcing 
                our ingredients to packaging our products. Each soap is wrapped in biodegradable 
                materials, and we continuously work to minimize our environmental footprint.
              </p>
              <div className={styles.missionPoints}>
                <div className={styles.missionPoint}>
                  <strong>Natural Ingredients:</strong> Only the finest organic and natural components
                </div>
                <div className={styles.missionPoint}>
                  <strong>Handcrafted Quality:</strong> Every soap is made with care and attention to detail
                </div>
                <div className={styles.missionPoint}>
                  <strong>Sustainable Practices:</strong> Environmentally responsible from start to finish
                </div>
              </div>
            </div>
            <div className={styles.imageContent}>
              <div className={styles.aboutImage}>
                <img 
                  src="/about/ingredients.webp" 
                  alt="Natural ingredients used in our soaps"
                  className={styles.aboutImageImg}
                />
              </div>
            </div>
          </div>

          <div className={styles.inquirySection}>
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
    </div>
  )
}