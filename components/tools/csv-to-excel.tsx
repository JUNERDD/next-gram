import { saveAs } from 'file-saver'
import { useState } from 'react'
import * as XLSX from 'xlsx'

export default function CsvToExcel() {
  const [file, setFile] = useState<File | null>(null)
  const [excelData, setExcelData] = useState(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    setFile(e.target.files[0])
  }

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (!e.target) {
          return
        }

        const workbook = XLSX.read(e.target.result, { type: 'binary' })
        const ws = workbook.Sheets[workbook.SheetNames[0]]
        const excelBuffer = XLSX.write(
          { Sheets: { Sheet1: ws }, SheetNames: ['Sheet1'] },
          { bookType: 'xlsx', type: 'array' }
        )
        setExcelData(excelBuffer)
      }
      reader.readAsArrayBuffer(file)
    } else {
      alert('请先上传文件')
    }
  }

  const handleDownload = () => {
    if (excelData) {
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      saveAs(blob, 'converted.xlsx')
    } else {
      alert('请先转换文件')
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept=".csv" onChange={handleUpload} />
      <div className="flex gap-2">
        <button onClick={handleConvert}>转换</button>
        <button onClick={handleDownload}>下载</button>
      </div>
    </div>
  )
}
