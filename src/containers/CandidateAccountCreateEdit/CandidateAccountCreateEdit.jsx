import { useForm } from 'react-hook-form';

import { Col, Row } from 'antd';

import DataSidePreview from 'components/DataSidePreview';
import CandidateAccountForm from 'components/Form/CandidateAccountForm';
import FormHeader from 'components/FormHeader/index';
import SettingsIcon from 'components/Icons/SettingsIcon';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogin } from 'Store/modules/Auth';
import { useDispatch } from 'react-redux';
import { setToastStatus } from 'Store/modules/AlertToast';

export default function CandidateAccountCreateEdit() {
  const methods = useForm({
    mode: 'onSubmit',
  });
  const { handleSubmit, control, setValue, watch } = methods;
  const [candidateProfile, setCandidateProfile] = useState();
  const { accountid } = useParams();
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
    if (accountid !== undefined) {
      fetch(
        `http://localhost:3001/adminUmat/getAccountCandidate/${accountid}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setCandidateProfile(data.data);
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
          navigate('/candidateaccount');
        });
    }
  }, []);

  useEffect(() => {
    if (candidateProfile !== undefined) {
      setValue('username', candidateProfile.username);
      setValue('email', candidateProfile.email);
    }
  }, [candidateProfile]);

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
  ];

  const onSubmit = async (data) => {
    if (data.username === '' || data.username === undefined) {
      dispatch(setToastStatus({ value: 0, mess: 'Mời nhập tên người dùng!' }));
      return false;
    }
    if (data.email === '' || data.email === undefined) {
      setToastStatus({ value: 0, mess: 'Mời nhập tên người dùng!' });
      return false;
    }
    let url =
      accountid === undefined
        ? `http://localhost:3001/adminUmat/candidateaccountcreate`
        : `http://localhost:3001/adminUmat/candidateaccountedit/${accountid}`;
    console.log(url);
    await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setCandidateProfile(data.data);
          if (accountid === undefined) {
            dispatch(
              setToastStatus({ value: 1, mess: 'Tạo tài khoản thành công !' })
            );
          } else if (accountid !== undefined) {
            dispatch(
              setToastStatus({
                value: 1,
                mess: 'Cập nhật tài khoản thành công !',
              })
            );
          }
          navigate('/candidateaccount');
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
        navigate('/candidateaccount');
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        title={'Thông tin tài khoản ứng viên'}
        icon={<SettingsIcon width={'30'} height={'30'} type={'lg'} />}
      />
      <Row wrap={false}>
        <Col flex="auto">
          <CandidateAccountForm control={control} />
        </Col>
        <DataSidePreview
          data={dataPreview}
          control={control}
          title={'Xem nhanh nội dung'}
          submitButtonTitle={'Lưu'}
          isEdit={false}
          onCancel={onCancel}
        />
      </Row>
    </form>
  );
}
