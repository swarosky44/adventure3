import { useState, useCallback, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import { PlusOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect'
import { useAccount } from 'wagmi';
import { Result, Spin } from 'antd'
import { request } from '../../utils/request'
import particlesOpt from './particles.json'
import BasicPannel from './components/BasicPannel'
import DescPannel from './components/DescPannel'
import RewardPannel from './components/RewardPannel'
import styles from './index.module.less'

const Detail = () => {
  const [loading, setLoading] = useState(true)
  const [actionTaskInstance, setActionTaskInstance] = useState(null)
  const [actionTaskStatus, setActionTaskStatus] = useState(null)
  const [cpaTaskInstance, setCpaTaskInstance] = useState(null)
  // const [cpaTaskStatus, setCpaTaskStatus] = useState(null)
  const [projectTaskDTO, setProjectTaskDTO] = useState(null)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { address } = useAccount()
  const id = params.get('id')
  const shareId = params.get('shareId')

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(() => {}, [])

  const queryProjectTaskStatus = async () => {
    const ret = await request({
      api: 'api/taskInstance/queryProjectTaskStatus',
      params: {
        address,
        projectTaskId: id
      }
    })
    if (ret && ret.result && ret.result.projectTaskDTO) {
      const {
        actionTaskInstances,
        actionTaskStatus,
        cpaTaskInstance,
        // cpaTaskStatus,
        projectTaskDTO
      } = ret.result

      setActionTaskInstance(actionTaskInstances)
      setActionTaskStatus(actionTaskStatus)
      setCpaTaskInstance(cpaTaskInstance)
      // setCpaTaskStatus(cpaTaskStatus)
      setProjectTaskDTO(projectTaskDTO)
    }
    setLoading(false)
  }

  useEffect(() => {
    queryProjectTaskStatus()
  }, [])

  if (loading) {
    return (
      <div className={styles.page}>
        <Spin size="large" />
      </div>
    )
  }

  if (!projectTaskDTO) {
    return (
      <div className={styles.page}>
        <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist" />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img className={styles.logo} src="https://db35z3hw6fbxp.cloudfront.net/detail-logo.png" />
        <div className={styles.right}>
          <ConnectButton />
          {!isMobile ? (
            <div className={styles.create} onClick={() => navigate('/backend/create')}>
              <PlusOutlined style={{ marginRight: '8px' }} />
              New Adventure
            </div>
          ) : null}
        </div>
      </header>
      <main className={styles.module}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOpt}
        />
        <div className={styles.content}>
          <div className={styles.column1}>
            <BasicPannel
              data={projectTaskDTO}
              taskInstance={actionTaskInstance}
              projectTaskId={id}
              shareId={shareId}
              queryProjectTaskStatus={queryProjectTaskStatus}
            />
            <DescPannel data={projectTaskDTO} />
          </div>
          <div className={styles.column2}>
            <RewardPannel data={projectTaskDTO} cpa={cpaTaskInstance} action={actionTaskStatus} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Detail
