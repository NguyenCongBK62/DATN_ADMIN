import { Col, Row } from 'antd';
import Label from 'components/Form/atoms/Label';
import SectionHeader from 'components/Form/atoms/SectionHeader';
import { Input } from 'components/FormControllers';
import PropTypes from 'prop-types';
import './style/index.less';

function CompanyAccountForm({ control }) {
  return (
    <div className="form-wrapper">
      <Row className="form-section">
        <Col span={24}>
          <SectionHeader label={'Tài khoản nhà tuyển dụng'} />
        </Col>
        <Col span={12} style={{ marginTop: 25 }}>
          <div className="input-group">
            <Label label={'Tên đăng nhập'} required={false} />
            <div
              className="reservation-input-name"
              style={{ flexWrap: 'wrap' }}
            >
              <div className="input-element" style={{ marginRight: 25 }}>
                <Input
                  control={control}
                  inputName="username"
                  inputProps={{ placeholder: 'Nhập thông tin' }}
                  width={'100%'}
                />
              </div>
            </div>
          </div>
        </Col>

        <Col span={12} style={{ marginTop: 25 }}>
          <div className="input-group">
            <Label label={'Email'} required={false} />
            <div
              className="reservation-input-name"
              style={{ flexWrap: 'wrap' }}
            >
              <div className="input-element" style={{ marginRight: 25 }}>
                <Input
                  control={control}
                  inputName="email"
                  inputProps={{ placeholder: 'Nhập thông tin' }}
                  width={'100%'}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CompanyAccountForm.propTypes = {
  control: PropTypes.any,
};

export default CompanyAccountForm;
