import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const QuillEditor = ({ value = '', onChange = () => {} }) => {
  const uploadFn = (param) => {
    const serverURL = 'https://ad3.app/api/file/upload'
    const xhr = new XMLHttpRequest()
    const fd = new FormData()

    const successFn = () => {
      const { result } = xhr.response
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: `https://db35z3hw6fbxp.cloudfront.net/${result}`
      })
    }

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress((event.loaded / event.total) * 100)
    }

    const errorFn = () => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }

    xhr.responseType = 'json'
    xhr.upload.addEventListener('progress', progressFn, false)
    xhr.addEventListener('load', successFn, false)
    xhr.addEventListener('error', errorFn, false)
    xhr.addEventListener('abort', errorFn, false)

    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }

  return (
    <div style={{ width: '800px', border: '1px solid #ccc' }}>
      <BraftEditor
        value={value}
        onChange={onChange}
        media={{
          accepts: {
            image: true,
            video: false,
            audio: false
          },
          externals: {
            video: false,
            audio: false
          },
          uploadFn
        }}
        accepts="image/*"
      />
    </div>
  )
}

export default QuillEditor
