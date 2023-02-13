import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'

export default () => {
  const navigate = useNavigate()

  return (
    <div className={styles.task} onClick={() => navigate('/backend/detail?id=1')}>
      <img className={styles.cover} src="https://db35z3hw6fbxp.cloudfront.net/mock.png" />
      <div className={styles.info}>
        <div className={styles.taskInfo}>
          <img
            className={styles.taskIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/company-logo.png"
          />
          <span className={styles.taskTitle}>
            ADVENTURE NAME ADVENTURE NAME ADVENTURE NAME ADVENTURE NAME
          </span>
        </div>
        <div className={styles.tags}>
          <span className={styles.tag}>2022.02.02 10:00 ~ 2022.03.02 21:59:59</span>
          <span className={styles.tag}>ongoing</span>
        </div>
      </div>
    </div>
  )
}
