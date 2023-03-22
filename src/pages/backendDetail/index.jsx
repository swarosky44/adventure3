import { useEffect, useState } from 'react'
import { Card, Descriptions, Spin, Result, Button, Table, notification } from 'antd'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSigner } from 'wagmi'
import { ethers } from 'ethers'
import dayjs from 'dayjs'
import { TASK_TYPE, AD3HUB_ADDRESS, USDT_TOKEN_ADDRESS } from '@/utils/const'
import { request, getCurrentGasPrice } from '@/utils/request'
import Ad3HubAbi from '@/utils/Ad3Hub.json'
import styles from './index.module.less'

export default () => {
  const [owner, setOwner] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingBalance, setLoadingBalance] = useState(false)
  const [campaignBalance, setCampaignBalance] = useState(0)
  const { data: signer } = useSigner()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const id = params.get('id')

  // 查询广告主信息
  const queryTaskOwnerDetail = async (data) => {
    const { accountAddress } = data
    const ret = await request({
      api: 'api/project/queryProject',
      params: { address: accountAddress }
    })
    if (ret && ret.result) {
      setOwner(ret.result)
      setLoading(false)
    }
  }

  // 查询任务详情
  const queryTaskDetail = async () => {
    const ret = await request({
      api: 'api/projectTask/projectTaskDetail',
      params: {
        id
      }
    })
    if (ret && ret.result) {
      setData(ret.result)
      queryTaskOwnerDetail(ret.result)
    }
  }

  // 退款
  const onWithdraw = async () => {
    try {
      const { accountAddress, campaignAddress } = data
      const feeData = await getCurrentGasPrice()
      const gasParams = {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
      }
      const contract = new ethers.Contract(AD3HUB_ADDRESS, Ad3HubAbi, signer, gasParams)
      const campaignList = await contract.getCampaignAddressList(accountAddress)
      const campaignIndex = campaignList.findIndex((l) => l === campaignAddress)
      const withdrawTx = await contract.withdrawCpaBudget(accountAddress, campaignIndex + 1)
      const withdrawTxResult = await withdrawTx.wait()

      if (`${withdrawTxResult.status}` === '1') {
        setLoadingBalance(true)
        const token = new ethers.Contract(
          USDT_TOKEN_ADDRESS,
          [
            'function approve(address spender, uint256 amount) external returns (bool)',
            'function balanceOf(address account) view returns (uint256)',
            'event Approval(address indexed owner, address indexed spender, uint256 value)'
          ],
          signer
        )
        token.balanceOf(campaignAddress).then((balance) => {
          setLoadingBalance(false)
          setCampaignBalance(balance.toNumber())
        })
        notification.success({
          message: '退款成功',
          description: '请及时检查钱包内的余额'
        })
      } else {
        notification.success({
          message: '退款失败',
          description: '网络异常，请稍后重试'
        })
      }
    } catch (error) {
      if (error.message.indexOf('The caller must be ad3hub') >= 0) {
        notification.warning({
          message: '退款失败',
          description: '仅限合约管理员可以操作退款'
        })
      }
    }
  }

  useEffect(() => {
    if (data && data.campaignAddress && signer) {
      setLoadingBalance(true)
      const token = new ethers.Contract(
        USDT_TOKEN_ADDRESS,
        [
          'function approve(address spender, uint256 amount) external returns (bool)',
          'function balanceOf(address account) view returns (uint256)',
          'event Approval(address indexed owner, address indexed spender, uint256 value)'
        ],
        signer
      )
      token.balanceOf(data.campaignAddress).then((balance) => {
        setLoadingBalance(false)
        setCampaignBalance(balance.toNumber())
      })
    }
  }, [data])

  useEffect(() => {
    queryTaskDetail()
  }, [])

  if (loading) {
    return (
      <div className={styles.page}>
        <Spin size="large" />
      </div>
    )
  }

  if (!data && !owner) {
    return (
      <div className={styles.page}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => navigate('/backend/list')}>
              Back List
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div>
      <Card title="活动操作">
        <Button onClick={() => navigate('/backend/list')} style={{ marginRight: '12px' }}>
          返回列表
        </Button>
        <Button type="primary" onClick={onWithdraw}>
          退款
        </Button>
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Descriptions title="项目基础信息">
          <Descriptions.Item label="Logo">
            <img className={styles.logo} src={owner.logo} />
          </Descriptions.Item>
          <Descriptions.Item label="名字">{owner.name}</Descriptions.Item>
          <Descriptions.Item label="描述">{owner.desc}</Descriptions.Item>
          <Descriptions.Item label="Github">
            <a target="_blank" href={owner.githubAddress}>
              {owner.githubAddress}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="官网">
            <a
              target="_blank"
              href={`https://${owner.officialWebsite}`}
            >{`https://${owner.officialWebsite}`}</a>
          </Descriptions.Item>
          <Descriptions.Item label="白皮书">
            <a target="_blank" href={owner.whitePaper}>
              {owner.whitePaper}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="广告主">{owner.owner}</Descriptions.Item>
          <Descriptions.Item label="投资方">{owner.investmentInstitutions}</Descriptions.Item>
          <Descriptions.Item label="标签">{owner.tags}</Descriptions.Item>
          <Descriptions.Item label="广告主合约" span={3}>
            {owner.contractAddress}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Descriptions title="活动信息">
          <Descriptions.Item label="活动页面">
            <a
              target="_blank"
              href={`https://www.adventure3.tk/detail?id=${data.projectTaskId}`}
            >{`https://www.adventure3.tk/detail?id=${data.projectTaskId}`}</a>
          </Descriptions.Item>
          <Descriptions.Item label="活动合约">{data.campaignAddress}</Descriptions.Item>
          <Descriptions.Item label="合约余额">
            {loadingBalance ? 'loading' : campaignBalance}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Descriptions title="CPA 任务信息">
          <Descriptions.Item label={`奖励币种(${data.cpaTaskRewardChainNetwork})`}>
            {data.cpaTaskRewardUnit}
          </Descriptions.Item>
          <Descriptions.Item label="奖励预算">{data.cpaTaskRewardBudget}</Descriptions.Item>
          <Descriptions.Item label="奖励单价">{data.cpaTaskPerPrice}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Descriptions title="用户任务信息">
          <Descriptions.Item label={`奖励币种(${data.actionTaskRewardChainNetwork})`}>
            {data.actionTaskRewardUnit}
          </Descriptions.Item>
          <Descriptions.Item label="奖励预算">{data.actionTaskRewardBudget}</Descriptions.Item>
          <Descriptions.Item label="奖励人数">{data.actionTaskRewardNum}</Descriptions.Item>
          <Descriptions.Item label="开奖时间">
            {dayjs(data.actionTaskDrawTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
        </Descriptions>

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
            }
          ]}
          dataSource={data.actionTaskDTOS}
        />
      </Card>
    </div>
  )
}
