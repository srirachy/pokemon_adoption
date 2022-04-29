import React from 'react';
import DataCell from './DataCell'
import DataCellImage from './DataCellImage';
import Button from './Button'
import {nanoid} from 'nanoid';

const RenderImages = ({tableContent, removePkmn}) => {
    const imgElmts = [];

    for (const {name : nameText, sprites: {front_shiny : imgUrl}, types, abilities} of tableContent){
        imgElmts.push(
            <tr key={nanoid()}>
                <DataCell>
                    {nameText}
                </DataCell>
                <DataCellImage
                    imgUrl={imgUrl}
                    altText={nameText}
                />
                <DataCell>
                    <ul> 
                        {types[0] && <li>{types[0].type.name}</li>} {types[1] && <li>{types[1].type.name}</li>}
                    </ul>
                </DataCell>
                <DataCell>
                    <ul>
                        {abilities[0] && <li>{abilities[0].ability.name}</li>} {abilities[1] && <li>{abilities[1].ability.name}</li>} {abilities[2] && <li>{abilities[2].ability.name}</li>}
                    </ul>
                </DataCell>
                <DataCell>
                    <Button 
                        className='xButton'
                        key={nanoid()}
                        children='x'
                        onClick={() => removePkmn(nameText)}        
                    />
                </DataCell>
            </tr>
        )
    };
    return imgElmts;
}

export default RenderImages;