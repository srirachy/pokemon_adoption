import React from 'react';

const SearchField = ({curFilter, handleFilter}) => {

    return (<label htmlFor='search_adopted_pkmn'>
                View/Search Pokemon
                <input
                    type='text'
                    id='search_adopted_pkmn'
                    placeholder='Pokemon Name'
                    value={curFilter}
                    onChange={(e) => handleFilter(e.target.value)}
                />
            </label>);
}          
                
export default SearchField;