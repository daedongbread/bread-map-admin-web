import React, { ChangeEvent } from 'react';
import { Preview } from '@/components/Shared';
import useFileInput from '@/hooks/useFileInput';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  imageUrl: string;
  onChangeForm: (payload: { name: 'image'; value: string }) => void;
  onRemoveForm: (payload: { name: 'image' }) => void;
};

export const SingleImageField = ({ label, imageUrl, onChangeForm, onRemoveForm }: Props) => {
  const { inputRef, onClickTriggerFile } = useFileInput();

  const handleClickBtn = () => {
    onClickTriggerFile();
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    onChangeForm({ name: 'image', value: URL.createObjectURL(file) });
  };

  return (
    <Row alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <ImageFieldContainer>
          <CloseButton
            onClick={e => {
              e.preventDefault();
              onRemoveForm({ name: 'image' });
            }}
          >
            X
          </CloseButton>
          <div onClick={handleClickBtn}>
            <Preview src={imageUrl || ''} widthRem={38} heightRem={20} emptyText={'클릭 후 이미지 업로드'} />
          </div>
          <input ref={inputRef} type="file" accept="image/png, image/jpeg" onChange={handleChangeImage} />
        </ImageFieldContainer>
      </RepresentativeImg>
    </Row>
  );
};

const RepresentativeImg = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;
`;

const ImageFieldContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CloseButton = styled.button`
  position: absolute;
  right: -10px;
  top: -10px;
  background: white;
  color: ${({ theme }) => `${theme.color.primary500}`};
  border: ${({ theme }) => `2px solid ${theme.color.primary500}`};
  border-radius: 50%; /* 버튼 모양을 원형으로 만듭니다 */
  padding: 5px;
  cursor: pointer;
  width: 20px; /* 원형의 경우 너비와 높이를 명시적으로 설정해야 합니다 */
  height: 20px; /* 원형의 경우 너비와 높이를 명시적으로 설정해야 합니다 */
  display: flex; /* 아래의 justify-content와 align-items를 이용해 X를 중앙에 위치시킵니다 */
  justify-content: center;
  align-items: center;
`;
