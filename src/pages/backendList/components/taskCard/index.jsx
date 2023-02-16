import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import styles from './index.module.less'

export default ({ data = {}, owner = {} }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.task} onClick={() => navigate(`/backend/detail?id=${data.id}`)}>
      <div className={styles.coverWrapper}>
        <img
          className={styles.cover}
          src={`https://db35z3hw6fbxp.cloudfront.net/${data.activityImg}`}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.taskInfo}>
          <img className={styles.taskIcon} src={owner.logo} />
          <span className={styles.taskTitle}>{data.title}</span>
        </div>
        <div className={styles.tags}>
          <span className={styles.tag}>
            {dayjs(data.launchStartTime).format('YYYY-MM-DD HH:mm')} ~{' '}
            {dayjs(data.launchEndTime).format('YYYY-MM-DD HH:mm')}
          </span>
          <span className={styles.tag}>{data.status}</span>
        </div>
      </div>
    </div>
  )
}
