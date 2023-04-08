import styled from '@emotion/styled';

export const Divider = styled.hr<{ noMargin?: boolean }>`
  border: 0;
  height: 0;
  border-top: ${({ theme }) => ` 1px solid ${theme.color.gray200}`};
  margin: ${({ noMargin }) => (noMargin ? '0' : '2rem 0')};
`;
