import { useState } from 'react'
import { Steps, Card } from 'antd'
import BasicForm from './components/BasicForm'
import TaskForm from './components/TaskForm'
import FormResult from './components/FormResult'
import './style.less'

const items = [
  {
    title: '项目基础信息',
    key: 'commutity',
    content: <BasicForm />
  },
  {
    title: '任务配置',
    key: 'task',
    content: <TaskForm />
  },
  {
    title: '配置完成',
    key: 'result',
    content: <FormResult />
  }
]
const AdvertiserForm = () => {
  const [current] = useState(2)

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
