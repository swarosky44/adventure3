import { useEffect } from 'react'
import { Drawer, Form, Select, Input, Button, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { TASK_TYPE } from '@/utils/const'

const TaskItemDrawer = ({
  open = false,
  recordItem = null,
  setTaskList = () => {},
  close = () => {}
}) => {
  const [form] = Form.useForm()

  const onClose = () => {
    form.resetFields()
    close()
  }

  const onSubmit = (values) => {
    if (recordItem) {
      setTaskList((v) => {
        const f = [...v]
        const index = f.findIndex((r) => r.name === recordItem.name)
        f.splice(index, 1, values)
        return f
      })
    } else {
      setTaskList((v) => [...v, values])
    }
    onClose()
  }

  useEffect(() => {
    if (recordItem) {
      form.setFieldsValue(recordItem)
    }
  }, [recordItem])

  return (
    <Drawer title="任务项配置" open={open} onClose={onClose} destroyOnClose>
      <Form name="task-item-form" form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="taskType"
          label="任务类型"
          rules={[{ required: true, message: '任务类型不能为空' }]}
          hasFeedback
        >
          <Select placeholder="任务类型">
            {TASK_TYPE.map((t) => (
              <Select.Option key={t.key} value={t.key}>
                {t.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="任务名称"
          rules={[{ required: true, message: '任务名称' }]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="actionObject"
          label="任务链接"
          required
          hasFeedback
          rules={[{ type: 'url', message: '请输入正确的任务链接' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="iconUrl" label="任务图标" valuePropName="file" required hasFeedback>
          <Upload.Dragger
            name="file"
            accept="image/*"
            action="https://www.adventure3.tk/api/file/upload"
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
              if (info.file.status === 'done') {
                const { response } = info.file
                const { result } = response
                form.setFieldValue('iconUrl', result)
                message.success('上传成功')
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或者拖拽图片到此处进行上传</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default TaskItemDrawer
