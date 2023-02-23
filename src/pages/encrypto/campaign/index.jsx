import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, Input, Button } from 'antd'
import { ethers } from 'ethers'
import csv from 'csvtojson'
import { ALCHEMY_POLYGON_AD3_KEY } from '@/utils/const'
import { request } from '@/utils/request'
import styles from './index.module.less'

let privateKey = '6d508f0fd0f4ba21aac1e32391d2b6299a2a453958a9010b1b587c1fc358f5c7'
export default () => {
  const [originalData, setOriginalData] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [wallet, setWallet] = useState(null)
  const [params] = useSearchParams()
  const id = params.get('id')

  // 设置私钥
  const setPrivateKey = (e) => {
    privateKey = e.target.value
  }

  // 登录钱包
  const onConnect = () => {
    const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_POLYGON_AD3_KEY)
    const wallet = new ethers.Wallet(privateKey, provider)
    setWallet(wallet)
  }

  // 加密 csv 数据
  const encryptoDataFormat = async (data) => {
    // 创建消息
    const message = ethers.utils.solidityKeccak256(['address', 'address', 'uint256', 'uint8'], data)
    // 签名
    const messageHashBytes = ethers.utils.arrayify(message)
    const signature = await wallet.signMessage(messageHashBytes)
    const r = signature.slice(0, 66)
    const s = `0x${signature.slice(66, 130)}`
    const v = parseInt(signature.slice(130, 132), 16)
    return { r, s, v }
  }

  // 上传 csv 文件
  const uploadCSV = (e) => {
    const el = e.target
    const reader = new FileReader()
    reader.addEventListener('loadend', async () => {
      const csvStr = reader.result.toString()
      const csvData = await csv({}).fromString(csvStr)

      console.info(csvData)

      const cpaPromiseArr = csvData
        .filter((d) => `${d['是否有CPA奖励']}`.toLocaleLowerCase() === 'true')
        .map((row) => {
          const d = [row['用户地址'], row['合约地址'], row['CPA奖励金额'], 1]
          return encryptoDataFormat(d).then((ret) => ({
            ...row,
            cpaTaskFeeKeyR: ret.r,
            cpaTaskFeeKeyS: ret.s,
            cpaTaskFeeKeyV: ret.v
          }))
        })

      const taskPromiseArr = csvData
        .filter((d) => `${d['是否有任务奖励']}`.toLocaleLowerCase() === 'true')
        .map((row) => {
          const d = [row['用户地址'], row['合约地址'], row['任务奖励金额'], 0]
          return encryptoDataFormat(d).then((ret) => ({
            ...row,
            actionTaskFeeKeyR: ret.r,
            actionTaskFeeKeyS: ret.s,
            actionTaskFeeKeyV: ret.v
          }))
        })

      const cryptoData = await Promise.all([...cpaPromiseArr, ...taskPromiseArr])
      const formatCryptoData = cryptoData.reduce((result, cur) => {
        const userAddress = cur['用户地址']
        const index = result.findIndex((r) => r['用户地址'] === userAddress)
        if (index >= 0) {
          result[index] = { ...result[index], ...cur }
        } else {
          result.push({ ...cur })
        }
        return result
      }, [])
      console.info(formatCryptoData)
      setDataSource(formatCryptoData)
    })
    reader.readAsText(el.files[0])
  }

  // 导出原始数据
  const onDownload = () => {
    const headers = [
      '用户地址',
      '合约地址',
      '活动ID',
      'CPA奖励货币',
      'CPA奖励区块链',
      'CPA奖励金额',
      '是否有CPA奖励',
      '任务奖励货币',
      '任务奖励区块链',
      '任务奖励金额',
      '是否有任务奖励'
    ]
    const body = originalData.map((item) => {
      return Object.values(item)
    })
    const output = [headers, ...body].map((row) => row.join(',')).join('\r\n')
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + output], { type: 'text/csv' })
    try {
      let downloadLink = document.createElement('a')
      downloadLink.setAttribute('href', URL.createObjectURL(blob))
      downloadLink.download = `活动${id}.csv`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    } catch (error) {
      console.warn(error)
    }
  }

  // 上传数据到数据库
  const onUpload = async () => {
    const ret = await request({
      api: 'api/taskInstance/importProjectTaskFeeInfo',
      method: 'POST',
      params: dataSource.map((d) => ({
        address: d['用户地址'],
        campaignAddress: d['合约地址'],
        projectTaskId: d['活动ID'],
        actionTaskFeeKeyR: d['actionTaskFeeKeyR'] || '',
        actionTaskFeeKeyS: d['actionTaskFeeKeyS'] || '',
        actionTaskFeeKeyV: d['actionTaskFeeKeyV'] || '',
        cpaTaskFeeKeyR: d['cpaTaskFeeKeyR'] || '',
        cpaTaskFeeKeyS: d['cpaTaskFeeKeyS'] || '',
        cpaTaskFeeKeyV: d['cpaTaskFeeKeyV'] || ''
      }))
    })
    console.info(ret)
  }

  // 查询原始数据
  const getOriginalData = async () => {
    const ret = await request({
      api: 'api/taskInstance/exportProjectTaskResult',
      params: {
        projectTaskId: id
      }
    })
    if (ret && ret.result && ret.result.length) {
      setOriginalData(ret.result)
    }
  }

  useEffect(() => {
    getOriginalData()
  }, [])

  return (
    <>
      {originalData ? (
        <Card title="导出原始数据">
          <div className={styles.body}>
            <div className={styles.form}>
              <Button style={{ marginTop: '16px' }} type="primary" onClick={onDownload}>
                导出原始数据
              </Button>
            </div>
          </div>
        </Card>
      ) : null}
      <Card title="登录私钥钱包" style={{ marginTop: '16px' }}>
        <div className={styles.body}>
          <div className={styles.form}>
            <Input addonBefore="私钥" onChange={setPrivateKey} />
            <Button style={{ marginTop: '16px' }} type="primary" onClick={onConnect}>
              登录钱包
            </Button>
          </div>
        </div>
      </Card>
      {wallet ? (
        <Card title="加密" style={{ marginTop: '16px' }}>
          <div className={styles.body}>
            <div className={styles.form}>
              <input type="file" accept=".csv" onChange={uploadCSV} />
              <Button style={{ marginTop: '16px' }} type="primary" onClick={onUpload}>
                传入数据到数据库
              </Button>
            </div>
          </div>
        </Card>
      ) : null}
    </>
  )
}
