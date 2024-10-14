import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import React, { useState } from 'react'
import * as XLSX from 'xlsx'

export default function SplitExcel() {
  const [file, setFile] = useState<File | null>(null)
  const [splitBy, setSplitBy] = useState<'rows' | 'columns'>('rows') // 'rows' 或 'columns'

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
  }

  const splitAndDownload = async () => {
    if (!file) return

    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const json: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 })

    const zip = new JSZip()

    if (splitBy === 'rows') {
      json.forEach((row: string[], index: number) => {
        const newSheet = XLSX.utils.aoa_to_sheet([row])
        const newWorkbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Sheet1')
        const wbout = XLSX.write(newWorkbook, { type: 'binary', bookType: 'xlsx' })
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
        zip.file(`Row_${index + 1}.xlsx`, blob)
      })
    } else {
      const columns: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })
      columns[0].forEach((col: string, index: number) => {
        const colData = json.map((row: string[]) => [row[index]])
        const newSheet = XLSX.utils.aoa_to_sheet(colData)
        const newWorkbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Sheet1')
        const wbout = XLSX.write(newWorkbook, { type: 'binary', bookType: 'xlsx' })
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
        zip.file(`Column_${index + 1}.xlsx`, blob)
      })
    }

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'split_files.zip')
  }

  const s2ab = (s: string): ArrayBuffer => {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <div className="flex gap-2">
        <label>
          <input type="radio" value="rows" checked={splitBy === 'rows'} onChange={() => setSplitBy('rows')} />
          按行拆分
        </label>
        <label>
          <input type="radio" value="columns" checked={splitBy === 'columns'} onChange={() => setSplitBy('columns')} />
          按列拆分
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={splitAndDownload}>拆分并下载</button>
      </div>
    </div>
  )
}
