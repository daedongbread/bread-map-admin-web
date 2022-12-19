import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { PersistLogin, RequireAuth } from '@/components/Auth';
import { PATH } from '@/constants/routes';
import { BakeriesContainer } from '@/containers/Bakeries';
import { BakeryDetailContainer } from '@/containers/BakeryDetail';
import { BakeryReportDetailContainer } from '@/containers/BakeryReportDetail';
import { BakeryReportsContainer } from '@/containers/BakeryReports';
import { LoginContainer } from '@/containers/Login/LoginContainer';
import { loginPageLoader } from '@/routes/loader';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PATH.Home}>
      <Route path={PATH.Login} element={<LoginContainer />} loader={loginPageLoader} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path={PATH.Bakeries} element={<BakeriesContainer />} />
          <Route path={`${PATH.Bakeries}/new`} element={<BakeryDetailContainer />} />
          <Route path={`${PATH.Bakeries}/:bakeryId`} element={<BakeryDetailContainer />} />
          <Route path={PATH.BakeryReports} element={<BakeryReportsContainer />} />
          <Route path={`${PATH.BakeryReports}/:reportId`} element={<BakeryReportDetailContainer />} />
          <Route path={PATH.Users} element={<div>Users page</div>} />
          <Route path={PATH.UserReports} element={<div>User reports page</div>} />
          <Route path={`${PATH.UserReports}/:reportId`} element={<div>User report detail page</div>} />
        </Route>
      </Route>

      <Route path={'*'} element={<div>Not found</div>} />
    </Route>
  )
);
