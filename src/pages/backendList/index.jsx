import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button, Empty, List, Spin } from 'antd'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { request } from '../../utils/request'
import TaskCard from './components/taskCard'
import styles from './index.module.less'

export default () => {
  const [owner, setOwner] = useState(null)
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [loading, setLoading] = useState(true)
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const navigate = useNavigate()

  // 查询广告主任务列表
  const queryTaskList = async (pageNo) => {
    const ret = await request({
      api: 'api/projectTask/projectTaskList',
      params: {
        accountAddress: address,
        pageNo,
        pageSize: 12
      }
    })
    if (ret && ret.result && ret.result.projectTaskListVOS) {
      setData(ret.result.projectTaskListVOS)
      setCurrent(pageNo)
    }
  }

  // 查询广告主信息
  const queryTaskOwnerDetail = async () => {
    const ret = await request({
      api: 'api/project/queryProject',
      params: { address }
    })
    if (ret && ret.result) {
      setOwner(ret.result)
    }
  }

  useEffect(() => {
    if (isConnected) {
      Promise.all([queryTaskList(current), queryTaskOwnerDetail()]).then(() => setLoading(false))
    }
  }, [isConnected])

  if (!isConnected) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60
        }}
        description={<span>Please signin first</span>}
      >
        <Button type="primary" onClick={() => openConnectModal()}>
          Sign in
        </Button>
      </Empty>
    )
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <Spin size="large" />
      </div>
    )
  }

  if (!data.length) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60
        }}
        description={<span>No Data</span>}
      >
        <Button type="primary" onClick={() => navigate('/backend/create')}>
          Create Now
        </Button>
      </Empty>
    )
  }

  return (
    <div className={styles.list}>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <TaskCard data={item} owner={owner} />
          </List.Item>
        )}
        pagination={{
          current,
          onChange: () => queryTaskList(current + 1),
          pageSize: 8
        }}
      />
    </div>
  )
}
