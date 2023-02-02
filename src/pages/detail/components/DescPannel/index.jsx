import styles from './index.module.less'

export default () => {
  return (
    <div className={styles.module}>
      <div className={styles.title}>Description</div>
      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{
          __html:
            '<img src="https://db35z3hw6fbxp.cloudfront.net/mock.png"></img><p>description description description description description description description description description description description description description description description description description description description description description description </p><p>description description description description description description description description description description description description description description description description description description description description description description </p>'
        }}
      />
    </div>
  )
}
