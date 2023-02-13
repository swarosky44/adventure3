import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button, Empty, List } from 'antd'
import TaskCard from './components/taskCard'
import styles from './index.module.less'

export default () => {
  const [data] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1])
  const navigate = useNavigate()

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
            <TaskCard />
          </List.Item>
        )}
      />
    </div>
  )
}
