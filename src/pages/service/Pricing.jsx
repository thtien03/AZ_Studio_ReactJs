// src/pages/service/Pricing.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './Pricing.css';
import coverImage from '../../assets/images/Nen-Pricing.jpg'; // Đường dẫn đến ảnh cover
import imageRuby from '../../assets/images/ruby.jpg';
import imageLuxury from '../../assets/images/luxury.jpg';
import imageLimited from '../../assets/images/limited.jpg';
import weddingPremium from '../../assets/images/weddingPremium.jpg';
import weddingPricing from '../../assets/images/luxury.jpg';

// Đặt cấu hình Modal (yêu cầu cho react-modal)
Modal.setAppElement('#root');

const Pricing = () => { 
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="pricing-container">
      {/* Container ảnh cover */}
      <div className="cover-image-container">
        <h1 className="pricing-title">GÓI THUÊ VÁY CƯỚI</h1>
        <img src={coverImage} alt="Cover" className="cover-image" />
      </div>

      <div className="pricing-content">
        <div className="pricing-grid">
          <div className="pricing-item" onClick={() => openModal(imageRuby)}>
            <img src={imageRuby} alt="Ruby" className="pricing-image" />
            <div className="overlay">
              <span className="overlay-text">RUBY</span>
            </div>
          </div>
          <div className="pricing-item" onClick={() => openModal(imageLuxury)}>
            <img src={imageLuxury} alt="Luxury" className="pricing-image" />
            <div className="overlay">
              <span className="overlay-text">LUXURY</span>
            </div>
          </div>
          <div className="pricing-item" onClick={() => openModal(imageLimited)}>
            <img src={imageLimited} alt="Limited" className="pricing-image" />
            <div className="overlay">
              <span className="overlay-text">LIMITED</span>
            </div>
          </div>
          <div className="pricing-item" onClick={() => openModal(weddingPremium)}>
            <img src={weddingPremium} alt="Premium" className="pricing-image" />
            <div className="overlay">
              <span className="overlay-text">PREMIUM</span>
            </div>
          </div>
        </div>

        <h2 className="pricing-title">GÓI NGÀY CƯỚI</h2>
        <div className="pricing-grid wedding-packages">
          <div className="wedding-item" onClick={() => openModal(weddingPremium)}>
            <img src={weddingPremium} alt="Premium Wedding" className="pricing-image" />
            <div className="overlay">
              <span className="overlay-text">PREMIUM</span>
            </div>
          </div>
          <div className="wedding-item" onClick={() => openModal(weddingPricing)}>
            <img src={weddingPricing} alt="Wedding Pricing" className="pricing-image" />
            <div className="overlay">
              <span className="overlay-text">BẢNG GIÁ NGÀY CƯỚI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal cho hình ảnh */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="modal-close-button">X</button>
        {selectedImage && <img src={selectedImage} alt="Selected" className="modal-image" />}
      </Modal>
    </div>
  );
};

export default Pricing;
