'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AppNavBar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 right-0 top-0 flex items-center justify-center gap-2 bg-black p-4">
      <Link className={pathname === '/' ? 'text-blue-500' : ''} href="/">
        home
      </Link>
      <Link className={pathname === '/test' ? 'text-blue-500' : ''} href="/test">
        test
      </Link>
      <Link className={pathname === '/tools' ? 'text-blue-500' : ''} href="/tools">
        tools
      </Link>
    </div>
  )
}
