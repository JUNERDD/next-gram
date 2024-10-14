import './global.css'

import AppNavBar from '../components/app-nav-bar'
import { Providers } from '../components/providers'

export const metadata = {
  title: 'NextGram',
  description: 'A sample Next.js app showing dynamic routing with modals as a route.'
}

export default function RootLayout(props: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="px-4 pt-20">
        <AppNavBar />
        <Providers>
          {props.children}
          {props.modal}
        </Providers>
      </body>
    </html>
  )
}
