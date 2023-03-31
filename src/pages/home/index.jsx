import Slider from 'react-slick'
import styles from './index.module.less'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Home = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img
              className={styles.logoImage}
              src="https://db35z3hw6fbxp.cloudfront.net/Group+789.png"
            />
            <span className={styles.logoText}>AD3</span>
          </div>
          <div className={styles.main}>
            <p>The Ultimate Web3</p>
            <p>Marketing Solution</p>
          </div>
          <div className={styles.sub}>
            <p>Connect billions of Web3 users</p>
            <p>to millions of Web3 brands</p>
          </div>
          <div className={styles.nav}>
            <a className={styles.navItem}>Home</a>
            <a className={styles.navItem}>Whitepaper</a>
            <a className={styles.hoverItem}>Launch App</a>
          </div>
          <div className={styles.book}>
            <img
              className={styles.bookIcon}
              src="https://db35z3hw6fbxp.cloudfront.net/Group+766.png"
            />
            <div className={styles.bookBtn}>Book a Demo</div>
          </div>
        </div>
      </header>
      <section className={styles.banner}>
        <img
          className={styles.bannerImage}
          src="https://db35z3hw6fbxp.cloudfront.net/Group+811.png"
        />
        <div className={styles.content}>
          <h2>Degen Paradise</h2>
          <p>World&apos;s First Community-Driven Marketing Protocol</p>
          <p>Increase FOMO and Engagement within Your Community</p>
        </div>
      </section>
      <section className={styles.tech}>
        <h1 className={styles.title}>
          <img
            className={styles.titleIcon}
            src="https://db35z3hw6fbxp.cloudfront.net/Group+766.png"
          />
          How to use our product
        </h1>
        <div className={styles.nav}>
          <a className={styles.navItem}>Create a Task</a>
          <a className={styles.navItem}>Distribute a Task</a>
          <a className={styles.navItem}>Track growth</a>
        </div>
        <div className={styles.navLine} />
        <div className={styles.slide}>
          <Slider touchMove={false} autoplay={false} dots={false} fade={true} arrows={false}>
            <div>
              <div className={styles.panel}>
                <div className={styles.info}>
                  <p className={styles.title}>Specialize in developing</p>
                  <p className={styles.title}>marketing tasks</p>
                  <p className={styles.sub}>Create a marketing campaign with different task</p>
                  <p className={styles.sub}>templates quickly base on your marketing goals.</p>
                </div>
                <img
                  className={styles.icon}
                  src="https://db35z3hw6fbxp.cloudfront.net/Group+770.png"
                />
              </div>
            </div>
            <div>
              <div className={styles.panel}>
                <div className={styles.info}>
                  <p>Specialize in developing</p>
                  <p>marketing tasks</p>
                  <p>Create a marketing campaign with different task</p>
                  <p>templates quickly base on your marketing goals.</p>
                </div>
                <img
                  className={styles.icon}
                  src="https://db35z3hw6fbxp.cloudfront.net/Group+781.png"
                />
              </div>
            </div>
            <div>
              <div className={styles.panel}>
                <div className={styles.info}>
                  <p>Specialize in developing</p>
                  <p>marketing tasks</p>
                  <p>Create a marketing campaign with different task</p>
                  <p>templates quickly base on your marketing goals.</p>
                </div>
                <img
                  className={styles.icon}
                  src="https://db35z3hw6fbxp.cloudfront.net/Group+762.png"
                />
              </div>
            </div>
          </Slider>
        </div>
      </section>
      <section className={styles.task}>
        <div className={styles.title}>
          <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/Group+767.png" />
          <h2 className={styles.text}>Select Your Task model</h2>
        </div>
        <div className={styles.tasks}>
          <div className={styles.taskItem}>
            <img className={styles.dog} src="https://db35z3hw6fbxp.cloudfront.net/Frame+793.png" />
            <div className={styles.content}>
              <img
                className={styles.number}
                src="https://db35z3hw6fbxp.cloudfront.net/Group+809.png"
              />
              <div className={styles.info}>
                <h3 className={styles.taskName}>Affiliate</h3>
                <ul className={styles.tips}>
                  <li className={styles.tip}>Complete any task that assigned by brand campaigns</li>
                  <li className={styles.tip}>Invite your friends through the link </li>
                  <li className={styles.tip}>
                    <span style={{ color: 'rgba(195, 255, 103, 1)' }}>
                      Earn rewards and commissions
                    </span>{' '}
                    once they complete the tasks.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tasks}>
          <div className={styles.taskItem}>
            <img
              className={styles.dog}
              src="https://db35z3hw6fbxp.cloudfront.net/Frame+793-1.png"
            />
            <div className={styles.content}>
              <img
                className={styles.number}
                src="https://db35z3hw6fbxp.cloudfront.net/Group+810.png"
              />
              <div className={styles.info}>
                <h3 className={styles.taskName}>Competition</h3>
                <ul className={styles.tips}>
                  <li className={styles.tip}>
                    Buy an NFT ticket to either join an existing team or create your own team.
                  </li>
                  <li className={styles.tip}>
                    Complete assigned tasks to compete with other teams.{' '}
                  </li>
                  <li className={styles.tip}>
                    Earn rewards based on your{' '}
                    <span style={{ color: 'rgba(195, 255, 103, 1)' }}>team&apos;s ranking</span> in
                    the competition pool.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.desc}>
        <img className={styles.yun} src="https://db35z3hw6fbxp.cloudfront.net/Vector.png" />
        <p className={styles.process}>
          <span>Create</span>
          <img className={styles.arrow} src="https://db35z3hw6fbxp.cloudfront.net/Group+790.png" />
          <span>Distribution</span>
          <img className={styles.arrow} src="https://db35z3hw6fbxp.cloudfront.net/Group+790.png" />
          <span>Analysis</span>
        </p>
        <p>AD3 make it simple to grow your brand in Web3.</p>
      </section>
      <section className={styles.contract}>
        <img className={styles.brands} src="https://db35z3hw6fbxp.cloudfront.net/Group+796.png" />
        <div className={styles.panel}>
          <div className={styles.title}>
            <p>Ready to</p>
            <p>get it</p>
            <p>started?</p>
          </div>
          <div className={styles.content}>
            <p>
              Explore <a>Whitepaper</a> or
            </p>
            <p>
              {' '}
              join our <a>community</a>
              <img src="https://db35z3hw6fbxp.cloudfront.net/Group+796-1.png" />
            </p>
            <p>
              You can also contact us to <a>become our Partner</a>
              <img src="https://db35z3hw6fbxp.cloudfront.net/Group+797.png" />
            </p>
          </div>
          <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/Group+767.png" />
          <div className={styles.book}>Book a Demo</div>
        </div>
      </section>
      <section className={styles.bottom}>
        <div className={styles.line} />
        <p>Copyright © 2023 • AD3</p>
      </section>
    </div>
  )
}

export default Home
