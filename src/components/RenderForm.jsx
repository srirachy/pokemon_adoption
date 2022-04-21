import React from 'react';
import {nanoid} from 'nanoid';
import Button from './Button';
import initbuttons from '../initbuttons.json';

const RenderForm = ({searchState, changePok, newSearch, setNewSearch, changeSearchState}) => {

    const formElmts = [];

    switch(searchState){
        case 1:
            // searchform -- name searchform -- gen
            formElmts.push( 
            <form onSubmit={changePok}>
                <label htmlFor="pokemonSearch">
                    Name:
                    <input
                        type="text"
                        id="pokemonSearch"
                        placeholder='Pokemon Name'
                        value={newSearch}
                        onChange={(e) => setNewSearch(e.target.value)}
                    />
                </label>
                <button type="submit">Search</button>
            </form>);
            break;
        case 2:
            //searchform -- region 
            //<img className={className} src={pokeballImg} onClick={() => hideShowForm()} alt={imgAltText}/>
            for (const { name, value } of initbuttons){
                formElmts.push(
                    <Button
                       key={nanoid()}
                       value={value}
                       children={name}
                       onClick={() => changeSearchState(value)}
                   />
                )
            }
            //kanto, johto, hoenn, sinnoh, unova, kalos, alola, galar
            break;
        case 3:
            //data -- name 
            //singular output
            //Accept or Back
            break;
        case 4:
            //data -- gen
            //5 random pokemon from gen
            //randomize again
            break;
        default:
            //initial menu -> user selects button -- name/gen
            for (const { name, value } of initbuttons){
                formElmts.push(
                    <Button
                       key={nanoid()}
                       value={value}
                       children={name}
                       onClick={() => changeSearchState(value)}
                   />
                )
            }
            break;
    };
    return formElmts;
};

export default RenderForm;