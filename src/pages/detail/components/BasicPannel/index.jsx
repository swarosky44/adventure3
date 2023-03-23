import { message } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useAccount } from 'wagmi'
import { request } from '@/utils/request'
import Task from '../taskItem'
import styles from './index.module.less'

export default ({
  data = {},
  owner = {},
  taskInstance = [],
  projectTaskId = '',
  shareId = '',
  isSecurity = false,
  queryProjectTaskStatus = () => {}
}) => {
  const [shareCode, setShareCode] = useState('')
  const [operaVisible, setOperaVisible] = useState(false)
  const { address, isConnected } = useAccount()

  const tasks = taskInstance
    .map((t) => {
      const dto = data.actionTaskDTOS.find((d) => `${d.id}` === `${t.actionTaskId}`)
      if (dto) {
        return { ...dto, ...t }
      }
      return null
    })
    .filter((t) => t)

  // 获取分享ID
  const queryShareId = async () => {
    const ret = await request({
      api: 'api/taskInstance/queryShareId',
      params: {
        address,
        projectTaskId
      }
    })
    if (ret && ret.result) {
      setShareCode(ret.result)
    }
  }

  // 格式化时间
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const Y = d.getFullYear()
    const M = d.getMonth() + 1
    const D = d.getDate()
    const h = d.getHours()
    const m = d.getMinutes()
    const s = d.getSeconds()
    return `${Y}-${M >= 10 ? M : `0${M}`}-${D >= 10 ? D : `0${D}`} ${h >= 10 ? h : `0${h}`}:${
      m >= 10 ? m : `0${m}`
    }:${s >= 10 ? s : `0${s}`}`
  }

  useEffect(() => {
    if (isConnected) {
      queryShareId()
    }
  }, [isConnected])

  // 渲染活动状态
  const renderActivityStatus = () => {
    const { launchStartTime, launchEndTime } = data
    const now = Date.now()
    const endD = new Date(launchEndTime).getTime()
    const starD = new Date(launchStartTime).getTime()

    if (now < starD) {
      return 'not started'
    } else if (now >= starD && now <= endD) {
      return 'ongoing'
    } else {
      return 'expired'
    }
  }

  return (
    <div className={styles.module}>
      <div className={styles.title}>
        {owner && owner.logo ? <img className={styles.companyLogo} src={owner.logo} /> : null}
        {data.title}
        <img
          className={styles.companyVerifyIcon}
          src="https://db35z3hw6fbxp.cloudfront.net/company-verify-icon.png"
        />
        {isSecurity ? (
          <img
            className={styles.companySecurityIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/shield.png"
          />
        ) : null}
      </div>
      <div className={styles.tags}>
        <div className={styles.tag}>
          {formatDate(data.launchStartTime)} ~ {formatDate(data.launchEndTime)} (UTC+8)
        </div>
        <div className={styles.tag}>{renderActivityStatus()}</div>
      </div>
      <div className={styles.list}>
        {tasks.map((item, index) => {
          return (
            <Task
              key={`task-${index}`}
              item={item}
              index={index}
              projectTaskId={projectTaskId}
              shareId={shareId}
              queryProjectTaskStatus={queryProjectTaskStatus}
            />
          )
        })}
        {shareCode ? (
          <div className={styles.task} id="detail-task-share-card">
            <div className={styles.taskContent} onClick={() => setOperaVisible((v) => !v)}>
              <img
                className={styles.taskIcon}
                src="https://db35z3hw6fbxp.cloudfront.net/custom-icon.png"
              />
              <span className={styles.taskText}>Publish content to bring in users</span>
            </div>
            {operaVisible ? (
              <div className={styles.taskOperaPannel} id="detail-task-share-copy-button">
                <div className={styles.taskBtns}>
                  <CopyToClipboard
                    text={`https://www.adventure3.tk/detail?id=${projectTaskId}&shareId=${shareCode}`}
                    onCopy={() =>
                      message.success('Create success! Publish Content to birng in users')
                    }
                  >
                    <div className={styles.doBtn}>COPY URL</div>
                  </CopyToClipboard>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
