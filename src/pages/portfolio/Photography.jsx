import React from 'react';
import './Photography.css';

const photos = [
    { id: 1, src: require('../../assets/images/image1.jpg'), alt: 'Photo 1' },
    { id: 2, src: require('../../assets/images/image2.png'), alt: 'Photo 2' },
    { id: 3, src: require('../../assets/images/image3.jpg'), alt: 'Photo 3' },
    { id: 4, src: require('../../assets/images/image4.jpg'), alt: 'Photo 4' },
    { id: 5, src: require('../../assets/images/image5.jpg'), alt: 'Photo 5' },
    { id: 6, src: require('../../assets/images/image6.jpg'), alt: 'Photo 6' },
    { id: 7, src: require('../../assets/images/image7.jpg'), alt: 'Photo 7' },
    { id: 8, src: require('../../assets/images/image8.jpg'), alt: 'Photo 8' },
    { id: 9, src: require('../../assets/images/image9.jpg'), alt: 'Photo 9' },
    { id: 10, src: require('../../assets/images/image10.jpg'), alt: 'Photo 10' },
    { id: 11, src: require('../../assets/images/image11.jpg'), alt: 'Photo 11' },
    { id: 12, src: require('../../assets/images/image12.jpg'), alt: 'Photo 12' },
];

const Photography = () => {
    return (
        <div className="photography-container">
            <h1 className="photography-title">Portfolio</h1>
            <div className="photography-grid">
                {photos.map(photo => (
                    <div key={photo.id} className="photography-item">
                        <img src={photo.src} alt={photo.alt} className="photography-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Photography;
