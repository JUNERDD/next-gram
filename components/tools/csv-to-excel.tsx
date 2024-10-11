import { saveAs } from 'file-saver'
import { useState } from 'react'
import * as XLSX from 'xlsx'

export default function CsvToExcel() {
  const [excelData, setExcelData] = useState(null)
  const [text, setText] = useState('')

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return
    }
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      if (!event.target) {
        return
      }
      const csvText = event.target.result as string
      setText(csvText) // 将CSV内容设置到textarea中
    }
    reader.readAsText(file) // 读取CSV文件内容为文本
  }

  const handleConvert = () => {
    if (text) {
      const workbook = XLSX.read(text, { type: 'string' }) // 读取CSV文本为工作簿
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      setExcelData(excelBuffer)
    } else {
      alert('请先上传CSV文件或输入内容')
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
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="请输入文本内容"
        className="h-48 w-full"
      ></textarea>
      <div className="flex gap-2">
        <button onClick={handleConvert}>转换</button>
        <button onClick={handleDownload}>下载</button>
      </div>
    </div>
  )
}
