import styled, { keyframes } from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 0 40px 0;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 2.3rem;
  font-weight: 600;
  margin: 42px 0 28px 0;
  letter-spacing: 1px;
  text-align: center;
`;

export const UploadBox = styled.div<{ highlight?: boolean }>`
  border: 2px dashed ${props => (props.highlight ? '#59f' : '#888')};
  background-color: ${props => (props.highlight ? 'rgba(40,40,60,0.85)' : 'rgba(20,20,20,0.8)')};
  border-radius: 18px;
  width: 440px;
  max-width: 92vw;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ddd;
  margin-bottom: 28px;
  transition: border-color 0.2s, background-color 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #59f;
    background-color: rgba(40, 40, 60, 0.85);
  }
`;

export const UploadText = styled.div`
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 8px;
  user-select: none;
`;

export const SelectButton = styled.label`
  background: #222;
  color: #eee;
  border: 1px solid #555;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 1rem;
  margin-top: 10px;
  cursor: pointer;
  display: inline-block;
  transition: background 0.22s, border-color 0.22s;
  user-select: none;

  &:hover {
    background: #59f;
    border-color: #59f;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ImagePreview = styled.img`
  max-width: 360px;
  max-height: 200px;
  margin-bottom: 18px;
  border-radius: 7px;
  border: 1.5px solid #444;
  object-fit: contain;
`;

export const RecognizeBtn = styled.button`
  background: #1e40af; /* azul-600 */
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  margin: 16px 0 0 0;
  padding: 12px 34px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb; /* azul-500 */
  }

  &:disabled {
    background-color: #9ca3af; /* cinza claro */
    cursor: default;
  }
`;

export const TextArea = styled.textarea`
  width: 420px;
  max-width: 91vw;
  background: #15151b;
  color: #ededed;
  border: none;
  border-radius: 7px;
  padding: 16px;
  margin-top: 24px;
  font-size: 1.03rem;
  font-family: inherit;
  height: 110px;
  resize: vertical;
  outline: none;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  justify-content: center;
`;

export const IconBtn = styled.button`
  display: flex;
  align-items: center;
  /* background: #1e40af; azul-600 */
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  padding: 10px 18px;
  cursor: pointer;
  gap: 8px;
  transition: background-color 0.25s;

  &:hover {
    background-color: #2563eb; /* azul-500 */
  }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

export const ErrorMessage = styled.div<{ animate: boolean }>`
  color: red;
  margin-top: 1rem;
  font-weight: bold;
  text-align: center;
  animation: ${({ animate }) => (animate ? shake : "none")} 0.5s ease;
`;

export const Footer = styled.footer`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

export const FooterIcons = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;

  a {
    color: white;
    font-size: 1.2rem;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;