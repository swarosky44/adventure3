import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, Input, Button } from 'antd'
import { ethers } from 'ethers'
import csv from 'csvtojson'
import { ALCHEMY_POLYGON_AD3_KEY, ALCHEMY_MUMBAI_AD3_KEY, ENV } from '@/utils/const'
import { request } from '@/utils/request'
import styles from './index.module.less'

let privateKey = ''
export default () => {
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
    const provider = new ethers.providers.JsonRpcProvider(
      ENV === 'test' ? ALCHEMY_MUMBAI_AD3_KEY : ALCHEMY_POLYGON_AD3_KEY
    )
    const wallet = new ethers.Wallet(privateKey, provider)
    setWallet(wallet)
  }

  // 加密 csv 数据
  const encryptoDataFormat = async (data) => {
    // 创建消息
    const messageHash = ethers.utils.solidityKeccak256(
      ['address', 'string', 'address', 'uint256'],
      [data[0], data[1], data[2], ethers.utils.parseUnits(data[3].toString(), 6).toNumber()]
    )
    // 签名
    const messageHashBytes = ethers.utils.arrayify(messageHash)
    const signature = await wallet.signMessage(messageHashBytes)
    return { ...ethers.utils.splitSignature(signature), signature }
  }

  // 上传 csv 文件
  const uploadCSV = (e) => {
    const el = e.target
    const reader = new FileReader()
    reader.addEventListener('loadend', async () => {
      const csvStr = reader.result.toString()
      const csvData = await csv({}).fromString(csvStr)
      const cpaPromiseArr = csvData
        .filter((d) => Number(d['CPA奖励金额']) > 0)
        .map((row) => {
          const d = [row['合约地址'], 'CPA', row['用户地址'], Number(row['CPA奖励金额'])]
          return encryptoDataFormat(d).then((ret) => ({
            ...row,
            cpaTaskFeeKeyR: ret.r,
            cpaTaskFeeKeyS: ret.s,
            cpaTaskFeeKeyV: ret.v,
            cpaSignature: ret.signature
          }))
        })

      const taskPromiseArr = csvData
        .filter((d) => Number(d['任务奖励金额']) > 0)
        .map((row) => {
          const d = [row['合约地址'], 'TASK', row['用户地址'], Number(row['任务奖励金额'])]
          return encryptoDataFormat(d).then((ret) => ({
            ...row,
            actionTaskFeeKeyR: ret.r,
            actionTaskFeeKeyS: ret.s,
            actionTaskFeeKeyV: ret.v,
            actionSignature: ret.signature
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
      setDataSource(formatCryptoData)
    })
    reader.readAsText(el.files[0])
  }

  // 导出原始数据
  const onDownload = async () => {
    // 强制结算活动（幂等结算）
    await request({
      api: 'api/taskInstance/calResult',
      params: {
        projectTaskId: id
      }
    })
    // 获取导出数据
    const ret = await request({
      api: 'api/taskInstance/exportProjectTaskResult',
      params: {
        projectTaskId: id
      }
    })
    if (ret && ret.result && ret.result.length) {
      const originalData = ret.result
      const headers = [
        '用户地址',
        '活动ID',
        'CPA奖励货币',
        'CPA奖励区块链',
        'CPA奖励金额',
        '是否有CPA奖励',
        '任务奖励货币',
        '任务奖励区块链',
        '任务奖励金额',
        '是否有任务奖励',
        '合约地址'
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
  }

  // 上传数据到数据库
  const onUpload = async () => {
    await request({
      api: 'api/taskInstance/importProjectTaskFeeInfo',
      method: 'POST',
      params: {
        list: dataSource.map((d) => ({
          address: d['用户地址'],
          campaignAddress: d['合约地址'],
          projectTaskId: d['活动ID'],
          actionTaskFeeKeyR: d['actionTaskFeeKeyR'] || '',
          actionTaskFeeKeyS: d['actionTaskFeeKeyS'] || '',
          actionTaskFeeKeyV: d['actionTaskFeeKeyV'] || 0,
          cpaTaskFeeKeyR: d['cpaTaskFeeKeyR'] || '',
          cpaTaskFeeKeyS: d['cpaTaskFeeKeyS'] || '',
          cpaTaskFeeKeyV: d['cpaTaskFeeKeyV'] || 0
        }))
      }
    })
  }

  return (
    <>
      <Card title="导出原始数据">
        <div className={styles.body}>
          <div className={styles.form}>
            <Button style={{ marginTop: '16px' }} type="primary" onClick={onDownload}>
              导出原始数据
            </Button>
          </div>
        </div>
      </Card>
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
