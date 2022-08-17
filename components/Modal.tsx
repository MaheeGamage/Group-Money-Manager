import React, { useState } from "react";

type ModelProps = {
    children: React.ReactNode,
  };

const Modal = ({children}: ModelProps) => {
    const [showModal, setShowModal] = useState(true);

    const renderModal = () => (
        // TODO - use gloabl css class to put these class based css styles for modal
        <div className="modal opacity-100 visible pointer-events-auto">
            <div className="modal-box relative">
                <div className="btn btn-sm btn-circle absolute right-2 top-2">✕</div>
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