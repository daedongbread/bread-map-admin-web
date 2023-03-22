import styled from '@emotion/styled';

export const Divider = styled.hr`
  border: 0;
  height: 0;
  border-top: ${({ theme }) => ` 1px solid ${theme.color.gray200}`};
  margin: 2rem 0;
`;
