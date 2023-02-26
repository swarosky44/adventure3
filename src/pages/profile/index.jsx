import React, { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { PlusOutlined } from '@ant-design/icons'
import { useAccount, useSigner } from 'wagmi'
import { Space, Table } from 'antd'
import { ethers } from 'ethers'
import CampaignAbi from '@/utils/Campaign.json'
import { TaskFeeStatusVal, MOCK } from './const.js'
import { request, getCurrentGasPrice } from '../../utils/request'
import styles from './index.module.less'

const Profile = () => {
  const { address } = useAccount()
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

  // 提款
  const onWithdraw = async (data, type) => {
    // 准备链上参数 & 对象
    const { projectTaskDTO, cpaTaskFeeAmount, actionTaskFeeAmount } = data
    const {
      campaignAddress,
      cpaTaskFeeKeyR,
      cpaTaskFeeKeyS,
      cpaTaskFeeKeyV,
      actionTaskFeeKeyR,
      actionTaskFeeKeyS,
      actionTaskFeeKeyV
    } = projectTaskDTO

    const contract = new ethers.Contract(campaignAddress, CampaignAbi, signer)
    const feeData = await getCurrentGasPrice()
    const gasParams = {
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    }
    if (type === 'cpa') {
      // 分享任务奖励
      const signature = `${cpaTaskFeeKeyR}${cpaTaskFeeKeyS.slice(2, cpaTaskFeeKeyS.length)}${Number(
        cpaTaskFeeKeyV
      ).toString(16)}`
      await contract.claimCpaReward(Number(cpaTaskFeeAmount), signature, gasParams)
      contract.once('ClaimCpaReward', () => {
        console.info('ClaimCpaReward Success')
        // TODO => 通知服务端领取成功
      })
    } else if (type === 'task') {
      // 行为任务奖励
      const signature = `${actionTaskFeeKeyR}${actionTaskFeeKeyS.slice(
        2,
        actionTaskFeeKeyV.length
      )}${Number(actionTaskFeeKeyV).toString(16)}`
      await contract.claimTaskReward(Number(actionTaskFeeAmount), signature, gasParams)
      contract.once('ClaimTaskReward', () => {
        console.info('ClaimTaskReward Success')
        // TODO => 通知服务端领取成功
      })
    }
  }

  const columns = [
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
      title: '已提现',
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
      title: '可提取',
      colSpan: 2,
      children: [
        {
          title: 'cpa',
          dataIndex: 'cpaTaskFeeStatus',
          render: (_, record) => (
            <Space size="middle">{TaskFeeStatusVal[record.cpaTaskFeeStatus]}</Space>
          )
        },
        {
          title: 'task',
          dataIndex: 'actionTaskFeeStatus',
          render: (_, record) => (
            <Space size="middle">{TaskFeeStatusVal[record.actionTaskFeeStatus]}</Space>
          )
        }
      ]
    },
    {
      title: '截止有效期',
      dataIndex: 'launchEndTime',
      render: (_, record) => <Space size="middle">{record.projectTaskDTO.launchEndTime}</Space>
    },
    {
      title: '操作',
      colSpan: 2,
      children: [
        {
          title: 'cpa action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={() => onWithdraw(record, 'cpa')}>分享任务提现</a>
            </Space>
          )
        },
        {
          title: 'task amount',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={() => onWithdraw(record, 'task')}>行为任务提现</a>
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
        projectTaskId: 41,
        pageSize: tableParams.pagination.pageSize,
        pageNum: tableParams.pagination.current
      }
    })
    if (ret.code === 0 && ret.result) {
      setData(ret.result.list && ret.result.list.length ? ret.result.list : MOCK)
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
    fetchData()
  }, [JSON.stringify(tableParams)])

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

  return (
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
          <div className={styles.categoryTitle}>任务收益明细</div>
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
  )
}

export default Profile
