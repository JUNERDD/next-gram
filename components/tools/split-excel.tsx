import { Button, Checkbox, Divider, Input, Radio, RadioGroup } from '@nextui-org/react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import React, { useState } from 'react'
import * as XLSX from 'xlsx'

export default function SplitExcel() {
  const [file, setFile] = useState<File | null>(null)
  const [splitIntervals, setSplitIntervals] = useState(1)
  const [isRow, setIsRow] = useState(true)
  const [keepHeader, setKeepHeader] = useState(true)

  // 上传文件
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return
    }
    const file = e.target.files[0]
    setFile(file)
  }

  // 拆分并下载
  const handleSplitAndDownload = async () => {
    if (!file) {
      alert('请先上传Excel文件')
      return
    }

    // 读取上传的Excel文件
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)

    // 假设只处理第一个工作表
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json<string[][]>(worksheet, { header: 1 }) // 以数组形式获取数据

    // 根据选择进行拆分
    const splitDataArray = []
    if (isRow) {
      // 按行拆分
      const headerRow = keepHeader ? jsonData[0] : null // 获取表头
      const dataRows = keepHeader ? jsonData.slice(1) : jsonData // 数据行

      for (let i = 0; i < dataRows.length; i += splitIntervals) {
        let chunk = dataRows.slice(i, i + splitIntervals)
        if (keepHeader && headerRow) {
          chunk = [headerRow, ...chunk] // 在每个块的开头添加表头
        }
        splitDataArray.push(chunk)
      }
    } else {
      // 按列拆分
      const numColumns = jsonData[0].length
      for (let i = 0; i < numColumns; i += splitIntervals) {
        const chunk = jsonData.map((row) => row.slice(i, i + splitIntervals))
        splitDataArray.push(chunk)
      }
    }

    // 创建压缩包
    const zip = new JSZip()

    // 遍历拆分的数据，生成新的Excel文件并添加到压缩包中
    splitDataArray.forEach((dataChunk, index) => {
      const newWorkbook = XLSX.utils.book_new()
      const newWorksheet = XLSX.utils.aoa_to_sheet(dataChunk)
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1')
      const wbout = XLSX.write(newWorkbook, {
        type: 'array',
        bookType: 'xlsx'
      })
      zip.file(`split_${index + 1}.xlsx`, wbout)
    })

    // 生成压缩包并触发下载
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'split_excel_files.zip') // 修改文件名
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept=".xlsx,.xls" onChange={handleUpload} />

      <div className="flex h-6 gap-4">
        <RadioGroup
          orientation="horizontal"
          style={{
            flexShrink: 0
          }}
          value={isRow ? 'row' : 'column'}
          onChange={(e) => {
            setIsRow(e.target.value === 'row')
          }}
        >
          <Radio value="row">按行拆分</Radio>
          <Radio value="column">按列拆分</Radio>
        </RadioGroup>

        <Divider orientation="vertical" />

        <Checkbox checked={keepHeader} onChange={(e) => setKeepHeader(e.target.checked)} isDisabled={!isRow}>
          包含表头
        </Checkbox>
      </div>

      <Input
        type="number"
        label="拆分间隔"
        min={1}
        value={splitIntervals.toString()}
        onChange={(e) => setSplitIntervals(Number(e.target.value))}
      />

      <Button onClick={handleSplitAndDownload}>拆分并下载</Button>
    </div>
  )
}
