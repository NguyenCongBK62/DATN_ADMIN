import { useForm } from 'react-hook-form';

import { Col, Row } from 'antd';

import DataSidePreview from 'components/DataSidePreview';
import CompanyAccountForm from 'components/Form/CompanyAccountForm';
import FormHeader from 'components/FormHeader/index';
import SettingsIcon from 'components/Icons/SettingsIcon';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogin } from 'Store/modules/Auth';
import { setToastStatus } from 'Store/modules/AlertToast';

export default function CompanyAccountCreateEdit() {
  const methods = useForm({
    mode: 'onSubmit',
  });
  const { handleSubmit, control, setValue, watch } = methods;
  const [companyProfile, setCompanyProfile] = useState();
  const { companyid } = useParams();
  const selector = useSelector;
  const isLogin = selector(getIsLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (!isLogin) navigate('/login', { replace: false });
  }, [isLogin]);
  useEffect(() => {
    if (companyid !== undefined) {
      fetch(`http://localhost:3001/adminUmat/getAccountCompany/${companyid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setCompanyProfile(data.data);
          } else {
            if (data.status === 'fail') {
              const error = new Error(data.message);
              error.statusCode = 303;
              throw error;
            }
          }
        })
        .catch((err) => {
          dispatch(setToastStatus({ value: 0, mess: err.message }));
          navigate('/companyaccount');
        });
    }
  }, []);

  useEffect(() => {
    if (companyProfile !== undefined) {
      setValue('username', companyProfile.username);
      setValue('email', companyProfile.email);
      setValue('name', companyProfile.name);
      setValue('address', companyProfile.address);
      setValue('field', companyProfile.field);
      setValue('description', companyProfile.description);
      setValue('memberquantity', companyProfile.memberquantity);
      setValue('worktimestart', companyProfile.worktimestart);
      setValue('worktimeend', companyProfile.worktimeend);
      setValue('slogan', companyProfile.slogan);
      setValue('logo', companyProfile.logo);
      setValue('timeot', companyProfile.timeot);
    }
  }, [companyProfile]);

  const dataPreview = [
    {
      heading: 'Thông tin tài khoản',
      items: [
        {
          label: 'Tên tài khoản',
          value: (watcher) => {
            const v = watcher.username ? `${watcher.username}` : '';
            return v || '';
          },
        },
        {
          label: 'Email công ty',
          value: (watcher) => {
            const v = watcher.email ? `${watcher.email}` : '';
            return v || '';
          },
        },
      ],
    },
    {
      heading: 'Hồ sơ công ty',
      items: [
        {
          label: 'Tên công ty',
          value: (watcher) => {
            const v = watcher.name ? `${watcher.name}` : '';
            return v || '';
          },
        },
        {
          label: 'Địa chỉ',
          value: (watcher) => {
            const v = watcher.address ? `${watcher.address}` : '';
            return v || '';
          },
        },
        {
          label: 'Số nhân viên',
          value: (watcher) => {
            const v = watcher.memberquantity ? `${watcher.memberquantity}` : '';
            return v || '';
          },
        },
        {
          label: 'Lĩnh vực',
          value: (watcher) => {
            const v = watcher.field ? `${watcher.field}` : '';
            return v || '';
          },
        },
        {
          label: 'Thời gian làm việc',
          value: (watcher) => {
            const v =
              watcher.worktimestart && watcher.worktimeend
                ? `${watcher.worktimestart} ~ ${watcher.worktimeend}`
                : '';
            return v || '';
          },
        },
        {
          label: 'Thời gian OT',
          value: (watcher) => {
            const v = watcher.timeot ? `${watcher.timeot}` : '';
            return v || '';
          },
        },
        {
          label: 'Thông điệp',
          value: (watcher) => {
            const v = watcher.slogan ? `${watcher.slogan}` : '';
            return v || '';
          },
        },
        {
          label: 'Ảnh đại diện',
          value: (watcher) => {
            const v = watcher.logo ? `${watcher.logo}` : '';
            return v || '';
          },
        },
        {
          label: 'Giới thiệu công ty',
          value: (watcher) => {
            const v = watcher.desciption ? `đã nhập` : 'chưa nhập';
            return v || '';
          },
        },
      ],
    },
  ];

  const onSubmit = async (data) => {
    if (data.username === '' || data.username === undefined) {
      dispatch(setToastStatus({ value: 0, mess: 'Mời nhập tên người dùng!' }));
      return false;
    }
    if (data.email === '' || data.email === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'Mời nhập email người dùng!' })
      );
      return false;
    }
    if (data.name === '' || data.name === undefined) {
      dispatch(setToastStatus({ value: 0, mess: 'Mời nhập tên công ty!' }));
      return false;
    }
    if (data.address === '' || data.address === undefined) {
      dispatch(setToastStatus({ value: 0, mess: 'Mời nhập địa chỉ công ty!' }));
      return false;
    }
    if (data.memberquantity === '' || data.memberquantity === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'Mời nhập số nhân viên của công ty!' })
      );
      return false;
    }
    if (data.field === '' || data.field === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'Mời nhập lĩnh vực công ty!' })
      );
      return false;
    }
    if (data.worktimestart === '' || data.worktimestart === undefined) {
      dispatch(
        setToastStatus({
          value: 0,
          mess: 'Mời nhập thời gian bắt đầu làm trong tuần của công ty!',
        })
      );
      return false;
    }
    if (data.worktimeend === '' || data.worktimeend === undefined) {
      dispatch(
        setToastStatus({
          value: 0,
          mess: 'Mời nhập thời gian kết thúc làm trong tuần của công ty!',
        })
      );
      return false;
    }
    if (data.timeot === '' || data.timeot === undefined) {
      dispatch(
        setToastStatus({
          value: 0,
          mess: 'Mời nhập thời gian làm thêm tối đa trong tháng của công ty!',
        })
      );
      return false;
    }
    if (data.logo === '' || data.logo === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'Mời nhập ảnh đại diện của công ty!' })
      );
      return false;
    }
    if (data.slogan === '' || data.logo === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'Mời nhập slogan của công ty!' })
      );
      return false;
    }
    if (data.desciption === '' || data.logo === undefined) {
      dispatch(
        setToastStatus({
          value: 0,
          mess: 'Mời mô tả ngắn về công ty!',
        })
      );
      return false;
    }
    let url =
      companyid === undefined
        ? `http://localhost:3001/adminUmat/companyaccountcreate`
        : `http://localhost:3001/adminUmat/companyaccountedit/${companyid}`;
    await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setCompanyProfile(data.data);
          dispatch(
            setToastStatus({
              value: 1,
              mess: 'Cập nhật tài khoản thành công!',
            })
          );
          navigate('/companyaccount');
        } else {
          if (data.status === 'fail') {
            const error = new Error(data.message);
            error.statusCode = 303;
            throw error;
          }
        }
      })
      .catch((err) => {
        dispatch(setToastStatus({ value: 0, mess: err.message }));
        navigate('/companyaccount');
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        title={'Thông tin tài khoản nhà tuyển dụng'}
        icon={<SettingsIcon width={'30'} height={'30'} type={'lg'} />}
      />
      <Row wrap={false}>
        <Col flex="auto">
          <CompanyAccountForm control={control} />
        </Col>
        <DataSidePreview
          data={dataPreview}
          onCancel={onCancel}
          control={control}
          title={'Xem nhanh nội dung'}
          submitButtonTitle={'Lưu'}
          isEdit={false}
        />
      </Row>
    </form>
  );
}
