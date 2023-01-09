import { useState } from 'react'
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  DatePicker,
  Switch,
  Divider,
  Select,
  Table,
  message,
  ConfigProvider,
  Space
} from 'antd'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
// import { useAccount } from 'wagmi'
import zhCN from 'antd/locale/zh_CN'
// import { request } from '@/utils/request'
import QuillEditor from '../quillEditor'
import MultiSelectItem from '../multiSelectItem'
import MultiInputItem from '../MultiInputItem'
import TaskItemDrawer from '../TaskItemDrawer'
import { TASK_TYPE } from '@/utils/const'
import './style.less'

const TaskForm = ({ setCurrent = () => {} }) => {
  const [previewLogo, setPreviewLogo] = useState('')
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [taskList, setTaskList] = useState([
    {
      index: 0,
      actionObject: 'https://1688.com',
      iconUrl: '240c9d4859ea47b7b7ee11785fb20e94.jpeg',
      taskType: 'FOLLOW_TWITTER'
    },
    {
      index: 1,
      actionObject: 'https://1688111.com',
      iconUrl: '240c9d4859ea47b7b7ee11785fb20e94.jpeg',
      taskType: 'FOLLOW_TWITTER'
    }
  ])
  const [recordItem, setRecordItem] = useState(null)
  const [form] = Form.useForm()
  const isActionTask = Form.useWatch('isActionTask', form)
  const isCpaTask = Form.useWatch('isCpaTask', form)
  // const { account } = useAccount()

  const checkTitle = async (_, value) => {
    const fvalue = value.trim()
    if (!fvalue) {
      throw new Error('任务标题不能为空')
    }
    if (fvalue.length > 24 || fvalue.length < 4) {
      throw new Error('任务标题长度应在 4 至 24 长度以内')
    }
    return true
  }

  const checkDesc = async (_, value) => {
    if (value.isEmpty()) {
      throw new Error('任务描述不能为空')
    }
    return true
  }

  const checkShareLimit = async (_, value = 0) => {
    if (value <= 0) {
      throw new Error('奖励人数应该大于 0')
    }
    return true
  }

  const checkBudget = async (_, value = 0) => {
    if (value <= 0) {
      throw new Error('奖励预算应该大于 0')
    }
    return true
  }

  const checkCpaUnitPrice = async (_, value = 0) => {
    if (value <= 0) {
      throw new Error('Cpa 奖励单价应该大于 0')
    }
    return true
  }

  const onSubmit = async (values) => {
    console.info(values)
    // const params = {
    //   accountAddress: account,
    //   title: 'test title',
    //   desc: 'desc',
    //   activityImg: 'activityImg',
    //   launchStartTime: 'launchStartTime',
    //   launchEndTime: 'launchEndTime',
    //   isActionTask: true,
    //   actionTaskRewardUnit: 'actionTaskRewardUnit',
    //   actionTaskRewardChainNetwork: 'polygon',
    //   actionTaskRewardNum: 1,
    //   actionTaskRewardBudget: 1,
    //   actionTaskDrawTime: 'actionTaskDrawTime',
    //   actionTaskDTOS: [
    //     {
    //       iconUrl: 'iconUrl',
    //       taskType: 'FOLLOW_TWITTER',
    //       actionObject: 'actionObject'
    //     },
    //     {
    //       iconUrl: 'iconUrl',
    //       taskType: 'RETWEET',
    //       actionObject: 'actionObject2'
    //     }
    //   ],
    //   isCpaTask: true,
    //   cpaTaskRewardUnit: 'cpaTaskRewardUnit',
    //   cpaTaskRewardChainNetwork: 'polygon',
    //   cpaTaskRewardBudget: 1,
    //   cpaTaskBiddingType: 'LP_UV',
    //   cpaTaskPerPrice: 1,
    //   productizationLink: 'productizationLink'
    // }
  }

  return (
    <div className="comp">
      <ConfigProvider locale={zhCN}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          name="task-form"
          form={form}
          className="form"
          layout="vertical"
          scrollToFirstError={true}
          onFinish={onSubmit}
        >
          <Form.Item
            name="title"
            label="任务标题"
            required
            hasFeedback
            rules={[{ validator: checkTitle }]}
          >
            <Input style={{ width: '600px' }} />
          </Form.Item>
          <Form.Item
            name="desc"
            label="任务描述"
            required
            hasFeedback
            rules={[{ validator: checkDesc }]}
          >
            <QuillEditor />
          </Form.Item>
          {/* TODO */}
          <Form.Item
            name="activityImg"
            label="任务封面图片"
            valuePropName="file"
            required
            hasFeedback
          >
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
                  form.setFieldValue('activityImg', result)
                  setPreviewLogo(`https://db35z3hw6fbxp.cloudfront.net/${result}`)
                  message.success('上传成功')
                }
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {previewLogo ? (
                  <img style={{ width: 120, height: 120, marginBottom: 12 }} src={previewLogo} />
                ) : null}
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name="launchTime"
            label="任务时间"
            rules={[{ required: true, message: '任务开始/结束时间不能为空' }]}
            hasFeedback
          >
            <DatePicker.RangePicker showTime style={{ width: '600px' }} />
          </Form.Item>
          <Form.Item name="isActionTask" label="是否开启行为奖励" valuePropName="checked">
            <Switch />
          </Form.Item>
          {isActionTask ? (
            <div>
              <Divider>行为任务配置</Divider>
              <Form.Item
                name="actionTaskReward"
                label="奖励币种"
                rules={[{ required: true, message: '行为奖励币种不能为空' }]}
                hasFeedback
              >
                <MultiInputItem />
              </Form.Item>
              <Form.Item
                name="actionTaskRewardNum"
                label="奖励人数"
                required
                rules={[{ validator: checkShareLimit }]}
                hasFeedback
              >
                <InputNumber style={{ width: '360px' }} />
              </Form.Item>
              <Form.Item
                name="actionTaskRewardBudget"
                label="奖励预算"
                required
                rules={[{ validator: checkBudget }]}
                hasFeedback
              >
                <InputNumber style={{ width: '360px' }} />
              </Form.Item>
              <Form.Item
                name="actionTaskDrawTime"
                label="开奖时间"
                rules={[{ required: true, message: '开奖时间不能为空' }]}
                hasFeedback
              >
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </div>
          ) : null}
          <Form.Item name="isCpaTask" label="是否开启CPA奖励" valuePropName="checked">
            <Switch />
          </Form.Item>
          {isCpaTask ? (
            <div>
              <Divider>CPA 任务配置</Divider>
              <Form.Item
                name="cpaTaskReward"
                label="奖励币种"
                rules={[{ required: true, message: 'CPA 奖励币种不能为空' }]}
                hasFeedback
              >
                <MultiSelectItem />
              </Form.Item>
              <Form.Item
                name="cpaTaskRewardBudget"
                label="奖励预算"
                required
                rules={[{ validator: checkBudget }]}
                hasFeedback
              >
                <InputNumber style={{ width: 360 }} />
              </Form.Item>
              <Form.Item
                name="cpaTaskPerPrice"
                label="奖励单价"
                required
                rules={[{ validator: checkCpaUnitPrice }]}
                hasFeedback
              >
                <InputNumber style={{ width: 360 }} />
              </Form.Item>
              <Form.Item
                name="cpaTaskBiddingType"
                label="出价方式"
                rules={[{ required: true, message: 'CPA 奖励出价方式不能为空' }]}
                hasFeedback
              >
                <Select style={{ width: 360 }}>
                  <Select.Option key="LP_EXP_UV" value="LP_EXP_UV">
                    按落地页访问 UV
                  </Select.Option>
                  <Select.Option key="LP_CLK_UV" value="LP_CLK_UV">
                    按点击转化 UV
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
          ) : null}
          <Divider>任务项配置</Divider>
          <Button
            type="primary"
            style={{ marginBottom: 12 }}
            onClick={() => setDrawerVisible(true)}
          >
            <PlusOutlined />
            新增任务
          </Button>
          <Table
            rowKey="index"
            columns={[
              {
                title: '任务类型',
                key: 'taskType',
                render: (_, record) => {
                  const item = TASK_TYPE.find((t) => t.key === record.taskType)
                  if (item) {
                    return item.name
                  }
                  return '-'
                }
              },
              {
                title: '任务链接',
                key: 'actionObject',
                render: (_, record) => {
                  return (
                    <a target="_blank" href={record.actionObject}>
                      {record.actionObject}
                    </a>
                  )
                }
              },
              {
                title: '任务图标',
                key: 'iconUrl',
                render: (_, record) => {
                  return (
                    <img
                      style={{ width: 'atuo', height: 32 }}
                      src={`https://db35z3hw6fbxp.cloudfront.net/${record.iconUrl}`}
                    />
                  )
                }
              },
              {
                title: '操作',
                key: 'operation',
                render: (_, record) => {
                  return (
                    <Space>
                      <a
                        onClick={() => {
                          setRecordItem(record)
                          setDrawerVisible(true)
                        }}
                      >
                        编辑
                      </a>
                      <a
                        onClick={() => {
                          setTaskList((v) => {
                            const f = [...v]
                            const index = f.findIndex((r) => r.index === record.index)
                            f.splice(index, 1)
                            return f.map((r, index) => ({ ...r, index }))
                          })
                        }}
                      >
                        删除
                      </a>
                    </Space>
                  )
                }
              }
            ]}
            dataSource={taskList}
          />
          <Form.Item>
            <Button style={{ marginRight: '16px' }} onClick={() => setCurrent((v) => 0)}>
              返回上一步
            </Button>
            <Button type="primary" htmlType="submit">
              保存并提交
            </Button>
          </Form.Item>
          <TaskItemDrawer
            open={drawerVisible}
            recordItem={recordItem}
            setTaskList={setTaskList}
            close={() => setDrawerVisible(false)}
          />
        </Form>
      </ConfigProvider>
    </div>
  )
}

export default TaskForm
