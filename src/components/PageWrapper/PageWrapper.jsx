import React from 'react';
import './styles.css';

const PageWrapper = (props) => {
  return (
    <div className="page_wrapper">
      {props.children}
    </div>
  );
}

export default PageWrapper;
