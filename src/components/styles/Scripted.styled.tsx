import styled from "styled-components";

export const ScriptedWrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.5rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const ScriptedMuted = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
`;
