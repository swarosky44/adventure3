import { useState } from 'react'
import { Steps, Card } from 'antd'
import BasicForm from './components/BasicForm'
import TaskForm from './components/TaskForm'
import FormResult from './components/FormResult'
import styles from './index.module.less'

const AdvertiserForm = () => {
  const [current, setCurrent] = useState(1)
  const [taskResult, setTaskResult] = useState({})

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
  )
}

export default AdvertiserForm
