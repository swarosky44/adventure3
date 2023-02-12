import { message } from 'antd'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { request } from '@/utils/request'
import styles from './index.module.less'

const CHANNEL_ICON_MAP = {
  twitter: 'https://db35z3hw6fbxp.cloudfront.net/twitter-icon.png',
  discord: 'https://db35z3hw6fbxp.cloudfront.net/discord-icon.png',
  telegram: 'https://db35z3hw6fbxp.cloudfront.net/telegram-icon.png'
}
export default ({
  projectTaskId = '',
  shareId = '',
  item = {},
  index = 0,
  queryProjectTaskStatus = () => {}
}) => {
  const [itemClickStatus, setItemClickStatus] = useState(false)
  const [operaVisible, setOperaVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()

  const switchTaskIcon = () => {
    if (item.taskType.indexOf('Twitter') >= 0) {
      return CHANNEL_ICON_MAP.twitter
    } else if (item.taskType.indexOf('Discord') >= 0) {
      return CHANNEL_ICON_MAP.discord
    } else if (item.taskType.indexOf('Telegram') >= 0) {
      return CHANNEL_ICON_MAP.telegram
    } else if (item.taskType.indexOf('Custom') >= 0) {
      return item.iconUrl
    } else {
      return CHANNEL_ICON_MAP.twitter
    }
  }

  const open = () => {
    if (item.status === 'finish') return
    setOperaVisible((v) => !v)
  }

  const onFinish = async () => {
    if (loading) {
      return
    }
    if (!itemClickStatus) {
      return message.warning('Please click the GO button and complete the task')
    }
    setLoading(true)

    const ret = await request({
      api: 'api/taskInstance/finishTask',
      params: {
        address,
        shareId: shareId || '',
        projectTaskId,
        actionTaskId: item.actionTaskId
      }
    })
    if (ret && `${ret.result}` === 'true') {
      message.success('Mission accomplished ~')
      queryProjectTaskStatus()
      setOperaVisible(false)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  return (
    <div className={styles.task} key={`task-${index}`}>
      <div className={styles.taskContent} onClick={open}>
        <img className={styles.taskIcon} src={switchTaskIcon()} />
        <span className={styles.taskText}>{item.name || ''}</span>
        {item.status === 'finish' ? (
          <img
            className={styles.compeletedIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/complete-icon.png"
          />
        ) : null}
      </div>
      {operaVisible ? (
        <div className={styles.taskOperaPannel}>
          {item.taskType.indexOf('Custom') >= 0 ? (
            <div className={styles.taskTip}>
              <div className={styles.taskTipTitle}>Website</div>
              <div className={styles.taskTargetUrl}>https://tokendance.xyz/bat</div>
            </div>
          ) : null}
          <div className={styles.taskBtns}>
            <div
              className={styles.doBtn}
              onClick={() => {
                setItemClickStatus(true)
                window.open(item.actionObject)
              }}
            >
              GO
            </div>
            <div className={styles.verifyBtn} onClick={onFinish}>
              {loading ? 'Loading ...' : 'Verify'}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
