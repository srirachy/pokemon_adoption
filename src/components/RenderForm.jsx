import React from 'react';
import {nanoid} from 'nanoid';
import Button from './Button';
import initbuttons from '../initbuttons.json';
import TableSection from './TableSection';
import DataCell from './DataCell';
import DataCellImage from './DataCellImage';

const RenderForm = ({searchState, changePok, newSearch, setNewSearch, changeSearchState, userPokemon, changeGenPok, fiveRandos, addPkmn, addGenPkmn, isDisabled}) => {

    const formElmts = [];

    switch(searchState){
        case 1:
            // searchform -- name searchform -- gen
            formElmts.push(
                // nanoid backfired and caused warnings, used generic key for fix
                <form onSubmit={changePok} key='1_form'>    
                    <label htmlFor='find_pkmn'>
                        <input
                            type='text'
                            id='find_pkmn'
                            placeholder='Pokemon Name'
                            value={newSearch}
                            onChange={(e) => setNewSearch(e.target.value)}
                        />
                    </label>
                    <button type='submit' disabled={isDisabled}>Search</button>
                </form>);
            formElmts.push(
                <Button 
                className='backBu'
                key='2_form'
                children='Back'
                onClick={() => changeSearchState(0)}        
            />)
            break;
        case 2:
            //searchform -- generation/region 
            formElmts.push(
                <Button 
                    key={nanoid()}
                    children='Kanto'
                    onClick={() => changeGenPok(1)}        
                />,
                <Button 
                    key={nanoid()}
                    children='Johto'
                    onClick={() => changeGenPok(2)}        
                />,
                <Button 
                    key={nanoid()}
                    children='Hoenn'
                    onClick={() => changeGenPok(3)}        
                />,
                <Button 
                    key={nanoid()}
                    children='Sinnoh'
                    onClick={() => changeGenPok(4)}        
                />,
                <Button 
                    key={nanoid()}
                    children='Unova'
                    onClick={() => changeGenPok(5)}        
                />,
                <Button 
                    key={nanoid()}
                    children='Kalos'
                    onClick={() => changeGenPok(6)}        
                />,
                <Button 
                    key={nanoid()}
                    children='Alola'
                    onClick={() => changeGenPok(7)}        
                />,
                <Button 
                    key={nanoid()}
                    children='Galar'
                    onClick={() => changeGenPok(8)}        
                />,
                <Button 
                    className='backBu'
                    key={nanoid()}
                    children='Back'
                    onClick={() => changeSearchState(0)}        
                />);
            break;
        case 3:
            //data part
            formElmts.push(
                <TableSection className='search_pkmn' key='0_table'>
                    <tr>
                        <DataCell>
                            {userPokemon.name}
                        </DataCell>
                        <DataCellImage
                            imgUrl={userPokemon.sprites.front_shiny}
                            altText={userPokemon.name}
                        />
                        <DataCell>
                            <ul> 
                                {userPokemon.types[0] && <li>{userPokemon.types[0].type.name}</li>} {userPokemon.types[1] && <li>{userPokemon.types[1].type.name}</li>}
                            </ul>
                        </DataCell>
                        <DataCell>
                            <ul>
                                {userPokemon.abilities[0] && <li>{userPokemon.abilities[0].ability.name}</li>} {userPokemon.abilities[1] && <li>{userPokemon.abilities[1].ability.name}</li>} {userPokemon.abilities[2] && <li>{userPokemon.abilities[2].ability.name}</li>}
                            </ul>
                        </DataCell>
                    </tr>
                </TableSection>,
                <Button 
                    key='2_table'
                    children='Add'
                    onClick={() => addPkmn(userPokemon.name)}        
                />,
                <Button 
                    className='backBu'
                    key='3_table'
                    children='Reset'
                    onClick={() => changeSearchState(1)}        
                />);
            break;
        case 4:
            //generate five randos
            for (const {name : nameText, sprites: {front_shiny : imgUrl}, types, abilities} of fiveRandos){
                formElmts.push(
                        <tr key={nanoid()}>
                            <DataCell>
                                <Button 
                                    key={nanoid()}
                                    children='Add'
                                    onClick={() => addGenPkmn(nameText)}        
                                />
                            </DataCell>
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
                        </tr>
                )
            };
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
            };
            break;
    };
    return formElmts;
};

export default RenderForm;