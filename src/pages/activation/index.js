import React, { useEffect, useState } from 'react'
import { Result, Button, Spin } from 'antd'
import authService from 'services/auth/authService'
import { Link } from 'react-router-dom'

const ActivationPage = props => {
  const email = props.match.params.email
  const code = props.match.params.code
  const [dataActivation, setDataActivation] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const _loading = () => (
    <Spin tip="Loading ...">
      <Result title="確認処理をお待ちください" />
    </Spin>
  )

  useEffect(() => {
    const activation = async () => {
      await authService
        .POST_ACTIVATION(email, code)
        .then(res => {
          if (res) {
            setDataActivation({
              status: 'success',
              message: 'ユーザーのアクティベーションは成功しました。',
            })
            setIsLoading(false)
          }
        })
        .catch(e => {
          setDataActivation({
            status: 'error',
            message: 'アカウントが有効になりました。',
          })
          setIsLoading(false)
        })
    }
    activation()
  }, [email, code])
  return (
    <div>
      {isLoading && _loading()}
      {!isLoading && (
        <Result
          status={dataActivation.status}
          title={dataActivation.message}
          extra={[
            <div key="1">
              {dataActivation.status === 'error' && (
                <p>
                  登録済みですが、アクティベーションコードを取得していませんか？{' '}
                  <Link to="/auth/resend-activation" style={{ color: '#1890ff' }}>
                    再送
                  </Link>
                </p>
              )}
            </div>,
            <Button type="primary" key="2" href="/auth/login">
              ログインページに移動
            </Button>,
          ]}
        />
      )}
    </div>
  )
}

export default ActivationPage
