import React, { useState, useEffect } from 'react'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { PlusOutlined } from '@ant-design/icons'
import { useAccount, useSigner } from 'wagmi'
import { Space, Table, Result, notification } from 'antd'
import { ethers } from 'ethers'
import dayjs from 'dayjs'
import Observer from '@researchgate/react-intersection-observer'
import CampaignAbi from '@/utils/Campaign.json'
import { request, getCurrentGasPrice } from '@/utils/request'
import styles from './index.module.less'

const Profile = () => {
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  })
  const { openConnectModal } = useConnectModal()

  // 更新支付状态
  const updatePayFeeStatus = async ({ address, projectTaskId, type, status }) => {
    await request({
      api: 'api/taskInstance/updatePayFeeStatus',
      params: {
        address,
        projectTaskId,
        type,
        status
      }
    })
  }

  // 提款
  const onWithdraw = async (data, type) => {
    try {
      // 准备链上参数 & 对象
      const {
        actionTaskFeeAmount,
        actionTaskFeeKeyR,
        actionTaskFeeKeyS,
        actionTaskFeeKeyV,
        cpaTaskFeeAmount,
        cpaTaskFeeKeyR,
        cpaTaskFeeKeyS,
        cpaTaskFeeKeyV,
        projectTaskDTO
      } = data
      const { projectTaskId, campaignAddress } = projectTaskDTO
      const actionFee = ethers.utils.parseUnits(actionTaskFeeAmount.toString(), 6).toNumber()
      const cpaFee = ethers.utils.parseUnits(cpaTaskFeeAmount.toString(), 6).toNumber()

      const contract = new ethers.Contract(campaignAddress, CampaignAbi, signer)
      const feeData = await getCurrentGasPrice()
      const gasParams = {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
      }

      if (type === 'cpa') {
        // 分享任务奖励
        const signature = ethers.utils.joinSignature({
          r: cpaTaskFeeKeyR,
          s: cpaTaskFeeKeyS,
          v: cpaTaskFeeKeyV
        })
        if (signature !== '0') {
          const claimCpaRewardTx = await contract.claimCpaReward(cpaFee, signature, gasParams)
          const claimCpaRewardTxResult = await claimCpaRewardTx.wait()
          if (`${claimCpaRewardTxResult.status}` === '1') {
            await updatePayFeeStatus({ address, projectTaskId, type, status: 'finish' })
          }
          notification.success({
            message: 'Congratulations',
            description: 'Claim Cpa Reward Success'
          })
        } else {
          throw new Error('AD3Hub: PrizeSignature invalid.')
        }
      } else if (type === 'task') {
        // 行为任务奖励
        const signature = ethers.utils.joinSignature({
          r: actionTaskFeeKeyR,
          s: actionTaskFeeKeyS,
          v: actionTaskFeeKeyV
        })
        if (signature !== '0') {
          const claimTaskRewardTx = await contract.claimTaskReward(actionFee, signature, gasParams)
          const claimTaskRewardTxResult = await claimTaskRewardTx.wait()
          if (`${claimTaskRewardTxResult.status}` === '1') {
            await updatePayFeeStatus({ address, projectTaskId, type, status: 'finish' })
          }
          notification.success({
            message: 'Congratulations',
            description: 'Claim Task Reward Success'
          })
        } else {
          throw new Error('AD3Hub: PrizeSignature invalid.')
        }
      }
    } catch (error) {
      if (error.message.indexOf('PrizeSignature invalid') >= 0) {
        notification.warning({
          message: 'Claim reward failured',
          description: 'AD3Hub: PrizeSignature invalid.'
        })
      } else if (error.message.indexOf('AD3Hub: Repeated claim reward.') >= 0) {
        notification.warning({
          message: 'Claim reward failured',
          description: 'AD3Hub: Repeated claim reward.'
        })
      } else {
        notification.warning({
          message: 'AD3Hub: Repeated claim reward.',
          description: error.message
        })
      }
    }
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'projectTaskId',
      width: '5%'
    },
    {
      title: 'Task Name',
      dataIndex: 'projectTaskDTO.title',
      width: '20%',
      render: (_, record) => <Space size="middle">{record.projectTaskDTO.title}</Space>
    },
    {
      title: 'Token',
      colSpan: 2,
      children: [
        {
          title: 'cpa token',
          dataIndex: 'cpaTaskRewardUnit',
          render: (_, record) => (
            <Space size="middle">{record.projectTaskDTO.cpaTaskRewardUnit}</Space>
          )
        },
        {
          title: 'task token',
          dataIndex: 'actionTaskRewardUnit',
          render: (_, record) => (
            <Space size="middle">{record.projectTaskDTO.actionTaskRewardUnit}</Space>
          )
        }
      ]
    },
    {
      title: 'Budget',
      colSpan: 2,
      children: [
        {
          title: 'cpa amount',
          dataIndex: 'cpaTaskRewardBudget',
          render: (_, record) => (
            <Space size="middle">{record.projectTaskDTO.cpaTaskRewardBudget}</Space>
          )
        },
        {
          title: 'task amount',
          dataIndex: 'actionTaskRewardBudget',
          render: (_, record) => (
            <Space size="middle">{record.projectTaskDTO.actionTaskRewardBudget}</Space>
          )
        }
      ]
    },
    {
      title: 'Amount',
      colSpan: 2,
      children: [
        {
          title: 'cpa amount',
          dataIndex: 'cpaTaskFeeAmount ',
          render: (_, record) => <Space size="middle">{record.cpaTaskFeeAmount}</Space>
        },
        {
          title: 'task amount',
          dataIndex: 'actionTaskFeeAmount',
          render: (_, record) => <Space size="middle">{record.actionTaskFeeAmount}</Space>
        }
      ]
    },
    {
      title: 'EndTime',
      dataIndex: 'launchEndTime',
      render: (_, record) => (
        <Space size="middle">
          {dayjs(record.projectTaskDTO.launchEndTime).format('YYYY-MM-DD HH:mm')}
        </Space>
      )
    },
    {
      title: 'Operation',
      colSpan: 2,
      children: [
        {
          title: 'cpa action',
          render: (_, record) => (
            <Space size="middle">
              {record.cpaTaskFeeAmount > 0 ? (
                <a onClick={() => onWithdraw(record, 'cpa')}>Withdraw</a>
              ) : (
                '-'
              )}
            </Space>
          )
        },
        {
          title: 'task action',
          render: (_, record) => (
            <Space size="middle">
              {record.actionTaskFeeAmount > 0 ? (
                <a onClick={() => onWithdraw(record, 'task')}>Wthdraw</a>
              ) : (
                '-'
              )}
            </Space>
          )
        }
      ]
    }
  ]

  const fetchData = async () => {
    setLoading(true)
    const ret = await request({
      api: 'api/taskInstance/queryProjectTaskResult',
      params: {
        address,
        pageSize: tableParams.pagination.pageSize,
        pageNum: tableParams.pagination.current
      }
    })
    if (ret.code === 0 && ret.result) {
      setData(ret.result.list)
      setLoading(false)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: ret.result.total
        }
      })
    }
  }

  useEffect(() => {
    if (signer) {
      fetchData()
    }
  }, [signer])

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  if (isMobile) {
    return (
      <div className={styles.page}>
        <Result
          title="Please visit this page from PC"
          extra={<a href={location.href}>{location.href}</a>}
        />
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className={styles.page}>
        <Result
          title="Please log in to the wallet first"
          extra={<a onClick={() => openConnectModal()}>Log in</a>}
        />
      </div>
    )
  }

  return (
    <Observer
      onChange={() => {
        window.dataLayer.push({
          event: 'profile-expose',
          address: address || ''
        })
      }}
    >
      <div className={styles.page}>
        <header className={styles.header}>
          <img className={styles.logo} src="https://db35z3hw6fbxp.cloudfront.net/detail-logo.png" />
          <div className={styles.right}>
            <ConnectButton />
            {!isMobile ? (
              <div className={styles.create} onClick={() => navigate('/backend/create')}>
                <PlusOutlined style={{ marginRight: '8px' }} />
                New Adventure
              </div>
            ) : null}
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.tableWrapper}>
            <div className={styles.categoryTitle}>TASK DETAILS</div>
            <Table
              style={{ marginTop: '16px' }}
              columns={columns}
              rowKey={(record) => record.id}
              dataSource={data}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
              bordered={true}
            />
          </div>
        </main>
      </div>
    </Observer>
  )
}

export default Profile
