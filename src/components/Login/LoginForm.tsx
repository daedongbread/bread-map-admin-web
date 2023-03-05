import React from 'react';
import { Input } from '@/components/Shared';
import type { InputTextType, InputProps } from '@/components/Shared';
import Check from '@/components/Shared/Icons/Check.svg';
import CheckOrange from '@/components/Shared/Icons/CheckOrange.svg';
import { LoginForm as LoginFormType } from '@/containers/Login';
import styled from '@emotion/styled';

type Props = {
  form: LoginFormType;
  onChangeForm: (key: string, value: any) => void;
  isRemembered: boolean;
  onToggleRemember: () => void;
};

export const LoginForm = ({ form, onChangeForm, isRemembered, onToggleRemember }: Props) => {
  return (
    <div>
      <Wrapper>
        {LOGIN_INPUTS.map(input => (
          <InputWrapper key={`login-${input.name}`}>
            <Input
              value={form[input.name]}
              onChangeInput={e => onChangeForm(input.name, e.target.value)}
              placeholder={input.placeholder}
              textType={input.textType}
              type={input.type}
              padding={input.padding}
            />
          </InputWrapper>
        ))}
      </Wrapper>
      <CheckBox>
        <input type="checkbox" id="remember" checked={isRemembered} onChange={onToggleRemember} />
        <label htmlFor="remember">ID/PW 기억하기</label>
      </CheckBox>
    </div>
  );
};

const LOGIN_INPUTS: ({ name: keyof LoginFormType; textType: InputTextType } & Pick<InputProps, 'placeholder' | 'type' | 'padding'>)[] = [
  { name: 'email', placeholder: '아이디', type: 'orange', padding: 'large', textType: 'text' },
  { name: 'password', placeholder: '비밀번호', type: 'orange', padding: 'large', textType: 'password' },
];

const Wrapper = styled.div`
  margin-top: 50px;
`;

const InputWrapper = styled.div`
  margin: 1.6rem 0;
  width: 100%;
`;

const CheckBox = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
  margin-bottom: 1.6rem;
  position: relative;

  label {
    font-size: ${({ theme }) => theme.size.fontMd};
    color: ${({ theme }) => theme.color.gray600};
    margin-left: 3rem;
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox'] + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(${Check});
    opacity: 1;
    width: 24px;
    height: 24px;
  }

  input[type='checkbox']:checked + label:before {
    opacity: 0;
  }

  input[type='checkbox'] + label:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(${CheckOrange});
    opacity: 0;
    width: 24px;
    height: 24px;
  }

  input[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`;
