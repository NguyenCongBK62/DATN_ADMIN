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
      heading: 'Th??ng tin t??i kho???n',
      items: [
        {
          label: 'T??n t??i kho???n',
          value: (watcher) => {
            const v = watcher.username ? `${watcher.username}` : '';
            return v || '';
          },
        },
        {
          label: 'Email c??ng ty',
          value: (watcher) => {
            const v = watcher.email ? `${watcher.email}` : '';
            return v || '';
          },
        },
      ],
    },
    {
      heading: 'H??? s?? c??ng ty',
      items: [
        {
          label: 'T??n c??ng ty',
          value: (watcher) => {
            const v = watcher.name ? `${watcher.name}` : '';
            return v || '';
          },
        },
        {
          label: '?????a ch???',
          value: (watcher) => {
            const v = watcher.address ? `${watcher.address}` : '';
            return v || '';
          },
        },
        {
          label: 'S??? nh??n vi??n',
          value: (watcher) => {
            const v = watcher.memberquantity ? `${watcher.memberquantity}` : '';
            return v || '';
          },
        },
        {
          label: 'L??nh v???c',
          value: (watcher) => {
            const v = watcher.field ? `${watcher.field}` : '';
            return v || '';
          },
        },
        {
          label: 'Th???i gian l??m vi???c',
          value: (watcher) => {
            const v =
              watcher.worktimestart && watcher.worktimeend
                ? `${watcher.worktimestart} ~ ${watcher.worktimeend}`
                : '';
            return v || '';
          },
        },
        {
          label: 'Th???i gian OT',
          value: (watcher) => {
            const v = watcher.timeot ? `${watcher.timeot}` : '';
            return v || '';
          },
        },
        {
          label: 'Th??ng ??i???p',
          value: (watcher) => {
            const v = watcher.slogan ? `${watcher.slogan}` : '';
            return v || '';
          },
        },
        {
          label: '???nh ?????i di???n',
          value: (watcher) => {
            const v = watcher.logo ? `${watcher.logo}` : '';
            return v || '';
          },
        },
        {
          label: 'Gi???i thi???u c??ng ty',
          value: (watcher) => {
            const v = watcher.desciption ? `???? nh???p` : 'ch??a nh???p';
            return v || '';
          },
        },
      ],
    },
  ];

  const onSubmit = async (data) => {
    if (data.username === '' || data.username === undefined) {
      dispatch(setToastStatus({ value: 0, mess: 'M???i nh???p t??n ng?????i d??ng!' }));
      return false;
    }
    if (data.email === '' || data.email === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'M???i nh???p email ng?????i d??ng!' })
      );
      return false;
    }
    if (data.name === '' || data.name === undefined) {
      dispatch(setToastStatus({ value: 0, mess: 'M???i nh???p t??n c??ng ty!' }));
      return false;
    }
    if (data.address === '' || data.address === undefined) {
      dispatch(setToastStatus({ value: 0, mess: 'M???i nh???p ?????a ch??? c??ng ty!' }));
      return false;
    }
    if (data.memberquantity === '' || data.memberquantity === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'M???i nh???p s??? nh??n vi??n c???a c??ng ty!' })
      );
      return false;
    }
    if (data.field === '' || data.field === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'M???i nh???p l??nh v???c c??ng ty!' })
      );
      return false;
    }
    if (data.worktimestart === '' || data.worktimestart === undefined) {
      dispatch(
        setToastStatus({
          value: 0,
          mess: 'M???i nh???p th???i gian b???t ?????u l??m trong tu???n c???a c??ng ty!',
        })
      );
      return false;
    }
    if (data.worktimeend === '' || data.worktimeend === undefined) {
      dispatch(
        setToastStatus({
          value: 0,
          mess: 'M???i nh???p th???i gian k???t th??c l??m trong tu???n c???a c??ng ty!',
        })
      );
      return false;
    }
    if (data.timeot === '' || data.timeot === undefined) {
      dispatch(
        setToastStatus({
          value: 0,
          mess: 'M???i nh???p th???i gian l??m th??m t???i ??a trong th??ng c???a c??ng ty!',
        })
      );
      return false;
    }
    if (data.logo === '' || data.logo === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'M???i nh???p ???nh ?????i di???n c???a c??ng ty!' })
      );
      return false;
    }
    if (data.slogan === '' || data.logo === undefined) {
      dispatch(
        setToastStatus({ value: 0, mess: 'M???i nh???p slogan c???a c??ng ty!' })
      );
      return false;
    }
    if (data.desciption === '' || data.logo === undefined) {
      dispatch(
        setToastStatus({
          value: 0,
          mess: 'M???i m?? t??? ng???n v??? c??ng ty!',
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
              mess: 'C???p nh???t t??i kho???n th??nh c??ng!',
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
        title={'Th??ng tin t??i kho???n nh?? tuy???n d???ng'}
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
          title={'Xem nhanh n???i dung'}
          submitButtonTitle={'L??u'}
          isEdit={false}
        />
      </Row>
    </form>
  );
}
