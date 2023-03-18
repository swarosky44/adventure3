import styles from './index.module.less'

export default ({ data = {} }) => {
  return (
    <div className={styles.module}>
      <div className={styles.title}>Description</div>
      {data.activityImg ? (
        <img src={`https://db35z3hw6fbxp.cloudfront.net/${data.activityImg}`} />
      ) : null}
      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{
          __html: data.desc || ''
        }}
      />
    </div>
  )
}
