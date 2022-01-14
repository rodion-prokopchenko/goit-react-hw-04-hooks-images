import React from 'react';
import s from './Button.module.scss';
import propTypes from 'prop-types';

export default function Button({ pageDown }) {
  return (
    <button className={s.button} type="button" onClick={pageDown}>
      Load more
    </button>
  );
}

Button.propTypes = {
  pageDown: propTypes.func.isRequired
}