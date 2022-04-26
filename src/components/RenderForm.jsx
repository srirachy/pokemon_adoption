import React from 'react';
import {nanoid} from 'nanoid';
import Button from './Button';
import initbuttons from '../initbuttons.json';
import TableSection from './TableSection';
import DataCell from './DataCell';
import DataCellImage from './DataCellImage';

const RenderForm = ({searchState, changePok, newSearch, setNewSearch, changeSearchState, userPokemon, changeGenPok}) => {

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
                        //onChange={(e) => changePok(e.target.value)}
                        onChange={(e) => setNewSearch(e.target.value)}
                    />
                </label>
                <button type="submit">Search</button>
            </form>);
            break;
        case 2:
            //searchform -- region 
            //<img className={className} src={pokeballImg} onClick={() => hideShowForm()} alt={imgAltText}/>
                       //kanto, johto, hoenn, sinnoh, unova, kalos, alola, galar
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
                        />
                    )
            break;
        case 3:
            //data part
            formElmts.push(
                <TableSection className='search_pkmn'>
                    <tr key={nanoid()}>
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
                    key={nanoid()}
                    children='Add'
                    onClick={() => changeSearchState(0)}        
                />,
                <Button 
                    key={nanoid()}
                    children='Reset'
                    onClick={() => changeSearchState(1)}        
                />
            );
            break;
        case 4:
            //dropdownlist
            formElmts.push(
                <p>yo</p>
                // <form>
                //     <b>select pokemon from list</b>
                //     <select id='myList' onChange={() => changePok()}>
                //         {firstGenPokemon.map((thePokemon) => (
                //             <option value={thePokemon.name}>{thePokemon.name}</option>
                //         ))}
                //         {/* <RenderOptions firstGenPokemon={firstGenPokemon} genPok={genPok}/> */}
                //     </select>
                // </form>
            )
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