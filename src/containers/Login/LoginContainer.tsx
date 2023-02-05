import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/apis';
import { rememberUser, removeUser } from '@/apis/auth/login';
import { Logo } from '@/components/Login';
import { LoginForm } from '@/components/Login/LoginForm';
import { Button } from '@/components/Shared';
import { ERROR_CODE, PATH } from '@/constants';
import useForm from '@/hooks/useForm';
import useToggle from '@/hooks/useToggle';
import { loginStorage, Storage } from '@/utils';
import styled from '@emotion/styled';

export type LoginForm = typeof initialForm;

export const LoginContainer = () => {
  const navigate = useNavigate();
  const {
    login: { mutate: login, error },
  } = useLogin();

  const { activate: isRemembered, onActive: onActiveRemember, onInactive: onInactiveRemember, onToggleActive: onToggleRemember } = useToggle();
  const { form, onChangeForm, onSetForm } = useForm<LoginForm>(initialForm);

  useEffect(() => {
    const { form, isRemembered } = loginStorage.getMultipleItems([Storage.Form, Storage.IsRemembered]);
    if (form && isRemembered) {
      onActiveRemember();
      onSetForm(form);
    } else {
      onInactiveRemember();
    }
  }, []);

  useEffect(() => {
    if (error) {
      switch (error.response?.data.code) {
        case ERROR_CODE.NOT_FOUND_ADMIN:
          return window.alert('아이디와 비밀번호를 확인해주세요.');
        default:
          return window.alert('로그인 에러입니다. 다시 시도해주세요.');
      }
    }
  }, [error]);

  const onSubmit = () => {
    const { email, password } = form;
    if (!email.trim().length || !password.trim().length) {
      return window.alert('아이디 또는 비밀번호를 입력해주세요.');
    }

    isRemembered ? rememberUser({ email, password }) : removeUser();
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate(PATH.Bakeries, { replace: true });
        },
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <Logo />
        <LoginForm form={form} onChangeForm={onChangeForm} isRemembered={isRemembered} onToggleRemember={onToggleRemember} />
        <Button type={'orange'} text={'로그인'} onClickBtn={() => onSubmit()} />
      </Wrapper>
    </Container>
  );
};

const initialForm = {
  email: '',
  password: '',
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 42rem;
  min-width: 33rem;
  width: 80%;
`;
