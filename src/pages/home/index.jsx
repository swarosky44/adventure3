import Header from './components/header'
import Banner from './components/banner'
import ScrollCarousel from './components/scrollCarousel'
import Task from './components/task'
import Desc from './components/desc'
import Contract from './components/contract'
import styles from './index.module.less'

const Home = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Banner />
      <ScrollCarousel />
      <Task />
      <Desc />
      <Contract />
      <section className={styles.bottom}>
        <div className={styles.line} />
        <p>Copyright © 2023 • AD3</p>
      </section>
    </div>
  )
}

export default Home
