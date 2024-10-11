import { saveAs } from 'file-saver'
import { useState } from 'react'
import * as XLSX from 'xlsx'

export default function ExcelToCsv() {
  const [file, setFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<string | null>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return
    }
    setFile(e.target.files[0])
    setCsvData(null) // 重置之前的转换数据
  }

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (!e.target) {
          return
        }

        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const wsName = workbook.SheetNames[0]
        const ws = workbook.Sheets[wsName]
        const csv = XLSX.utils.sheet_to_csv(ws)
        setCsvData(csv || null)
      }
      reader.readAsArrayBuffer(file)
    } else {
      alert('请先上传文件')
    }
  }

  const handleDownload = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
      saveAs(blob, 'converted.csv')
    } else {
      alert('请先转换文件')
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept=".xlsx,.xls" onChange={handleUpload} />
      <div className="flex gap-2">
        <button onClick={handleConvert}>转换</button>
        <button onClick={handleDownload} disabled={!csvData}>
          下载
        </button>
      </div>
      <textarea
        className="h-48 w-full whitespace-pre-wrap rounded p-2"
        placeholder="请输入文本内容"
        value={csvData || ''}
        onChange={(e) => setCsvData(e.target.value)}
      ></textarea>
    </div>
  )
}
