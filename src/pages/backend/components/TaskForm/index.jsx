import { useState, useCallback, useEffect } from 'react'
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
  Spin,
  Tooltip,
  notification
} from 'antd'
import { InboxOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { ethers } from 'ethers'
import { useAccount, useSigner, useNetwork, useSwitchNetwork } from 'wagmi'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import { request, getCurrentGasPrice } from '@/utils/request'
import QuillEditor from '../quillEditor'
import TaskItemDrawer from '../TaskItemDrawer'
import { TASK_TYPE, ENV, AD3HUB_ADDRESS, USDT_TOKEN_ADDRESS } from '@/utils/const'
import Ad3HubAbi from '@/utils/Ad3Hub.json'
import styles from './index.module.less'

let tempTaskList = []
const TaskForm = ({ setCurrent = () => {}, setTaskResult = () => {} }) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [recordItem, setRecordItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [form] = Form.useForm()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const launchTime = Form.useWatch('launchTime', form)
  const cpaTaskRewardBudget = Form.useWatch('cpaTaskRewardBudget', form)

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
    if (value.toHTML().length > 8000) {
      throw new Error('任务描述的字数不应超过 8000 个')
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
    if (value > cpaTaskRewardBudget) {
      throw new Error('Cpa 奖励单价应该小于 Cpa 奖励预算')
    }
    return true
  }

  // 提交表单 - 创建活动
  const onSubmit = async (values) => {
    setLoadingText('正在创建活动，请耐心等待')

    const params = {
      accountAddress: address,
      campaignAddress: '',
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
      actionTaskDTOS: tempTaskList,
      isCpaTask: true,
      cpaTaskRewardUnit: values.actionTaskReward.rewardName,
      cpaTaskRewardChainNetwork: values.actionTaskReward.chainNetwork,
      cpaTaskRewardBudget: values.cpaTaskRewardBudget,
      cpaTaskBiddingType: values.cpaTaskBiddingType,
      cpaTaskPerPrice: values.cpaTaskPerPrice,
      productizationLink: ''
    }
    return await request({
      method: 'POST',
      api: 'api/projectTask/saveProjectTask',
      params
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
      const campaignId = values.campaignId
      const tokenAddress = USDT_TOKEN_ADDRESS
      const contract = new ethers.Contract(AD3HUB_ADDRESS, Ad3HubAbi, signer)
      const token = new ethers.Contract(
        tokenAddress,
        [
          'function approve(address spender, uint256 amount) external returns (bool)',
          'function balanceOf(address account) view returns (uint256)',
          'event Approval(address indexed owner, address indexed spender, uint256 value)'
        ],
        signer
      )

      const ratio = await contract.getRatio()
      const cpaBonusBudget = ethers.utils
        .parseUnits(
          (values.cpaTaskReward.rewardBudget * (1 + ratio.toNumber() / 100)).toString(),
          6
        )
        .toNumber()
      const taskBonusBudget = ethers.utils
        .parseUnits(
          (values.actionTaskReward.rewardBudget * (1 + ratio.toNumber() / 100)).toString(),
          6
        )
        .toNumber()
      const feeData = await getCurrentGasPrice()
      const gasParams = {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
      }

      // 开始链上通信
      // 判断用户钱包余额
      const balance = await token.balanceOf(signer.getAddress())
      const total = cpaBonusBudget + taskBonusBudget
      if (balance.toNumber() <= total) {
        notification.warning({
          message: 'STEP2 创建链上合约失败',
          description: '您的钱包余额不足以支付本次活动预算'
        })
        return
      }
      // 申请额度
      setLoadingText('正在申请链上 TOKEN 的消费额度，请耐心等待，并尽快签名钱包内的申请')
      const approveTx = await token.approve(
        AD3HUB_ADDRESS,
        (cpaBonusBudget + taskBonusBudget) * 10,
        gasParams
      )
      const approveTxResult = await approveTx.wait()
      if (`${approveTxResult.status}` === '1') {
        // 创建链上活动合约
        setLoadingText('正在创建链上合约，请耐心等待，并尽快签名钱包内的申请')
        const createCampaignTx = await contract.createCampaign(
          campaignId,
          cpaBonusBudget,
          taskBonusBudget,
          tokenAddress,
          tokenAddress,
          {
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
          }
        )
        const createCampaignTxResult = await createCampaignTx.wait()

        if (`${createCampaignTxResult.status}` === '1') {
          setLoadingText('正在查询链上合约地址，请耐心等待')
          const campaignAddress = await getCampaignAddress({ contract })
          return { success: true, campaignAddress }
        } else {
          notification.warning({
            message: 'STEP4 创建链上合约失败',
            description: '链上支付失败，请查看钱包活动内的具体原因'
          })
          return { success: false }
        }
      } else {
        notification.warning({
          message: 'STEP3 申请链上 TOKEN 额度失败',
          description: '链上支付失败，请查看钱包活动内的具体原因'
        })
        return { success: false }
      }
    } catch (error) {
      console.warn(error)
      notification.warning({
        message: 'STEP5 创建链上合约失败',
        description: '链上支付失败，请查看钱包活动内的具体原因'
      })
      return { success: false }
    }
  }

  // 更新活动内的合约地址
  const onUpdate = async ({ id = 0, campaignAddress = '' }) => {
    return await request({
      method: 'POST',
      api: 'api/project/saveProject',
      params: {
        campaignAddress,
        projectTaskId: id
      }
    })
  }

  const onPayOnChain = useCallback(
    async (values) => {
      if (ENV === 'test' && chain.id !== 80001) {
        switchNetwork(80001)
        return
      }
      if (ENV === 'daily' && chain.id !== 1337) {
        switchNetwork(1337)
        return
      }
      if (ENV === 'prod' && chain.id !== Number(values.actionTaskReward.chainNetwork)) {
        switchNetwork(Number(values.actionTaskReward.chainNetwork))
        return
      }

      if (signer && !loading) {
        setLoading(true)

        // 中心化服务活动
        const activity = await onSubmit(values)

        if (activity && `${activity.success}` === 'true') {
          // 创建链上合约 & 支付
          const onCreateResult = await onCreate({
            campaignId: activity.result,
            actionTaskReward: {
              rewardName: values.actionTaskReward.rewardName,
              rewardBudget: values.actionTaskRewardBudget
            },
            cpaTaskReward: {
              rewardName: values.actionTaskReward.rewardName,
              rewardBudget: values.cpaTaskRewardBudget
            }
          })
          if (onCreateResult.success) {
            // 更新中心化服务地址
            const updateResult = await onUpdate({
              id: activity.result,
              campaignAddress: onCreateResult.campaignAddress
            })
            console.info('updateResult ==> ', updateResult)

            // 结束
            setLoading(false)
            setLoadingText('')
            setTaskResult(activity)
            setCurrent(2)
          } else {
            notification.warning({
              message: 'STEP6 创建链上合约失败',
              description: '网络异常，请稍后重试'
            })
            setLoading(false)
          }
        } else {
          notification.warning({
            message: 'STEP1 创建活动失败',
            description: '网络异常，请稍后重试'
          })
          setLoading(false)
        }
      }
    },
    [signer, loading, chain]
  )

  useEffect(() => {
    tempTaskList = taskList
  }, [taskList])

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
                return current && current < dayjs().startOf('day')
              }}
            />
          </Form.Item>

          <div>
            <Tooltip title="设立奖金池，激励普通用户参与任务，到期均分开奖">
              <Divider>
                行为任务配置 <QuestionCircleOutlined />
              </Divider>
            </Tooltip>
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
            <Tooltip title="设定 CPA 单价，激励 KOL 裂变推广任务">
              <Divider>
                CPA 任务配置 <QuestionCircleOutlined />
              </Divider>
            </Tooltip>
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
          <p>{loadingText}</p>
        </div>
      ) : null}
    </div>
  )
}

export default TaskForm
