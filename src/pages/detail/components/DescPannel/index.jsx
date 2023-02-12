import styles from './index.module.less'

export default ({ data = {} }) => {
  return (
    <div className={styles.module}>
      <div className={styles.title}>Description</div>
      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{
          __html: data.desc || ''
        }}
      />
    </div>
  )
}
