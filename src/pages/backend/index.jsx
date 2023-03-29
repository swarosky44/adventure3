import { useState } from 'react'
import { Steps, Card } from 'antd'
import { useAccount } from 'wagmi'
import Observer from '@researchgate/react-intersection-observer'
import BasicForm from './components/BasicForm'
import TaskForm from './components/TaskForm'
import FormResult from './components/FormResult'
import styles from './index.module.less'

const AdvertiserForm = () => {
  const [current, setCurrent] = useState(0)
  const [taskResult, setTaskResult] = useState({})
  const { address } = useAccount()

  const items = [
    {
      title: '项目基础信息',
      key: 'commutity',
      content: <BasicForm setCurrent={setCurrent} />
    },
    {
      title: '任务配置',
      key: 'task',
      content: <TaskForm setCurrent={setCurrent} setTaskResult={setTaskResult} />
    },
    {
      title: '配置完成',
      key: 'result',
      content: <FormResult setCurrent={setCurrent} data={taskResult} />
    }
  ]

  return (
    <Observer
      onChange={() => {
        window.dataLayer.push({
          event: 'backend-form-expose',
          address: address || ''
        })
      }}
    >
      <Card>
        <header className={styles.header}>
          <Steps current={current} items={items} />
        </header>
        <main className={styles.body}>
          {items.map((item, index) => (
            <div key={index} style={{ display: current === index ? 'block' : 'none' }}>
              {item.content}
            </div>
          ))}
        </main>
      </Card>
    </Observer>
  )
}

export default AdvertiserForm
