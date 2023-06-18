import React, { useEffect, useState } from 'react';
import { useBakery } from '@/apis';
import { Input, ReadOnlyInputField } from '@/components/Shared/Input';
import { PostcodeSearch } from '@/components/Shared/PostCode';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeForm } from '@/store/slices/bakery';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  onChangeForm: (payload: { name: string; value: string }) => void;
};

export const AddressArea = ({ label, onChangeForm }: Props) => {
  const dispatch = useAppDispatch();
  const { bakeryAddressQuery } = useBakery({ bakeryId: 1 });
  const { form } = useAppSelector(selector => selector.bakery);
  const { address, detailedAddress } = form;

  const [searchedAddr, setSearchedAddr] = useState('');
  const { data } = bakeryAddressQuery({ address: searchedAddr });

  const onChangeAddr = (addr: string) => {
    setSearchedAddr(addr);
  };

  useEffect(() => {
    if (data) {
      dispatch(changeForm({ name: 'address', value: searchedAddr }));
      dispatch(changeForm({ name: 'latitude', value: String(data.latitude) }));
      dispatch(changeForm({ name: 'longitude', value: String(data.longitude) }));
    }
  }, [data]);

  return (
    <Row alignTop>
      <label>{label}</label>
      <Address>
        <div className="search">
          <ReadOnlyInputField placeholder={'주소를 검색해주세요.'} content={searchedAddr ? searchedAddr : address} />
          <PostcodeSearch onSearch={onChangeAddr} />
        </div>
        <div className="detail-addr">
          <Input
            type={'plain'}
            value={detailedAddress || ''}
            placeholder={'상세 주소를 입력해주세요.'}
            onChangeInput={e => onChangeForm({ name: 'detailedAddress', value: e.target.value })}
          />
        </div>
        <Cords>
          <div className="item">
            <label>위도</label>
            <ReadOnlyInputField placeholder={'자동으로 입력됩니다.'} content={(data?.latitude && String(data?.latitude)) || String(form.latitude) || ''} />
          </div>
          <div className="item">
            <label>경도</label>
            <ReadOnlyInputField placeholder={'자동으로 입력됩니다.'} content={(data?.longitude && String(data?.longitude)) || String(form.longitude) || ''} />
          </div>
        </Cords>
      </Address>
    </Row>
  );
};

const Address = styled.div`
  flex: 1;
  font-size: 1.4rem;

  .search {
    display: flex;
    gap: 10px;
    > div {
      flex: 100%;
      input {
        padding: 15px;
      }
    }

    > button {
      width: 100px;
    }
  }

  .detail-addr {
    margin-top: 10px;
  }
`;

const Cords = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  .item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
