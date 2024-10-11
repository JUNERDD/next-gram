import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <nav className="w-64 p-4">
        <ul>
          <li className="mb-2">
            <Link href="#csv-to-excel">CSV 转 Excel</Link>
          </li>
          <li className="mb-2">
            <Link href="#excel-to-csv">Excel 转 CSV</Link>
          </li>
        </ul>
      </nav>
      <section className="flex-1">{children}</section>
    </div>
  )
}
