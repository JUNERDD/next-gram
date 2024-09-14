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
      <body>
        <Providers>
          <AppNavBar />
          {props.children}
          {props.modal}
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  )
}
