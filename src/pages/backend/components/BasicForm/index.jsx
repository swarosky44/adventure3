import { useEffect, useState } from 'react'
import { Form, Input, Upload, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Observer from '@researchgate/react-intersection-observer'
import { request } from '@/utils/request'
import styles from './index.module.less'

const BasicForm = ({ setCurrent = () => {} }) => {
  const [form] = Form.useForm()
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState([])

  // 校验项目名称
  const checkCommutityName = async (_, value = '') => {
    const fvalue = value.trim()
    if (!fvalue) {
      throw new Error('项目名称不能为空')
    }
    if (fvalue.length > 24 || fvalue.length < 4) {
      throw new Error('项目名称长度应在 4 至 24 长度以内')
    }
    return true
  }

  // 校验项目合约地址
  const checkCommutityContract = async (_, value = '') => {
    const fvalue = value.trim()
    if (!fvalue) {
      throw new Error('智能合约地址不能为空')
    }
    if (!/^0x[0-9a-fA-F]{40}$/gi.test(fvalue)) {
      throw new Error('智能合约地址格式不正确')
    }
    return true
  }

  // 提交
  const onSubmit = async (values) => {
    if (!isConnected) {
      openConnectModal()
      return
    }

    if (loading) {
      return
    }

    setLoading(true)
    const params = form.getFieldsValue()

    const result = await request({
      method: 'POST',
      api: 'api/project/saveProject',
      params: {
        ...params,
        chainNetwork: 'Ethereum',
        accountAddress: address
      }
    })
    if (result && `${result.result}` === 'true') {
      message.success('保存成功')
      setCurrent(1)
    } else {
      message.warning('保存失败')
    }
    setLoading(false)
  }

  // 获取广告主数据
  const getBasicInitalData = async () => {
    const ret = await request({
      api: 'api/project/queryProject',
      params: { address }
    })
    if (ret && ret.result && ret.result.name) {
      const {
        chainNetwork = '',
        contractAddress = '',
        desc = '',
        githubAddress = '',
        investmentInstitutions = '',
        logo = '',
        methodId = '',
        name = '',
        officialWebsite = '',
        owner = '',
        tags = '',
        whitePaper = ''
      } = ret.result
      form.setFieldsValue({
        chainNetwork,
        contractAddress,
        desc,
        githubAddress,
        investmentInstitutions,
        logo,
        methodId,
        name,
        officialWebsite,
        owner,
        tags,
        whitePaper
      })
      setFileList([
        {
          name: 'logo.png',
          status: 'done',
          url: logo,
          onlineUrl: logo
        }
      ])
    }
  }

  useEffect(() => {
    if (address) {
      getBasicInitalData()
    }
    if (!isConnected) {
      openConnectModal()
    }
  }, [address])

  return (
    <Observer
      onChange={() => {
        window.dataLayer.push({
          event: 'backend-step1-form-expose',
          address: address || ''
        })
      }}
    >
      <div className={styles.comp}>
        <Form
          name="basic-form"
          className={styles.form}
          layout="vertical"
          form={form}
          onFinish={onSubmit}
        >
          <Form.Item
            name="name"
            label="项目名称"
            required
            rules={[{ validator: checkCommutityName }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item name="logo" label="项目LOGO" required valuePropName="file" hasFeedback>
            <Upload
              name="file"
              accept="image/*"
              action="https://www.adventure3.tk/api/file/upload"
              listType="picture-card"
              fileList={fileList}
              headers={{
                authorization: 'authorization-text'
              }}
              beforeUpload={(file) => {
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isBMP = file.type === 'image/bmp'
                const isGIF = file.type === 'image/gif'
                const isWEBP = file.type === 'image/webp'
                const isPic = isJPG || isPNG || isBMP || isGIF || isWEBP
                if (isPic) {
                  return true
                }
                return false
              }}
              onChange={(info) => {
                const { fileList } = info
                if (info.file.status === 'done') {
                  const { response } = info.file
                  const { result } = response
                  form.setFieldValue('logo', result)
                  setFileList(fileList.map((f) => ({ ...f, onlineUrl: result })))
                  message.success('上传成功')
                } else {
                  setFileList(fileList)
                }
              }}
              onPreview={(file) => {
                window.open(
                  file.onlineUrl.indexOf('https') >= 0
                    ? file.onlineUrl
                    : `https://db35z3hw6fbxp.cloudfront.net/${file.onlineUrl}`
                )
              }}
            >
              {fileList.length < 1 ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传图片</div>
                </div>
              ) : null}
            </Upload>
          </Form.Item>
          <Form.Item
            name="owner"
            label="项目负责人"
            rules={[{ required: true, message: '项目负责人不能为空' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contractAddress"
            label="智能合约地址"
            required
            rules={[{ validator: checkCommutityContract }]}
            hasFeedback
          >
            <Input addonBefore="Ethereum" />
          </Form.Item>
          <Form.Item
            name="officialWebsite"
            label="项目官网"
            rules={[{ required: true, message: '项目官网不能为空' }]}
            hasFeedback
          >
            <Input addonBefore="https://" />
          </Form.Item>
          <Form.Item name="whitePaper" label="项目白皮书">
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="项目标签">
            <Input />
          </Form.Item>
          <Form.Item name="githubAddress" label="github地址">
            <Input />
          </Form.Item>
          <Form.Item name="investmentInstitutions" label="项目投资方">
            <Input />
          </Form.Item>
          <Form.Item name="methodId" label="methodId">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Observer>
  )
}

export default BasicForm
