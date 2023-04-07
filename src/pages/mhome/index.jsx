import styles from './index.module.less'

export default () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.menu}>
          <img className={styles.menuIcon} src="https://db35z3hw6fbxp.cloudfront.net/menu.png" />
        </div>
      </header>
      <section className={styles.top}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img
              className={styles.logoImage}
              src="data:image/png;base64,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"
            />
          </div>
          <div className={styles.title}>
            <p>The Ultimate Web3</p>
            <p>Marketing Solution</p>
            <div className={styles.sub}>
              <img
                className={styles.subIcon}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAjnSURBVHgB7Z3tldM6EIZnOfyHWwG+FbC3AtQBdEA6IB1sOgAq2KWCXSqIqWBDBTEV7FLBXCuaiSaKvXYcf2gUP+cYhWSTyH4980qKLV1BAiDi27K4LreMyjf0OKM/eUtbSFFuz2L7TeXGbldXV8+gnCtQSCmoASfkB/DCDkEBTuxf4ATPQRkqBKYIXZTbR3CChtFoI60AJ8Yfeszb7vWqaCw/NwMf3Rlt78Bngqrvycvtpy3LzywgcqIVOBDVBC/vowoGPNBlHTg7GPDZQpKX2w9QInYU2PRbbnfl9oQe+3hdbgsSfqq6ZVSHezzmlqxjpgoSdh0ctMlFrcPWieoW1vnRPg8zDhJ2G0TrKkZR66DIvgv2Y3vRQldErD0gS03CVkFRHQpt4FKgs32d+pleIfQtulZ7upQ7+AV940ldKu4C7aPc5xtIjYqovU/+bBYIj5ZZK4MUCKL2svwoIEjb9pgsQSvouhFfxVl7l3o6bkNFNH8FbdBObJI4UwcCXY/hSV3KLit6LdKQnopPAAWCnmNVVvCTOCvXc0puJmiA2mP3CWKkrNhn4SvfYOYk7DETx+8zxEQg7gpmOoGuzxyXyLO4/RKVyOS5s7g9E4g8jSdT4+BJo7ioYLBFiGyP8TWMSdC8V9egKuucgwJEw8se6wzGQoi7BmWg66dbVHTh0HehHkepM/rhx3HPqp5AN4I0nbedCLohXw6oYYc10f1wwL6QgULKej9os5agvTPMsO8oXzICYh8eQREi8wwTXCJN3IJShP+iJh9m0P8K1W/bp/zAG82+y4goQE0+zAR+3E8WDVLzAhQj/Be1+TCD7mLF/lK1SAtqUzODhxfTq/NhBv2F9+el6t7Plgmp8F+VPmwJsqqBroh8vwLlVPivSh9m0A9ldotidBeIWbaQABX+y6j87RoPG1wGTkW8eQEJgMf+y6j0YUvnIMT0orfOfxm1lxZ1imJ0A9spRe+yQWCVPmwR+9bOi9G3nJOIXgvW+y+j9hoydF5c26J+VfGeBZU5pMOHhtffg1Joaorv9N+XL/FB179iMkgAbPZfRrMPv6V9eAr3I4xgQ2VKc06Yln837mUxPUJRnIObNGYhXwsF5hD/AelgWv6d2oYWwZp9rHw1SM/J3JGA9f3fEHWXH0mCxtZePxnBhsqfKczwZkF3NWLbk9VoPrFJsw39d8HPS4E5RT1AOhg4DbU+TNSnaRHeGSQCNvd/Q1TfU4WiNR2+wIMbasdlq8D2/puED1vQj0Ia+39O0ZyafkEinOi/jGofJljDnaYssKEyh3Qw0A3tPswNLWP/YYF5qK6AdDDQDe394ZxKp2mtMSung/+m5MP7/rCNYE5JG0iEjv7LpODDBZXXUuAC0sHAeWj34d9UZlZgPlv/QDoYOA/tPlxQmV4EU3pu+v23CbW/DxMFlW9eg1uhRD6pChLUgBPVln34p6FBH9unzMH9fKppfL6gMruiHbEH6b9yJ6JvaA0kaBt4nYgcIhcc3XCzveSqsALbB/aJf2P8kX9CQZuQgm9iOnahwGifLCsYxQosEQvaxIY2u+TOpIJTN8+OazxPLrBiQZuYVPC9rmMLnLCgTYwq+GgCX7CgTQwq+GACz4J2plfBpcDWjK0I/5zT9CdjX4JfX3CmG3wJ7PdzFsOUAvfeTSKxDdSv+TfjYUF3Xa4+xiJkN+k1DABlggfaZsEP6V3QCtgWn63ABfilVQsYgAsXfAxBQw4E5l+RMhiJxAWfQtCQjMq/r6lC8snRUS54DIKGZFRurMBcoXcQCZELHqOgIRmVew+2RBslEwuuQdAQDtZNEhfd0T7Y5QXsBNqPeD67xbxw7JnWewLDm9DQT+SRQQLg4bKuXXgApaC/4X03BQdfF80XaRlIg59wHjnoJaNypykLnFOZSn/0XJ/MQS+Gynz/DCZ28xn6dkUXVN8AgMHNZ/KFo7vDNYPdfViz/2bhSfpKvM5p7ROkQVcfzkEvhsr9XaJSYD4gL8+1pIeuPpyDXjg4j7MQvjDXkkawmw9rHwtgMn5+H8HBXEvq0zTtTwGnofkGeNbsYI6zV8EfpZamT/XhHPTSPMcZ1sy1pBX00yK3RevQZPspKNEvwrEC5eBpPqzZf9svnIKHC3GkEMXblgJr7v/yPpq2b1jTG5agHPRLtDahcl/R21D7UUhMaFJwbO/DWv13S/VfnPK+7m+MDGznwyr9F89ZW0NGMSr3Ymz2YZX+e3YQovfiFSgGm31Ynf+iWDAUuoKJLG2HzT6syn+xr6Xt6MPW9EH3oBR82YfV+S/2uWBor2fLhGC9D6vyX5GN+suq6BdfsgdJZYML631Yjf9SsG2p3ivoE5Gqz08LE4D1PqzGf0Vq7n98IkjVGludVT6sxn/Lun7pPTVXfMly8C8ZEDz24TUoYNTgEl5mD5YqP8ZjH44+E+Gh736DoaFU96gpApgKHzYQOejbPuMFVHBWfQUl4KEPR++/9tgKcTMYE3T3wLAv3IASxIkZdfZBPxQ5XXsH3R19qElk4cPR+q8Q1zLtBZCBr0UvsqivgQgJxF1ADGgSmXw4Sv+NUlwmEDnqhhdGOBonGlTxicuQJ3PDa42RDoZgRP13yihr0aCK+6YDPOxCbWMVOQYqjpWOcfGg4rv5LmDmAHRjy5ztNioDAQ+HBm/naN6n5FtxXL7FZBkng+4HiieRhhZwoaC7BCq9zBak7IuLZtr/e7H/6yT3v9yplYhmW6oZ4uwCpeObYJ/Tbo/Q2XwnzuZtimkb3bjANvmorSPwoySEpohdVghr4FKpONO32jy6IhXzfhiYcZDQ4TyTa3o+um4EibpAPwo1R2wbKHXf4TH3dEAzmIhAVBmtT5R1DERGFMvZVUFCGnBzT5jgZTtFEq8bWAw1xa+ogx1CrJq2OAc3D8hdrItVRiuwRBzoj1C9FpM9uFbkAtwSBQVt9vnnqtVkKO3z52Ris3MtX9Pjuu+JWlSJCoFDKBXKqMpgGArw2WJzzjpGU6FS4BCKxmva7OP3VPKWVbztGfx6FQVtf8Fngo2yRaEr+R+o82bV4tagyAAAAABJRU5ErkJggg=="
              />
              <p>Connect billions of users to millions of brands in Web3</p>
            </div>
          </div>

          <div className={styles.book}>
            <a className={styles.bookBtn}>Book a Demo</a>
          </div>
        </div>
      </section>
      <section className={styles.annoy}>
        <img
          className={styles.annoyImage}
          src="https://db35z3hw6fbxp.cloudfront.net/Group+874.png"
        />
        <img
          className={styles.icon}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAWCAYAAABKbiVHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD3SURBVHgB7ZYxCsIwFIb/1CAODh5Bb9DVQWhOIoKKY28gnsBNdOsNPEKLJ6g36BE6dChoiU9w63sRSocO+SBN6Z/X/IG8vKjU7kLAzsCiC6OuBXrCPdc01xrBmd4iTrZoNtQl6Ama607dnFcrE2BAeDMS3oyEpvZ0DUjtNmp/HZdGXXJ+fEypW4XgKX6tRUD/1Ct1i4VAPOw+oXRct5Umo4fho+pQY5Ryyhtq4Tq3/J6R8GYkBmVGucRvmk5Qt6rsC01E6zhyMbS6bAR14rTlnxuA0wxEk4dIw6aCnNFxYdABv2ckvBmJwVXtDtRUsSdsxgRoSnTkA5h7Om4hK0AVAAAAAElFTkSuQmCC"
        />
      </section>
      <section className={styles.banner}>
        <img src="https://db35z3hw6fbxp.cloudfront.net/Group+838.png" />
      </section>
      <section className={styles.tech}>
        <h2 className={styles.title}>
          <img
            className={styles.titleIcon}
            src="data:image/png;base64,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"
          />
          How to use our product
        </h2>
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Assign Tasks</h3>
          <div className={styles.line} />
          <div className={styles.content}>
            <img
              style={{ width: '40vw', height: '38.7vw', marginBottom: '11vw' }}
              src="https://db35z3hw6fbxp.cloudfront.net/Group+831.png"
            />
            <h3 style={{ margin: 0, marginBottom: '3.2vw' }}>
              <p className={styles.main}>Specialize in developing</p>
              <p className={styles.main}>marketing tasks</p>
            </h3>
            <p className={styles.sub}>Create a marketing campaign with different task</p>
            <p className={styles.sub}>templates quickly base on your marketing goals.</p>
          </div>
        </div>
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Task Collaboration</h3>
          <div className={styles.line} />
          <div className={styles.content}>
            <img
              style={{ width: '41.6vw', height: '35.2vw', marginBottom: '11vw' }}
              src="https://db35z3hw6fbxp.cloudfront.net/Group+759.png"
            />
            <h3 style={{ margin: 0, marginBottom: '3.2vw' }}>
              <p className={styles.main}>Social Media Networking</p>
            </h3>
            <p className={styles.sub}>Unleash the true power of social media networking</p>
            <p className={styles.sub}>by sharing tasks on your own social media profiles</p>
            <p className={styles.sub}>and earning greater rewards.</p>
          </div>
        </div>
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Track growth</h3>
          <div className={styles.line} />
          <div className={styles.content}>
            <img
              style={{ width: '40vw', height: '38.7vw', marginBottom: '11vw' }}
              src="https://db35z3hw6fbxp.cloudfront.net/Group+767.png"
            />
            <h3 style={{ margin: 0, marginBottom: '3.2vw' }}>
              <p className={styles.main}>Seamless tracking Services</p>
            </h3>
            <p className={styles.sub}>Monitor task performance through data analysis</p>
            <p className={styles.sub}>center.</p>
          </div>
        </div>
      </section>
      <section className={styles.task}>
        <h2 className={styles.title}>
          <img className={styles.icon} src="https://db35z3hw6fbxp.cloudfront.net/Group+767.png" />
          <p className={styles.text}>Unique Task model</p>
        </h2>
        <div className={styles.taskItem}>
          <div className={styles.content}>
            <div className={styles.taskTitle}>
              <img src="https://db35z3hw6fbxp.cloudfront.net/Group+809.png" />
              <p>Affiliate Network</p>
            </div>
            <ul className={styles.taskContent}>
              <li>Complete any task assigned by brand‘s campaigns.</li>
              <li>Invite friends to do the same using your referral link.</li>
              <li>
                <span>Earn rewards and commissions</span>once they complete tasks.
              </li>
            </ul>
            <img
              className={styles.avatar}
              src="https://db35z3hw6fbxp.cloudfront.net/Frame+793.png"
            />
          </div>
        </div>
        <div className={styles.taskItem}>
          <div className={styles.content}>
            <div className={styles.taskTitle}>
              <img src="https://db35z3hw6fbxp.cloudfront.net/Group+810.png" />
              <p>Degen Competition</p>
            </div>
            <ul className={styles.taskContent}>
              <li>Buy an NFT ticket to either join a team or create one.</li>
              <li>Complete assigned tasks to compete with other teams.</li>
              <li>
                Earn rewards based on your <span>team&apos;s ranking</span> in the pool.
              </li>
            </ul>
            <img
              className={styles.avatar}
              src="https://db35z3hw6fbxp.cloudfront.net/Frame+793-1.png"
            />
          </div>
        </div>
      </section>
      <section className={styles.partners}>
        <img style={{ width: '75vw' }} src="https://db35z3hw6fbxp.cloudfront.net/Group+850.png" />
      </section>
      <section className={styles.desc}>
        <p className={styles.title}>Assign Tasks</p>
        <img src="https://db35z3hw6fbxp.cloudfront.net/Group+1.png" />
        <p className={styles.title}>Task Collaboration</p>
        <img src="https://db35z3hw6fbxp.cloudfront.net/Group+1.png" />
        <p className={styles.title}>Track growth</p>
        <p className={styles.sub}>AD3 make it simple to grow your brand in Web3.</p>
      </section>
      <section className={styles.contract}>
        <div className={styles.content}>
          <h2 className={styles.title}>Start your AD3 Journey</h2>
          <p>
            <img src="https://db35z3hw6fbxp.cloudfront.net/Group+847.png" />
            Explore{' '}
            <a target="_blank" href="https://ad3s-organization.gitbook.io/ad3-whitepaper/">
              Whitepaper
            </a>{' '}
            or
          </p>
          <p>
            <img src="https://db35z3hw6fbxp.cloudfront.net/Group+796-1.png" />
            join our{' '}
            <a target="_blank" href="https://twitter.com/ad3_protocol">
              community
            </a>
          </p>
          <p>
            <img src="https://db35z3hw6fbxp.cloudfront.net/Group+797.png" />
            You can also
            <a target="_blank" href="https://t.me/+oD5ACHb-e7tiMDdl">
              contact us
            </a>
            to
          </p>
          <p style={{ paddingLeft: '8.6vw' }}>become our Partner</p>
          <img
            style={{
              width: '72vw',
              height: 'auto',
              marginTop: '8vw',
              marginBottom: '6vw',
              marginLeft: '-4vw'
            }}
            src="https://db35z3hw6fbxp.cloudfront.net/Group+837.png"
          />
        </div>
      </section>
      <section className={styles.bottom}>
        <div className={styles.line} />
        <p>Copyright © 2023 • AD3</p>
      </section>
    </div>
  )
}
