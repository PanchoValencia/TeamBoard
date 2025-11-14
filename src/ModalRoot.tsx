import { createPortal } from "react-dom";
import { useGlobalStore } from "./Store/GlobalStore";
import { ModalIds } from "./TeamBoard.types";
import { ManageUserModal } from "./Features/ManageUserModal/ManageUserModal";
import { ManageCardModal } from "./Features/ManageCardModal/ManageCardModal";
import styled from "styled-components";

const ModalContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: color-mix(in srgb, var(--background-dark) 90%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000000;
`;

const ModalCloserButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 2px;
        transform-origin: center;
        transition: 0.2s ease;
        background-color: var(--foreground);
    }

    &::before {
        transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:hover::before,
    &:hover::after {
        background-color: var(--primary);
    }
    &:hover {
        transition: 0.2s ease;
        background-color: var(--secondary);
    }
`;

export const ModalRoot: React.FC = () => {
  const { modal, modalProps, closeModal } = useGlobalStore();

  if (!modal) return null;

  const renderModal = () => {
    switch (modal) {
      case ModalIds.addUser:
        return <ManageUserModal {...modalProps} />;
      case ModalIds.addCard:
        return <ManageCardModal {...modalProps} />;
      default:
        return null; 
    }
  };

  return createPortal(
    <ModalContainer>
      <ModalCloserButton onClick={closeModal} />
      {renderModal()}
    </ModalContainer>,
    document.body
  );
}
