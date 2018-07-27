import React from 'react';
import { Link } from 'react-router-dom';

const FormButton = (props) => {
  const { submitLabel, goToLink } = props;
  return (
    <div className="d-flex justify-content-between">

        <Link to={goToLink}>{submitLabel}</Link>
    </div>
  );
};

export default FormButton;
