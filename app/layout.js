import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '../contexts/CartContext'

export const metadata = {
  title: 'Clean Cow Co - Handmade Soaps',
  description: 'Premium handmade soaps crafted with natural ingredients. Discover our collection of artisanal soaps for a luxurious bathing experience.',
  keywords: 'handmade soaps, natural soap, artisanal soap, organic soap, Clean Cow Co',
  icons: {
    icon: [
      { url: '/logo.jpeg'},
    ],
    apple: [
      { url: '/logo.jpeg', type: 'image/jpeg' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpeg" sizes="any" />
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}