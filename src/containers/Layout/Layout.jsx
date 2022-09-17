import { Layout as AntLayout, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Sidebar from 'components/Slidebar/Sidebar';
import Navbar from 'components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import bg from 'assets/bg.svg';
import 'containers/Layout/style/Layout.less';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { Content } = AntLayout;
  const toastStatus = useSelector((state) => state.ToastStatus.toastStatus);
  useEffect(() => {
    console.log(toastStatus);
    if (toastStatus !== null) {
      if (toastStatus.value !== 0) {
        toast.success(toastStatus.mess);
      } else if (toastStatus.value === 0) {
        toast.error(toastStatus.mess);
      }
    }
  }, [toastStatus]);
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className={'main'}
    >
      <Navbar />
      <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Content
        className={collapsed ? 'section section-collapsed' : 'section'}
        style={{ marginTop: '100px' }}
      >
        <Spin
          tip=""
          size="large"
          spinning={false}
          className={'full-screen-spin'}
        >
          <Outlet />
        </Spin>
      </Content>
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
    </div>
  );
}
