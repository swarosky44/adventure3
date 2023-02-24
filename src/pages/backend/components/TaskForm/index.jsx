import { useState, useCallback } from 'react'
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  DatePicker,
  Divider,
  Select,
  Table,
  message,
  ConfigProvider,
  Space,
  Spin
} from 'antd'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons'
import { ethers } from 'ethers'
import { useAccount, useSigner, useNetwork, useSwitchNetwork } from 'wagmi'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import { request, getCurrentGasPrice } from '@/utils/request'
import QuillEditor from '../quillEditor'
import TaskItemDrawer from '../TaskItemDrawer'
import {
  TASK_TYPE,
  ENV,
  AD3HUB_ADDRESS,
  USDT_TOKEN_ADDRESS,
  USDC_TOKEN_ADDRESS
} from '@/utils/const'
import Ad3HubAbi from '@/utils/Ad3Hub.json'
import styles from './index.module.less'

const TaskForm = ({ setCurrent = () => {}, setTaskResult = () => {} }) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [recordItem, setRecordItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const launchTime = Form.useWatch('launchTime', form)

  // 校验标题
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

  // 校验描述
  const checkDesc = async (_, value) => {
    if (value.isEmpty()) {
      throw new Error('任务描述不能为空')
    }
    return true
  }

  // 校验额度
  const checkShareLimit = async (_, value = 0) => {
    if (value <= 0) {
      throw new Error('奖励人数应该大于 0')
    }
    return true
  }

  // 校验预算
  const checkBudget = async (_, value = 0) => {
    if (value <= 0) {
      throw new Error('奖励预算应该大于 0')
    }
    return true
  }

  // 校验单价
  const checkCpaUnitPrice = async (_, value = 0) => {
    if (value <= 0) {
      throw new Error('Cpa 奖励单价应该大于 0')
    }
    return true
  }

  // 申请货币额度
  const tokenApprove = async ({ cpaToken, cpaBonusBudget, taskToken, taskBonusBudget }) => {
    const feeData = await getCurrentGasPrice()
    const gasParams = {
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    }
    const approveCpaToken = () => {
      return new Promise((resolve) => {
        cpaToken.approve(
          AD3HUB_ADDRESS,
          cpaBonusBudget.toNumber() + taskBonusBudget.toNumber(),
          gasParams
        )
        cpaToken.once('Approval', () => {
          resolve({ success: true, type: 'cpaToken' })
        })
      })
    }
    const approveTaskToken = () => {
      return new Promise((resolve) => {
        taskToken.approve(
          AD3HUB_ADDRESS,
          cpaBonusBudget.toNumber() + taskBonusBudget.toNumber(),
          gasParams
        )
        taskToken.once('Approval', () => {
          resolve({ success: true, type: 'taskToken' })
        })
      })
    }
    await approveCpaToken()
    await approveTaskToken()
    return Promise.resolve({})
  }

  // 创建活动合约实例
  const createCampaign = async ({
    contract,
    cpaBonusBudget,
    taskBonusBudget,
    cpaPaymentToken,
    taskPaymentToken
  }) => {
    const feeData = await getCurrentGasPrice()
    await contract.createCampaign(
      cpaBonusBudget,
      taskBonusBudget,
      cpaPaymentToken,
      taskPaymentToken,
      { maxFeePerGas: feeData.maxFeePerGas, maxPriorityFeePerGas: feeData.maxPriorityFeePerGas }
    )
    return new Promise((resolve) => {
      contract.once('CreateCampaign', () => {
        resolve({ success: true })
      })
    })
  }

  // 获取活动合约的地址
  const getCampaignAddress = async ({ contract }) => {
    const signerAddress = await signer.getAddress()
    const campaignList = await contract.getCampaignAddressList(signerAddress)
    const campaignAddress = await contract.getCampaignAddress(signerAddress, campaignList.length)
    return campaignAddress
  }

  // 创建链上合约
  const onCreate = async (values) => {
    try {
      // 链上对象 & 参数
      const cpaTokenAddress =
        values.cpaTaskReward.rewardName === 'usdt' ? USDT_TOKEN_ADDRESS : USDC_TOKEN_ADDRESS
      const taskTokenAddress =
        values.actionTaskReward.rewardName === 'usdt' ? USDT_TOKEN_ADDRESS : USDC_TOKEN_ADDRESS
      const contract = new ethers.Contract(AD3HUB_ADDRESS, Ad3HubAbi, signer)
      const cpaToken = new ethers.Contract(
        cpaTokenAddress,
        [
          'function approve(address spender, uint256 amount) external returns (bool)',
          'event Approval(address indexed owner, address indexed spender, uint256 value)'
        ],
        signer
      )
      const taskToken = new ethers.Contract(
        taskTokenAddress,
        [
          'function approve(address spender, uint256 amount) external returns (bool)',
          'event Approval(address indexed owner, address indexed spender, uint256 value)'
        ],
        signer
      )

      const ratio = await contract.getRatio()
      const cpaBonusBudget = ethers.utils.parseUnits(
        (values.cpaTaskRewardBudget * (1 + ratio.toNumber() / 100)).toString(),
        6
      )
      const taskBonusBudget = ethers.utils.parseUnits(
        (values.actionTaskRewardBudget * (1 + ratio.toNumber() / 100)).toString(),
        6
      )

      // 开始链上通信
      await tokenApprove({
        contract,
        cpaToken,
        cpaBonusBudget,
        taskToken,
        taskBonusBudget
      })
      await createCampaign({
        contract,
        cpaBonusBudget,
        taskBonusBudget,
        cpaPaymentToken: cpaTokenAddress,
        taskPaymentToken: taskTokenAddress
      })
      const address = await getCampaignAddress({ contract })
      return address
    } catch (error) {
      console.warn(error)
      return ''
    }
  }

  const onPayOnChain = useCallback(
    async (values) => {
      if (signer && !loading) {
        setLoading(true)

        if (ENV === 'test' && chain.id === 80001) {
          const result = await onCreate({
            actionTaskReward: {
              rewardName: 'usdt',
              chainNetwork: 'polygon'
            },
            actionTaskRewardBudget: 10,
            cpaTaskReward: {
              rewardName: 'usdt',
              chainNetwork: 'polygon'
            },
            cpaTaskRewardBudget: 10
          })
          onSubmit(values, result)
        } else if (ENV === 'daily' && chain.id === 1337) {
          const result = await onCreate({
            actionTaskReward: {
              rewardName: 'usdt',
              chainNetwork: 'polygon'
            },
            actionTaskRewardBudget: 10,
            cpaTaskReward: {
              rewardName: 'usdt',
              chainNetwork: 'polygon'
            },
            cpaTaskRewardBudget: 10
          })
          onSubmit(values, result)
        } else {
          switchNetwork(137)
        }
      }
    },
    [signer, loading, chain]
  )

  // 提交表单
  const onSubmit = async (values, campaignAddress) => {
    const params = {
      accountAddress: address,
      campaignAddress: campaignAddress,
      title: values.title,
      desc: values.desc.toHTML(),
      activityImg: values.activityImg,
      launchStartTime: values.launchTime[0].format(),
      launchEndTime: values.launchTime[1].format(),
      isActionTask: true,
      actionTaskRewardUnit: values.actionTaskReward.rewardName,
      actionTaskRewardChainNetwork: values.actionTaskReward.chainNetwork,
      actionTaskRewardNum: values.actionTaskRewardBudget / values.actionTaskRewardNum,
      actionTaskRewardBudget: values.actionTaskRewardBudget,
      actionTaskDrawTime: values.actionTaskDrawTime.format(),
      actionTaskDTOS: taskList,
      isCpaTask: true,
      cpaTaskRewardUnit: values.cpaTaskReward.rewardName,
      cpaTaskRewardChainNetwork: values.cpaTaskReward.chainNetwork,
      cpaTaskRewardBudget: values.cpaTaskRewardBudget,
      cpaTaskBiddingType: values.cpaTaskBiddingType,
      cpaTaskPerPrice: values.cpaTaskPerPrice,
      productizationLink: ''
    }
    const ret = await request({
      method: 'POST',
      api: 'api/projectTask/saveProjectTask',
      params
    })
    if (ret && ret.result) {
      setCurrent(2)
      setTaskResult(ret)
      setLoading(false)
    }
  }

  return (
    <div className={styles.comp}>
      <ConfigProvider locale={zhCN}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          name="task-form"
          form={form}
          className={styles.form}
          layout="vertical"
          scrollToFirstError={true}
          validateTrigger="onChange"
          onFinish={onPayOnChain}
        >
          <Form.Item
            name="title"
            label="任务标题"
            required
            hasFeedback
            rules={[{ validator: checkTitle }]}
          >
            <Input style={{ width: '800px' }} />
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
          <Form.Item
            name="activityImg"
            label="任务封面图片"
            valuePropName="file"
            required
            hasFeedback
          >
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
                  form.setFieldValue('activityImg', result)
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
          <Form.Item
            name="launchTime"
            label="任务时间"
            rules={[{ required: true, message: '任务开始/结束时间不能为空' }]}
            hasFeedback
          >
            <DatePicker.RangePicker
              showTime
              style={{ width: '800px' }}
              disabledDate={(current) => {
                return current && current < dayjs().endOf('day')
              }}
            />
          </Form.Item>

          <div>
            <Divider>行为任务配置</Divider>
            <Form.Item name="actionTaskReward" label="奖励币种" required>
              <Input.Group compact>
                <Form.Item
                  name={['actionTaskReward', 'chainNetwork']}
                  noStyle
                  required={[{ required: true, message: '链上环境不能为空' }]}
                >
                  <Select style={{ width: 140 }}>
                    <Select.Option key="Polygon" value="137">
                      Polygon
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={['actionTaskReward', 'rewardName']}
                  noStyle
                  required={[{ required: true, message: '奖励币种不能为空' }]}
                >
                  <Select style={{ width: 220 }}>
                    <Select.Option key="usdt" value="usdt">
                      USDT
                    </Select.Option>
                    <Select.Option key="usdc" value="usdc">
                      USDC
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Input.Group>
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
              tooltip="* 开奖时间不能早于任务结束时间"
              hasFeedback
            >
              <DatePicker
                showTime
                style={{ width: '100%' }}
                disabled={!(launchTime && launchTime[1])}
                disabledDate={(current) => {
                  return current < launchTime[1].endOf('day')
                }}
              />
            </Form.Item>
          </div>

          <div>
            <Divider>CPA 任务配置</Divider>
            <Form.Item name="cpaTaskReward" label="奖励币种" required hasFeedback>
              <Input.Group compact>
                <Form.Item
                  name={['cpaTaskReward', 'chainNetwork']}
                  noStyle
                  required={[{ required: true, message: '链上环境不能为空' }]}
                >
                  <Select style={{ width: 140 }}>
                    <Select.Option key="Polygon" value="137">
                      Polygon
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={['cpaTaskReward', 'rewardName']}
                  noStyle
                  required={[{ required: true, message: '奖励币种不能为空' }]}
                >
                  <Select style={{ width: 220 }}>
                    <Select.Option key="usdt" value="usdt">
                      USDT
                    </Select.Option>
                    <Select.Option key="usdc" value="usdc">
                      USDC
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Input.Group>
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
                <Select.Option key="LP_UV" value="LP_UV">
                  按落地页访问 UV
                </Select.Option>
                <Select.Option key="CONVERSION" value="CONVERSION">
                  按点击转化 UV
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
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
            rowKey="name"
            scroll={{ x: 800 }}
            columns={[
              {
                title: '任务名称',
                key: 'name',
                dataIndex: 'name',
                fixed: 'left',
                width: 100
              },
              {
                title: '任务类型',
                key: 'taskType',
                width: 100,
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
                },
                width: 100
              },
              {
                title: '任务图标',
                key: 'iconUrl',
                width: 100,
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
                width: 100,
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
                            const index = f.findIndex((r) => r.name === record.name)
                            f.splice(index, 1)
                            return f
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
          <Form.Item style={{ marginTop: '16px' }}>
            <Button style={{ marginRight: '16px' }} onClick={() => setCurrent((v) => 0)}>
              返回上一步
            </Button>
            <Button type="primary" htmlType="submit">
              保存并提交（需要完成链上支付）
            </Button>
          </Form.Item>
          <TaskItemDrawer
            open={drawerVisible}
            recordItem={recordItem}
            setTaskList={setTaskList}
            close={() => {
              setDrawerVisible(false)
              setRecordItem(null)
            }}
          />
        </Form>
      </ConfigProvider>
      {loading ? (
        <div className={styles.loadingPage}>
          <Spin size="large" />
          <p>请耐心等待链上支付完成，及时查看钱包需要签名的步骤哟</p>
        </div>
      ) : null}
    </div>
  )
}

export default TaskForm
