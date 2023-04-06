import { Button, Result, QRCode, Popover } from 'antd'
import { useNavigate } from 'react-router'

const FormResult = ({ data = {}, setCurrent = () => {} }) => {
  const { result } = data
  const navigate = useNavigate()
  const id = result || '140'

  return (
    <div className="comp">
      <Result
        status="success"
        title="创建任务成功"
        subTitle="已生成活动页面，访问方式如下"
        extra={[
          <Button type="primary" key="link">
            <a style={{ color: '#fff' }} onClick={() => navigate(`/detail?id=${id}`)}>
              访问 PC 页面
            </a>
          </Button>,
          <Popover
            key="qrcode"
            overlayInnerStyle={{ padding: 0 }}
            content={
              <QRCode
                errorLevel="H"
                value={`https://www.adventure3.tk/detail?id=${id}`}
                icon="https://db35z3hw6fbxp.cloudfront.net/Group+789.png"
              />
            }
          >
            <Button type="primary">扫码访问移动端</Button>
          </Popover>,
          <Button key="back" onClick={() => setCurrent(0)}>
            重新创建
          </Button>,
          <Button key="detail">
            <a style={{ color: '#333' }} onClick={() => navigate(`/backend/detail?id=${id}`)}>
              任务详情
            </a>
          </Button>
        ]}
      />
    </div>
  )
}

export default FormResult
