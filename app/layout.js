import './global.css'
export const metadata = {
    title: 'Ignit.Io',
    description: 'A startup project to help you ignite your ideas.',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
  