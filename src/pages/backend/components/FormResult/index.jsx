import { Button, Result, QRCode, Popover } from 'antd'

const FormResult = ({ data = null }) => {
  const { result } = data
  console.info(result)
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
            <Button>扫码访问移动端</Button>
          </Popover>
        ]}
      />
    </div>
  )
}

export default FormResult
