import React from 'react';
import Image from './Image';


const RenderImages = ({firstHunnit}) => {
    const imgElmts = [];

    for (const {imgUrl, altText} of firstHunnit){
        imgElmts.push(
            <Image
                imgUrl={imgUrl}
                altText={altText}
                key={imgUrl}
            />
        )
    };
    return imgElmts;
}

export default RenderImages;