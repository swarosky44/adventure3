import { useState, useCallback, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import { PlusOutlined } from '@ant-design/icons'
import { isMobile } from 'react-device-detect'
import { useAccount } from 'wagmi'
import { Result, Spin } from 'antd'
import Das from 'das-sdk'
import Observer from '@researchgate/react-intersection-observer'
import { request } from '@/utils/request'
import particlesOpt from './particles.json'
import BasicPannel from './components/BasicPannel'
import DescPannel from './components/DescPannel'
import RewardPannel from './components/RewardPannel'
import styles from './index.module.less'

const Detail = () => {
  const [owner, setOwner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionTaskInstance, setActionTaskInstance] = useState(null)
  const [actionTaskStatus, setActionTaskStatus] = useState(null)
  const [cpaTaskInstance, setCpaTaskInstance] = useState(null)
  const [projectTaskDTO, setProjectTaskDTO] = useState(null)
  const [isSecurity, setIsSecurity] = useState(false)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { address } = useAccount()
  const id = params.get('id')
  const shareId = params.get('shareId')

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(() => {}, [])

  // 查询广告主详情
  const queryProjectOwner = async () => {
    const { accountAddress } = projectTaskDTO
    if (accountAddress) {
      const ret = await request({
        api: 'api/project/queryProject',
        params: { address: accountAddress }
      })
      if (ret && ret.result) {
        setOwner(ret.result)
      }
    }
  }

  // 查询任务详情
  const queryProjectTaskStatus = async () => {
    const ret = await request({
      api: 'api/taskInstance/queryProjectTaskStatus',
      params: {
        address,
        projectTaskId: id
      }
    })
    if (ret && ret.result && ret.result.projectTaskDTO) {
      const { actionTaskInstances, actionTaskStatus, cpaTaskInstance, projectTaskDTO } = ret.result

      setActionTaskInstance(actionTaskInstances)
      setActionTaskStatus(actionTaskStatus)
      setCpaTaskInstance(cpaTaskInstance)
      setProjectTaskDTO(projectTaskDTO)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (owner) {
      window
        .fetch(
          `https://api.gopluslabs.io/api/v1/dapp_security?url=https://${owner.officialWebsite}`
        )
        .then((ret) => ret.json())
        .then(() => setIsSecurity(true))
      const das = new Das({
        url: 'https://indexer-v1.did.id'
      })
      das.records(owner.accountAddress).then(console.log).catch(console.warn)
    }
  }, [owner])

  useEffect(() => {
    if (projectTaskDTO && projectTaskDTO.accountAddress && !owner) {
      queryProjectOwner()
    }
  }, [projectTaskDTO])

  useEffect(() => {
    queryProjectTaskStatus()
  }, [address])

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
    <Observer
      onChange={() => {
        window.dataLayer.push({
          event: 'lp-homepage-expose',
          address: address || '',
          projectId: id
        })
      }}
    >
      <div className={styles.page} id="detail-homepage">
        <header className={styles.header}>
          <Observer
            onChange={() => {
              window.dataLayer.push({
                event: 'lp-homelogo-expose',
                address: address || '',
                projectId: id
              })
            }}
          >
            <img
              className={styles.logo}
              src="https://db35z3hw6fbxp.cloudfront.net/Group+789.png"
              onClick={() => {
                window.dataLayer.push({
                  event: 'lp-homelogo-clk',
                  addrss: address || '',
                  projectId: id
                })
                navigate('/')
              }}
            />
          </Observer>
          <div className={styles.right}>
            <div id="detail-connect-button">
              <ConnectButton />
            </div>
            {!isMobile ? (
              <div
                id="detail-create-adventure-button"
                className={styles.create}
                onClick={() => navigate('/backend/create')}
              >
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
                owner={owner}
                data={projectTaskDTO}
                taskInstance={actionTaskInstance}
                projectTaskId={id}
                shareId={shareId}
                isSecurity={isSecurity}
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
    </Observer>
  )
}

export default Detail
