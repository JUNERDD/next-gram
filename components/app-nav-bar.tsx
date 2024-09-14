'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AppNavBar() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <Link className={pathname === '/' ? 'text-blue-500' : ''} href="/">
        home
      </Link>
      <Link className={pathname === '/test' ? 'text-blue-500' : ''} href="/test">
        test
      </Link>
    </div>
  )
}
