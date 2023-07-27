import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { PersistLogin, RequireAuth } from '@/components/Auth';
import { ControlInterceptor } from '@/components/Auth/ControlInterceptor';
import { Error, Header } from '@/components/Shared';
import { PATH } from '@/constants/routes';
import {
  BakeriesPage,
  BakeryDetailPage,
  BakeryReportDetailPage,
  BakeryReportsPage,
  LoginPage,
  CarouselPage,
  RankingPage,
  ContentsPage,
  AdminCommunityPage,
  ContentDetailPage,
} from '@/pages';
import { loginPageLoader } from '@/routes/loader';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ControlInterceptor />}>
      <Route path={PATH.Home} element={<Navigate to={PATH.Login} />} />
      <Route path={PATH.Login} element={<LoginPage />} loader={loginPageLoader} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path={PATH.Bakeries} element={<Navigate to={`${PATH.Bakeries}/all`} />} />
          <Route path={`${PATH.Bakeries}/all`} element={<BakeriesPage />} />
          <Route path={`${PATH.Bakeries}/search`} element={<BakeriesPage />} />
          <Route path={`${PATH.Bakeries}/new`} element={<BakeryDetailPage />} />
          <Route path={`${PATH.Bakeries}/:bakeryId`} element={<BakeryDetailPage />} />
          <Route path={PATH.BakeryReports} element={<BakeryReportsPage />} />
          <Route path={`${PATH.BakeryReports}/:reportId`} element={<BakeryReportDetailPage />} />
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
          <Route path={PATH.HomeScreen.Main} element={<Navigate to={PATH.HomeScreen.Carousel} />} />
          <Route path={PATH.HomeScreen.Carousel} element={<CarouselPage />} />
          <Route path={PATH.HomeScreen.Ranking} element={<RankingPage />} />
          <Route path={PATH.HomeScreen.Contents} element={<ContentsPage />} />
          <Route path={`${PATH.HomeScreen.Contents}/:contentId`} element={<ContentDetailPage />} />
          <Route path={PATH.HomeScreen.AdminCommunity} element={<AdminCommunityPage />} />
          <Route
            path={PATH.Users}
            element={
              <>
                <Header name={'사용자 관리'} />
                <Error errMsg={'사용자관리 페이지는 준비중이에요'} explanation={'빠른 시일 내에 돌아올게요!'} />
              </>
            }
          />
        </Route>
      </Route>

      <Route path={'*'} element={<div>Not found</div>} />
    </Route>
  )
);
