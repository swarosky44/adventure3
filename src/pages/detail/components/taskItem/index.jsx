import { useState } from 'react'
import styles from './index.module.less'

const CHANNEL_ICON_MAP = {
  twitter: 'https://db35z3hw6fbxp.cloudfront.net/twitter-icon.png',
  discord: 'https://db35z3hw6fbxp.cloudfront.net/discord-icon.png',
  telegram: 'https://db35z3hw6fbxp.cloudfront.net/telegram-icon.png'
}
const TASK_MOCK_Title = {
  twitter: 'Follow @TokenDance on twitter',
  discord: 'Join @TokenDance on discord',
  telegram: 'Join @TokenDance on twitter',
  custom: 'Publish content and bring register'
}
export default ({ item, index }) => {
  const [operaVisible, setOperaVisible] = useState(false)

  const switchTaskIcon = () => {
    if (item.indexOf('Twitter') >= 0) {
      return CHANNEL_ICON_MAP.twitter
    } else if (item.indexOf('Discord') >= 0) {
      return CHANNEL_ICON_MAP.discord
    } else if (item.indexOf('Telegram') >= 0) {
      return CHANNEL_ICON_MAP.telegram
    } else {
      return CHANNEL_ICON_MAP.twitter
    }
  }

  const switchTaskTitle = () => {
    if (item.indexOf('Twitter') >= 0) {
      return TASK_MOCK_Title.twitter
    } else if (item.indexOf('Discord') >= 0) {
      return TASK_MOCK_Title.discord
    } else if (item.indexOf('Telegram') >= 0) {
      return TASK_MOCK_Title.telegram
    } else {
      return TASK_MOCK_Title.custom
    }
  }

  const open = () => {
    if (index === 0) return
    setOperaVisible((v) => !v)
  }

  return (
    <div className={styles.task} key={`task-${index}`}>
      <div className={styles.taskContent} onClick={open}>
        <img className={styles.taskIcon} src={switchTaskIcon()} />
        <span className={styles.taskText}>{switchTaskTitle()}</span>
        {index === 0 ? (
          <img
            className={styles.compeletedIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/complete-icon.png"
          />
        ) : null}
      </div>
      {operaVisible ? (
        <div className={styles.taskOperaPannel}>
          {item.indexOf('Custom') >= 0 ? (
            <div className={styles.taskTip}>
              <div className={styles.taskTipTitle}>Website</div>
              <div className={styles.taskTargetUrl}>https://tokendance.xyz/bat</div>
            </div>
          ) : null}
          <div className={styles.taskBtns}>
            <div className={styles.doBtn}>GO</div>
            <div className={styles.verifyBtn}>Verify</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
