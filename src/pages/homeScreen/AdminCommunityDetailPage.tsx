import React from 'react';
import { useParams } from 'react-router-dom';
import { CommunityForm } from '@/components/HomeCommunityDetail';
import styled from '@emotion/styled';

export const AdminCommunityDetailPage = () => {
  const { communityId } = useParams();

  return (
    <>
      <Container>
        <CommunityForm communityId={communityId ? Number(communityId) : 0} />
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 100vh;
  max-width: 850px;
  display: flex;
  flex-direction: column;
  padding: 3rem 6rem;
`;
