import React from 'react';

const NewPokemonHeader = ({className, pokeballImg, hideShowForm, imgAltText}) => {
    return (
        <>
            <h2>Add New Pokemon<img className={className} src={pokeballImg} onClick={() => hideShowForm()} alt={imgAltText}/></h2>
        </>
    );
};

export default NewPokemonHeader;