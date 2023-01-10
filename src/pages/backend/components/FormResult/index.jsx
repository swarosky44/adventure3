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
            <a style={{ color: '#fff' }}>访问 PC 页面</a>
          </Button>,
          <Popover
            key="qrcode"
            overlayInnerStyle={{ padding: 0 }}
            content={
              <QRCode
                errorLevel="H"
                value="https://ant.design/"
                icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
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
