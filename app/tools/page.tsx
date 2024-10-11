'use client'

import { Card, CardBody } from '@nextui-org/react'

import CsvToExcel from '../../components/tools/csv-to-excel'
import ExcelToCsv from '../../components/tools/excel-to-csv'
import SplitExcel from '../../components/tools/split-excel'

export default function Tools() {
  const tools = [
    { key: 'csv-to-excel', title: 'CSV To Excel', component: CsvToExcel },
    { key: 'excel-to-csv', title: 'Excel To CSV', component: ExcelToCsv },
    { key: 'split-excel', title: 'Split Excel', component: SplitExcel }
  ]

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
      <ul className="w-full">
        {tools.map((tool) => (
          <li key={tool.key} className="mb-4">
            <h2 id={tool.key} className="mb-2 text-xl font-bold">
              <a href={`#${tool.key}`}>{tool.title}</a>
            </h2>
            <Card>
              <CardBody>
                <tool.component />
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
