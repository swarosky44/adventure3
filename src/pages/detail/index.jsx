import { useSearchParams } from 'react-router-dom'
import styles from './index.module.less'

const Detail = () => {
  const [params] = useSearchParams()
  const id = params.get('id')

  return (
    <div className={styles.module}>
      我是 Detail
      <p>任务ID是：{id}</p>
    </div>
  )
}

export default Detail
