import React, { useState } from "react";

type ModelProps = {
    children: React.ReactNode,
    showModal: boolean,
    onModalEvent: (action: ModalAction) => void,
  };

export enum ModalAction {
    CLOSE
}

const Modal = ({children, showModal, onModalEvent}: ModelProps) => {

    const handleModalEvents = (action: ModalAction) => {
        onModalEvent(action);
    }

    const renderModal = () => (
        // TODO - use gloabl css class to put these class based css styles for modal
        <div className="modal opacity-100 visible pointer-events-auto">
            <div className="modal-box relative">
                <div className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => handleModalEvents(ModalAction.CLOSE)}>✕</div>
                {children}
            </div>
        </div>
    )

    return (
        <>
            {showModal ? renderModal() : null}
        </>
    );
};

export default Modal;