import EXPERIMENT_DATA from '../data/data'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

/**
 * fn 字符串转字符流
 * @param s
 * @returns {ArrayBuffer}
 */
function s2ab (s) {
  let buf = new ArrayBuffer(s.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}

function data2ws (data) {
  const ws = {}
  const range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}}
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      const cell = { v: data[R][C] }
      if (cell.v == null) continue
      const cellRef = XLSX.utils.encode_cell({c: C, r: R})
      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean'){cell.t = 'b'}
      else {
        cell.t = 's'
      }
      ws[cellRef] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

function Workbook () {
  if (!(this instanceof Workbook)) {
    return new Workbook()
  }
  this.SheetNames = []
  this.Sheets = {}
}

// 暴露出去的转换味excel的方法
export const toExcel = ({th, data, fileName, fileType, sheetName}) => {
  data.unshift(th)
  const wb = new Workbook()
  const ws = data2ws(data)
  sheetName = sheetName || 'sheet1'
  wb.SheetNames.push(sheetName)
  wb.Sheets[sheetName] = ws
  fileType = fileType || 'xlsx'
  var wbout = XLSX.write(wb, {bookType: fileType, bookSST: false, type: 'binary'})
  fileName = fileName || '列表'
  saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), `${fileName}.${fileType}`)
}

// 从数组中获取指定数量的随机实验数据
export const getRandomExperimentData = (num,targetData) => {
    let randomData = []
    let totalDataLength = 0
    let hash = {}
    if(targetData && targetData.length > num){
        // 从指定的数据组中取随机数据
        totalDataLength = targetData && targetData.length
        for(let i=0;i<num;i++) {
          let randomIndex = generateRadomNum(totalDataLength)
          while(hash[randomIndex]) {
            randomIndex = generateRadomNum(totalDataLength)
          }
          hash[randomIndex] = true
          randomData.push(targetData[randomIndex])
        }
    }else {
        // 从全部实验样本中取随机数据
        totalDataLength = EXPERIMENT_DATA.length
        for(let i=0;i<num;i++){
            let randomIndex = generateRadomNum(totalDataLength)
            while(hash[randomIndex]){          
              randomIndex = generateRadomNum(totalDataLength)
            }
            hash[randomIndex] = true
            randomData.push(EXPERIMENT_DATA[randomIndex])
        }
    }
    return randomData
}

function generateRadomNum (max) {
  return parseInt(Math.random()*(max),10)
}