import React from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from '@/components/Shared';

type Props = {
  onSearch: (addr: string) => void;
};

export const PostcodeSearch = ({ onSearch }: Props) => {
  const open = useDaumPostcodePopup(SCRIPT_URL);

  const handleComplete = (data: Address) => {
    let fullAddress = data.address; // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    onSearch(fullAddress);
  };

  const handleClick = async () => {
    await open({ onComplete: handleComplete });
  };

  return <Button type={'lightOrange'} text={'주소 검색'} onClickBtn={handleClick} />;
};

const SCRIPT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
