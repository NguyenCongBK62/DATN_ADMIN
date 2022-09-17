import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Tag } from 'antd';
import 'containers/CompanyAccountManager/CompanyAccountManager.less';
import { useState } from 'react';

import EditIcon from 'components/Icons/EditIcon';
import FileTextIcon from 'components/Icons/FileTextIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToastStatus } from 'Store/modules/AlertToast';
import FormHeader from 'components/FormHeader';
import Table from 'components/Table/Table';
import { getIsLogin } from 'Store/modules/Auth';
import HomeIcon from 'components/Icons/HomeIcon';

const { confirm } = Modal;

export default function CompanyAccountManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [fullDataSource, setFullDataSource] = useState([]);
  const selector = useSelector;
  const isLogin = selector(getIsLogin);
  useEffect(() => {
    if (!isLogin) navigate('/login', { replace: false });
  }, [isLogin]);
  const customStyles = {
    cursor: 'pointer',
  };

  const editItem = (val) => {
    navigate(`/companyaccountedit/${val}`, { replace: false });
  };

  const getAccountData = async () => {
    let accounts = await fetch(
      'http://localhost:3001/adminUmat/getAccountCompanyList',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });
    console.log(accounts);
    await setDataSource(accounts);
    setFullDataSource(accounts);
  };

  const columns = [
    {
      title: 'Mã doanh nghiệp',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 180,
    },
    {
      title: 'Chỉnh sửa',
      dataIndex: 'edit',
      width: 70,
      render: function renderEditIcon(_, record) {
        return dataSource.length >= 1 ? (
          <div onClick={() => editItem(record.id)} style={customStyles}>
            <EditIcon customeStyles={customStyles} />
          </div>
        ) : null;
      },
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      width: 70,
      render: function renderDeleteIcon(_, record) {
        return dataSource.length >= 1 ? (
          <div
            onClick={() => showDeleteConfirm(record.id)}
            style={customStyles}
          >
            <TrashIcon customeStyles={customStyles} />
          </div>
        ) : null;
      },
    },
  ];

  useEffect(() => {
    getAccountData();
  }, []);

  const deleteData = async (id) => {
    let jobs = await fetch(
      `http://localhost:3001/adminumat/deleteaccount/${id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          dispatch(
            setToastStatus({ value: 1, mess: 'Xóa thành công bản ghi !' })
          );
        } else {
          if (data.status === 'fail') {
            const error = new Error(data.message);
            error.statusCode = 303;
            throw error;
          }
        }
        return data.data;
      })
      .catch((err) => {
        dispatch(
          setToastStatus({ value: 0, mess: 'Xoá bản ghi không thành công !' })
        );
      });
    await setDataSource(jobs);
    await setFullDataSource(jobs);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: 'Xác nhận',
      content: 'Bạn có muốn xóa bản ghi này không？',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      onOk() {
        deleteData(id);
      },
      onCancel() {},
    });
  };

  const handleDataSource = (newData) => {
    setDataSource(newData);
  };

  const addNew = () => {
    navigate('/companyaccount/createedit');
  };

  return (
    <div className="list-container">
      <Row style={{ marginBottom: '6.17px' }}>
        <FormHeader
          title={'Danh sách nhà tuyển dụng'}
          icon={<HomeIcon width="28" height="28" />}
        />
      </Row>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: '20px' }}
      >
        <Col span={24}>
          <Table
            data={dataSource}
            columns={columns}
            handleDataSource={handleDataSource}
            fullDataSource={fullDataSource}
            emptyText={'Không có bản ghi nào'}
            placeholder={'Tìm kiếm theo từ khóa'}
            scrollX={800}
            scrollY={886}
            totalItems={dataSource.length}
            addNew={addNew}
          />
        </Col>
      </Row>
    </div>
  );
}
