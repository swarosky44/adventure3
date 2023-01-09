import { useState, useEffect } from 'react'
import { Drawer, Form, Select, Input, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { TASK_TYPE } from '@/utils/const'

const TaskItemDrawer = ({
  open = false,
  recordItem = null,
  setTaskList = () => {},
  close = () => {}
}) => {
  const [form] = Form.useForm()
  const [previewLogo, setPreviewLogo] = useState('')

  const onSubmit = (values) => {
    if (recordItem) {
      setTaskList((v) => {
        const f = [...v]
        const index = f.findIndex((r) => r.index === recordItem.index)
        f.splice(index, 1, values)
        return f
      })
    } else {
      setTaskList((v) => [...v, values].map((item, index) => ({ ...item, index })))
    }
    close()
  }

  useEffect(() => {
    console.info(recordItem)
    if (recordItem) {
      form.setFieldsValue(recordItem)
      setPreviewLogo(recordItem.iconUrl)
    }
  }, [recordItem])

  return (
    <Drawer title="任务项配置" open={open} onClose={close} destroyOnClose>
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
          name="actionObject"
          label="任务链接"
          required
          hasFeedback
          rules={[{ type: 'url', message: '请输入正确的任务链接' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="iconUrl" label="任务图标" valuePropName="file" required hasFeedback>
          <Upload
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
                setPreviewLogo(`https://db35z3hw6fbxp.cloudfront.net/${result}`)
                message.success('上传成功')
              }
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {previewLogo ? (
                <img
                  style={{ width: 120, height: 120, marginBottom: 12 }}
                  src={
                    previewLogo.indexOf('http') >= 0
                      ? previewLogo
                      : `https://db35z3hw6fbxp.cloudfront.net/${previewLogo}`
                  }
                />
              ) : null}
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </div>
          </Upload>
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
