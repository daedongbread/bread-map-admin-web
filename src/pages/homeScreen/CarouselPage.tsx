import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { GetHomeCarouselItemResponse, useHomeCarousel } from '@/apis/homeCarousel';
import { HomeCarouselItem } from '@/components/HomeCarousels';
import { Button, Header } from '@/components/Shared';
import { useToast } from '@/hooks/useToast';
import styled from '@emotion/styled';

export const CarouselPage = () => {
  const { addToast } = useToast();
  const { getHomeCarousels, updateHomeCarousels } = useHomeCarousel();
  const [carouselData, setCarouselData] = useState<GetHomeCarouselItemResponse[]>([]);
  const { data, isLoading, isFetching } = getHomeCarousels();

  useEffect(() => {
    if (!data) {
      return;
    }
    setCarouselData(data);
  }, [data]);

  const SortableItem = SortableElement((props: { value: any }) => {
    const { value } = props;
    return (
      <Carousel>
        <HomeCarouselItem
          order={value + 1}
          image={carouselData && carouselData[value] ? carouselData[value].bannerImage : ''}
          title={carouselData && carouselData[value] ? carouselData[value].title : '게시중인 콘텐츠가 없습니다'}
        />
      </Carousel>
    );
  });

  const SortableList = SortableContainer((props: any) => {
    return (
      <CarouselContainer>
        {Array.from({ length: 10 }, (_, index) => (
          <SortableItem key={`item-${index}`} index={index} value={index} va {...props} />
        ))}
      </CarouselContainer>
    );
  });

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));
  };

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    if (oldIndex == newIndex) {
      return;
    }
    console.log(oldIndex, newIndex);
    const sorted = reorder(carouselData, oldIndex, newIndex);
    console.log(sorted);
    setCarouselData(sorted);
  };

  const onClickReset = () => {
    if (!data) {
      return;
    }
    setCarouselData(data);
  };
  const onClickSave = () => {
    if (!carouselData) {
      return;
    }
    updateHomeCarousels.mutate([...carouselData], {
      onSuccess: () => {
        addToast('캐러셀 순서 저장을 완료했습니다.', 'error', 3000);
      },
    });
  };

  return (
    <>
      <Header name={'캐러셀 영역 설정'} />
      <Container>
        <SubTitle>상단 캐러셀 순서</SubTitle>
        <SortableList axis="xy" onSortEnd={onSortEnd} useWindowAsScrollContainer={true} lockToContainerEdges={true} />
        <BtnContainer justifyContent={'center'}>
          <Button type={'white'} btnSize={'medium'} fontSize={'medium'} text={'초기화'} onClickBtn={onClickReset} />
          <Button type={'orange'} btnSize={'medium'} fontSize={'medium'} text={'저장'} onClickBtn={onClickSave} />
        </BtnContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 100vh;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  padding: 3rem 6rem;
`;

const SubTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 800;
`;

const CarouselContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  grid-auto-flow: row;
  grid-gap: 16px;
  padding: 16px;
`;

const Carousel = styled.div``;

const BtnContainer = styled.div<{ justifyContent: 'flex-start' | 'center' }>`
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
  margin-top: 2rem;
`;
