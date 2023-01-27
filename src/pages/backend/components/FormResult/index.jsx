import { Button, Result, QRCode, Popover } from 'antd'

const FormResult = ({ data = null, setCurrent = () => {} }) => {
  const { result } = data

  return (
    <div className="comp">
      <Result
        status="success"
        title="创建任务成功"
        subTitle="已生成活动页面，访问方式如下"
        extra={[
          <Button type="primary" key="link">
            <a
              target="_blank"
              href={`https://www.adventure3.tk/detail?id=${result}`}
              style={{ color: '#fff' }}
            >
              访问 PC 页面
            </a>
          </Button>,
          <Popover
            key="qrcode"
            overlayInnerStyle={{ padding: 0 }}
            content={
              <QRCode
                errorLevel="H"
                value={`https://www.adventure3.tk/detail?id=${result}`}
                icon="https://db35z3hw6fbxp.cloudfront.net/ad3_logo.png"
              />
            }
          >
            <Button type="primary">扫码访问移动端</Button>
          </Popover>,
          <Button key="back" onClick={() => setCurrent(0)}>
            重新创建
          </Button>
        ]}
      />
    </div>
  )
}

export default FormResult
