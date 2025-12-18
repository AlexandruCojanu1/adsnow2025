import React from "react";
import { useModalVideo } from "./ModalVideoContext";

function ModalVideoSection() {
  const { isOpen, videoUrl, closeModal } = useModalVideo();

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="modal-overlay"
      style={{ display: "flex" }}
      onClick={(e) => {
        if (e.target.id === "modal-overlay") closeModal();
      }}
    >
        <span className="my-close" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
        </span>
        <div className="my-modal">
            <iframe
            id="my-video-frame"
            src={videoUrl}
            allowFullScreen
            title="Video"
            ></iframe>
        </div>
    </div>
  );
}

export default ModalVideoSection;