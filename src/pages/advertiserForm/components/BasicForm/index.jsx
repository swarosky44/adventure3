import { Form, Input, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { ethers } from 'ethers'
import './style.less'

const BasicForm = ({ setCurrent = () => {} }) => {
  const [form] = Form.useForm()

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
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://mainnet.infura.io/v3/f48a6453561a4dc18999972babc7d540'
      )
      const code = await provider.getCode(value, 'latest')
      if (code === '0x') {
        throw new Error('请填写已部署的以太坊主链的智能合约地址')
      }
      return true
    } catch (error) {
      throw new Error('请填写已部署的以太坊主链的智能合约地址')
    }
  }

  // 提交
  const onSubmit = (values) => {
    setCurrent((v) => 1)
  }

  // 提交失败
  const onFailed = (errors) => {
    setCurrent((v) => 1)
  }

  return (
    <div className="comp">
      <Form
        name="basic-form"
        className="form"
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        onFinishFailed={onFailed}
      >
        <Form.Item
          name="commutityName"
          label="项目名称"
          rules={[
            { required: true, message: '项目名称不能为空' },
            { validator: checkCommutityName }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="commutityLogo"
          label="项目LOGO"
          rules={[{ required: true }]}
          valuePropName="file"
        >
          <Upload
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            headers={{
              authorization: 'authorization-text'
            }}
            onChange={(info) => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
              }
            }}
          >
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="commutityOwner"
          label="项目负责人"
          rules={[{ required: true, message: '项目负责人不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="commutityContract"
          label="智能合约地址"
          rules={[
            { required: true, message: '合约地址不能为空' },
            { validator: checkCommutityContract }
          ]}
          hasFeedback
        >
          <Input addonBefore="Ethereum" />
        </Form.Item>
        <Form.Item
          name="commotityHome"
          label="项目官网"
          rules={[
            { required: true, message: '项目官网不能为空' },
            { type: 'url', message: '请填写正确的项目官网链接' }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item name="commotityPaper" label="项目白皮书">
          <Input />
        </Form.Item>
        <Form.Item name="commotityTags" label="项目标签">
          <Input />
        </Form.Item>
        <Form.Item name="commotityGithub" label="github地址">
          <Input />
        </Form.Item>
        <Form.Item name="commotityInvestor" label="项目投资方">
          <Input />
        </Form.Item>
        <Form.Item name="methodId" label="methodID">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BasicForm
