import styled from "styled-components";

export const RmWrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.5rem;
`;

export const RmError = styled.span`
  color: ${({ theme }) => theme.colors?.secondary};
`;

export const RmRelief = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
  margin-top: 0.5rem;
`;
