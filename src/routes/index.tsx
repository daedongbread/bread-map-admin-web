import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { PersistLogin, RequireAuth } from '@/components/Auth';
import { ControlInterceptor } from '@/components/Auth/ControlInterceptor';
import { Error, Header } from '@/components/Shared';
import { PATH } from '@/constants/routes';
import { BakeriesContainer } from '@/containers/Bakeries';
import { BakeryDetailContainer } from '@/containers/BakeryDetail';
import { BakeryReportDetailContainer } from '@/containers/BakeryReportDetail';
import { BakeryReportsContainer } from '@/containers/BakeryReports';
import { LoginContainer } from '@/containers/Login/LoginContainer';
import { loginPageLoader } from '@/routes/loader';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ControlInterceptor />}>
      <Route path={PATH.Home} element={<Navigate to={PATH.Login} />} />
      <Route path={PATH.Login} element={<LoginContainer />} loader={loginPageLoader} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path={`${PATH.Bakeries}`} element={<Navigate to={`${PATH.Bakeries}/all`} />} />
          <Route path={`${PATH.Bakeries}/all`} element={<BakeriesContainer />} />
          <Route path={`${PATH.Bakeries}/search`} element={<BakeriesContainer />} />
          <Route path={`${PATH.Bakeries}/new`} element={<BakeryDetailContainer />} />
          <Route path={`${PATH.Bakeries}/:bakeryId`} element={<BakeryDetailContainer />} />
          <Route path={PATH.BakeryReports} element={<BakeryReportsContainer />} />
          <Route path={`${PATH.BakeryReports}/:reportId`} element={<BakeryReportDetailContainer />} />
          <Route
            path={PATH.Users}
            element={
              <>
                <Header name={'사용자 관리'} />
                <Error errMsg={'사용자관리 페이지는 준비중이에요'} explanation={'빠른 시일 내에 돌아올게요!'} />
              </>
            }
          />
          <Route
            path={PATH.UserReports}
            element={
              <>
                <Header name={'신고목록'} />
                <Error errMsg={'신고목록 페이지는 준비중이에요'} explanation={'빠른 시일 내에 돌아올게요!'} />
              </>
            }
          />
          <Route path={`${PATH.UserReports}/:reportId`} element={<Error errMsg={'신고관리 페이지는 준비중이에요'} />} />
        </Route>
      </Route>

      <Route path={'*'} element={<div>Not found</div>} />
    </Route>
  )
);
