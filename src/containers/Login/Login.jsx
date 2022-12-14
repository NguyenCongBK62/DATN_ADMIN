import { Button, Card, Form, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { setToastStatus } from 'Store/modules/AlertToast';
import bg from '../../assets/bg.svg';
import loginCover from '../../assets/login-cover.svg';
import './Login.less';

export default function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toastStatus = useSelector((state) => state.ToastStatus.toastStatus);
  console.log(toastStatus);
  useEffect(() => {
    if (toastStatus !== null) {
      if (toastStatus.value !== 0) {
        toast.success(toastStatus.mess);
      } else if (toastStatus.value === 0) {
        toast.error(toastStatus.mess);
      }
    }
  }, [toastStatus]);
  const login = async (data) => {
    await fetch('http://localhost:3001/adminumat/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 401) {
          const error = new Error('Tài khoản sai email hoặc mật khẩu !');
          error.statusCode = 303;
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          localStorage.setItem('Authorization', data.Authorization);
          localStorage.setItem('email', data.email);
          localStorage.setItem('username', data.username);
          dispatch(setToastStatus({ value: 1, mess: 'Đăng nhập thành công!' }));
          navigate('/companyaccount');
        } else if (data.status === 'fail') {
          dispatch(setToastStatus({ value: 1, mess: data.message }));
        }
      })
      .catch((err) => {
        dispatch(setToastStatus({ value: 0, mess: err.message }));
      });
  };

  const onFinish = (values) => {
    setIsLoading(true);
    login(values);
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Spin tip="Đang xử lí" size="large" spinning={isLoading}>
      <div
        className={'main'}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
          marginTop: -110,
        }}
      >
        <Card
          className={'login-card'}
          cover={
            <img alt="example" src={loginCover} width="345px" height="118px" />
          }
        >
          <Form
            name="normal_login"
            className="login-form"
            layout={'vertical'}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tên đăng nhập"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập tên đăng nhập' },
              ]}
            >
              <Input
                placeholder="Vui lòng nhập tên đăng nhập"
                className={'login-input'}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input
                type="password"
                placeholder="Vui lòng nhập mật khẩu"
                className={'login-input'}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button login-btn"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Spin>
  );
}
