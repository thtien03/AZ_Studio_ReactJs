import React from 'react';
import './Photography.css';

const photos = [
    { id: 1, src: require('../../assets/images/image1.jpg'), alt: 'Photo 1', title: 'Title 1', detail: 'Detail 1' },
    { id: 3, src: require('../../assets/images/image3.jpg'), alt: 'Photo 3', title: 'Title 3', detail: 'Detail 3' },
    { id: 7, src: require('../../assets/images/image7.jpg'), alt: 'Photo 7', title: 'Title 7', detail: 'Detail 7' },
    { id: 5, src: require('../../assets/images/image5.jpg'), alt: 'Photo 5', title: 'Title 5', detail: 'Detail 5' },
    { id: 6, src: require('../../assets/images/image6.jpg'), alt: 'Photo 6', title: 'Title 6', detail: 'Detail 6' },
    { id: 2, src: require('../../assets/images/image2.png'), alt: 'Photo 2', title: 'Title 2', detail: 'Detail 2' },
    { id: 8, src: require('../../assets/images/image8.jpg'), alt: 'Photo 8', title: 'Title 8', detail: 'Detail 8' },
    { id: 6, src: require('../../assets/images/image6.jpg'), alt: 'Photo 6', title: 'Title 6', detail: 'Detail 6' },
    { id: 5, src: require('../../assets/images/image5.jpg'), alt: 'Photo 5', title: 'Title 5', detail: 'Detail 5' },
    { id: 4, src: require('../../assets/images/image4.jpg'), alt: 'Photo 4', title: 'Title 4', detail: 'Detail 4' },
    { id: 2, src: require('../../assets/images/image2.png'), alt: 'Photo 2', title: 'Title 2', detail: 'Detail 2' },
    { id: 8, src: require('../../assets/images/image8.jpg'), alt: 'Photo 8', title: 'Title 8', detail: 'Detail 8' },
];

const Photography = () => {
    return (
        <div className="photography-container">
            <div className="photography-header">
                <h1 className="photography-title">Portfolio</h1>
            </div>
            <div className="photography-grid">
                {photos.map(photo => (
                    <div key={photo.id} className="photography-item">
                        <img src={photo.src} alt={photo.alt} />
                        <div className="overlay">
                            <h2 className="overlay-title">{photo.title}</h2>
                            <p className="overlay-detail">{photo.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Photography;
