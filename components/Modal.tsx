import React, { useState } from "react";

const Modal = () => {
    const [showModal, setShowModal] = useState(true);

    const renderModal = () => (
        // TODO - use gloabl css class to put these class based css styles for modal
        <div className="modal opacity-100 visible pointer-events-auto">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                <div className="modal-action">
                    <label className="btn" onClick={() => setShowModal(false)}>Yay!</label>
                </div>
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