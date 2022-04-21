import React from 'react';

const DataCellImage = ({imgUrl, altText}) => {
    return (
        <td><img src={imgUrl} alt={altText}/></td>
    );
};

export default DataCellImage;