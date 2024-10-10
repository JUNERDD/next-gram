'use client'

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'

import CsvToExcel from '../../components/tools/csv-to-excel'

export default function Tools() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
      <Tabs aria-label="Options">
        <Tab key="csv-to-excel" title="CSV To Excel">
          <Card>
            <CardBody>
              <CsvToExcel />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}
