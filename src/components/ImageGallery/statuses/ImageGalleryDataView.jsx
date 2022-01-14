import React from 'react';
import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import s from './../ImageGallery.module.scss';

export default function ImageGalleryDataView({ imageArray, toggleModal }) {
  return (
    <ul className={s.gallery}>
      {imageArray.map(image => {
        const { id, webformatURL, largeImageURL, user } = image;

        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            id={id}
            user={user}
            toggleModal={toggleModal}
          />
        );
      })}
    </ul>
  );
}

ImageGalleryDataView.propTypes = {
  imageArray: propTypes.array.isRequired,
  toggleModal: propTypes.func.isRequired
}