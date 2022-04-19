import React from 'react';

const Image = ({imgUrl, altText}) => {
    return (
        <img src={imgUrl} alt={altText}/>
    );
};

export default Image;