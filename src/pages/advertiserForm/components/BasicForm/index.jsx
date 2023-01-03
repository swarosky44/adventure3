import { Form, Input, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './style.less'

const BasicForm = () => {
  const [form] = Form.useForm()

  return (
    <div className="comp">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        name="basic-form"
        form={form}
        className="form"
        layout="vertical"
      >
        <Form.Item name="commutityName" label="项目名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="commotityLogo"
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
        <Form.Item name="commutityOwner" label="项目负责人" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="commotityContract" label="智能合约地址" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="commotityHome" label="项目官网" rules={[{ required: true }]}>
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
        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
          <Button type="primary">保存</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BasicForm
