import {
  Form,
  Input,
  Upload,
  Button,
  DatePicker,
  Switch,
  Divider,
  Select,
  Space,
  message
} from 'antd'
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import QuillEditor from '../quillEditor'
import './style.less'

const TaskForm = () => {
  const [form] = Form.useForm()
  const enableShare = Form.useWatch('enableShare', form)
  const enableCpa = Form.useWatch('enableCpa', form)

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
        <Form.Item name="title" label="任务标题" rules={[{ required: true }]}>
          <Input style={{ width: '600px' }} />
        </Form.Item>
        <Form.Item name="desc" label="任务描述" rules={[{ required: true }]}>
          <QuillEditor />
        </Form.Item>
        <Form.Item
          name="themeImage"
          label="任务封面图片"
          valuePropName="file"
          rules={[{ required: true }]}
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
        <Form.Item name="startTime" label="开始时间" rules={[{ required: true }]}>
          <DatePicker showTime style={{ width: '600px' }} />
        </Form.Item>
        <Form.Item name="endTime" label="结束时间" rules={[{ required: true }]}>
          <DatePicker showTime style={{ width: '600px' }} />
        </Form.Item>
        <Form.Item name="enableShare" label="是否开启行为奖励" valuePropName="checked">
          <Switch />
        </Form.Item>
        {enableShare ? (
          <div>
            <Divider>行为任务配置</Divider>
            <Form.Item name="shareToken" label="奖励币种" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="shareLimit" label="奖励人数" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="shareLimit" label="奖励预算" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="shareLimit" label="开奖时间" rules={[{ required: true }]}>
              <DatePicker showTime style={{ width: '100%' }} />
              <div className="tip">
                *开奖时间不能早于【任务投放开始时间】且不能晚于【任务投放结束时间】
              </div>
            </Form.Item>
          </div>
        ) : null}
        <Form.Item name="enableCpa" label="是否开启CPA奖励" valuePropName="checked">
          <Switch />
        </Form.Item>
        {enableCpa ? (
          <div>
            <Divider>CPA 任务配置</Divider>
            <Form.Item name="cpaToken" label="奖励币种" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="cpaBudget" label="奖励预算" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="cpaUnitPrice" label="奖励单价" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="cpaType" label="出价方式" rules={[{ required: true }]}>
              <Select>
                <Select.Option key="uv" value="uv">
                  按落地页访问 UV
                </Select.Option>
                <Select.Option key="clk" value="clk">
                  按点击转化 UV
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
        ) : null}
        <Divider>任务项配置</Divider>
        <Form.List name="tasks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'type']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing first name'
                      }
                    ]}
                  >
                    <Select style={{ width: 240 }} placeholder="任务类型">
                      <Select.Option key="twitterFocus" value="twitterFocus">
                        关注推特
                      </Select.Option>
                      <Select.Option key="twitterTween" value="twitterTween">
                        转发推特
                      </Select.Option>
                      <Select.Option key="joinDiscord" value="joinDiscrod">
                        加入 Discrod
                      </Select.Option>
                      <Select.Option key="joinTelegram" value="joinTelegram">
                        加入 Telegram
                      </Select.Option>
                      <Select.Option key="custom" value="custom">
                        自定义任务
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'url']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing last name'
                      }
                    ]}
                  >
                    <Input style={{ width: 240 }} placeholder="任务链接" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  style={{ width: '600px' }}
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加任务项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button style={{ marginRight: '16px' }}>返回上一步</Button>
          <Button type="primary">保存并提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default TaskForm
