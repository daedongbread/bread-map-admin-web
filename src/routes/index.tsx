import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Tess from '@/components/Tess';
import { PATH } from '@/constants/routes';
import { BakeriesContainer } from '@/containers/Bakeries';
import { BakeryDetailContainer } from '@/containers/BakeryDetail';
import { BakeryReportDetailContainer } from '@/containers/BakeryReportDetail';
import { BakeryReportsContainer } from '@/containers/BakeryReports';
import { LoginContainer } from '@/containers/Login/LoginContainer';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATH.Login} element={<LoginContainer />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={PATH.Bakeries} />} />
        <Route path={PATH.Bakeries} element={<BakeriesContainer />} />
        <Route path={`${PATH.Bakeries}/new`} element={<BakeryDetailContainer />} />
        <Route path={`${PATH.Bakeries}/:bakeryId`} element={<BakeryDetailContainer />} />
        <Route path={PATH.BakeryReport} element={<BakeryReportsContainer />} />
        <Route path={`${PATH.BakeryReport}/:reportId`} element={<BakeryReportDetailContainer />} />
        <Route path={PATH.Users} element={<Tess />} />
        <Route path={PATH.UserReport} element={<Tess />} />
        <Route path={`${PATH.UserReport}/:id`} element={<Tess />} />
      </Route>
      <Route path={'*'} element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
