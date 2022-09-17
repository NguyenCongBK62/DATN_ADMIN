import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import CandidateAccountCreateEdit from 'containers/CandidateAccountCreateEdit/CandidateAccountCreateEdit';
import CandidateAccountManager from 'containers/CandidateAccountManager/CandidateAccountManager';
import CompanyAccountCreateEdit from 'containers/CompanyAccountCreateEdit/CompanyAccountCreateEdit';
import CompanyAccountManager from 'containers/CompanyAccountManager/CompanyAccountManager';
import Layout from 'containers/Layout/Layout';
import Login from 'containers/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route
              path="companyaccount"
              element={<CompanyAccountManager />}
              index
            />
            <Route
              path="companyaccount/createedit"
              element={<CompanyAccountCreateEdit />}
            />
            <Route
              path="companyaccountedit/:companyid"
              element={<CompanyAccountCreateEdit />}
            />
            <Route
              path="candidateaccount"
              element={<CandidateAccountManager />}
            />
            <Route
              path="candidateaccount/createedit"
              element={<CandidateAccountCreateEdit />}
            />
            <Route
              path="candidateaccountedit/:accountid"
              element={<CandidateAccountCreateEdit />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
