import { useState } from 'react'
import { Steps, Card } from 'antd'
import BasicForm from './components/BasicForm'
import TaskForm from './components/TaskForm'
import FormResult from './components/FormResult'
import './style.less'

const AdvertiserForm = () => {
  const [current, setCurrent] = useState(1)
  const [taskResult, setTaskResult] = useState(null)

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
      content: <FormResult data={taskResult} />
    }
  ]

  return (
    <Card>
      <header className="header">
        <Steps current={current} items={items} />
      </header>
      <main className="body">{items[current].content}</main>
    </Card>
  )
}

export default AdvertiserForm
