import { message } from 'antd'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import Observer from '@researchgate/react-intersection-observer'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { request } from '@/utils/request'
import styles from './index.module.less'

const CHANNEL_ICON_MAP = {
  twitter: 'https://db35z3hw6fbxp.cloudfront.net/twitter-icon.png',
  discord: 'https://db35z3hw6fbxp.cloudfront.net/discord-icon.png',
  telegram: 'https://db35z3hw6fbxp.cloudfront.net/telegram-icon.png',
  custom: 'https://db35z3hw6fbxp.cloudfront.net/website.png'
}
export default ({
  projectTaskId = '',
  shareId = '',
  item = {},
  index = 0,
  queryProjectTaskStatus = () => {}
}) => {
  const [operaVisible, setOperaVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  const switchTaskIcon = () => {
    if (item.taskType === 'FOLLOW_TWITTER' || item.taskType === 'RETWEET') {
      return CHANNEL_ICON_MAP.twitter
    } else if (item.taskType === 'JOIN_DISCORD') {
      return CHANNEL_ICON_MAP.discord
    } else if (item.taskType === 'JOIN_TELEGRAM') {
      return CHANNEL_ICON_MAP.telegram
    } else {
      return CHANNEL_ICON_MAP.custom
    }
  }

  const open = () => {
    if (!isConnected) {
      openConnectModal()
      return
    }
    if (item.status === 'finish') return
    setOperaVisible((v) => !v)
  }

  const onFinish = async () => {
    if (loading) {
      return
    }
    const taskClickStatus = localStorage.getItem(`${item.actionTaskId}-${item.name}`)
    if (`${taskClickStatus}` !== '1') {
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
      window.dataLayer.push({
        event: 'lp-taskitem-verify-success-clk',
        address: address || '',
        projectId: projectTaskId || '',
        taskType: item.taskType || '',
        actionId: item.actionTaskId || ''
      })
    } else if (ret && ret.message) {
      message.warning(ret.message)
    }
  }

  return (
    <Observer
      onChange={() => {
        window.dataLayer.push({
          event: 'lp-taskitem-expose',
          address: address || '',
          projectId: projectTaskId || '',
          taskType: item.taskType || '',
          actionId: item.actionTaskId || ''
        })
      }}
    >
      <div className={styles.task} key={`task-${index}`}>
        <div
          className={styles.taskContent}
          onClick={() => {
            window.dataLayer.push({
              event: 'lp-taskitem-clk',
              address: address || '',
              projectId: projectTaskId || '',
              taskType: item.taskType || '',
              actionId: item.actionTaskId || ''
            })
            open()
          }}
        >
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
              <Observer
                onChange={() => {
                  window.dataLayer.push({
                    event: 'lp-taskitem-go-expose',
                    address: address || '',
                    projectId: projectTaskId || '',
                    taskType: item.taskType || '',
                    actionId: item.actionTaskId || ''
                  })
                }}
              >
                <div
                  className={styles.doBtn}
                  onClick={() => {
                    window.dataLayer.push({
                      event: 'lp-taskitem-go-clk',
                      address: address || '',
                      projectId: projectTaskId || '',
                      taskType: item.taskType || '',
                      actionId: item.actionTaskId || ''
                    })
                    localStorage.setItem(`${item.actionTaskId}-${item.name}`, 1)
                    window.open(item.actionObject)
                  }}
                >
                  GO
                </div>
              </Observer>
              <Observer
                onChange={() => {
                  window.dataLayer.push({
                    event: 'lp-taskitem-verify-expose',
                    address: address || '',
                    projectId: projectTaskId || '',
                    taskType: item.taskType || '',
                    actionId: item.actionTaskId || ''
                  })
                }}
              >
                <div
                  className={styles.verifyBtn}
                  onClick={() => {
                    window.dataLayer.push({
                      event: 'lp-taskitem-verify-clk',
                      address: address || '',
                      projectId: projectTaskId || '',
                      taskType: item.taskType || '',
                      actionId: item.actionTaskId || ''
                    })
                    onFinish()
                  }}
                >
                  {loading ? 'Loading ...' : 'Verify'}
                </div>
              </Observer>
            </div>
          </div>
        ) : null}
      </div>
    </Observer>
  )
}
