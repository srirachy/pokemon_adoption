import React, {useEffect, useState} from 'react';
import FormSection from './FormSection';
import NewPokemonHeader from './NewPokemonHeader';
import RenderForm from './RenderForm';
import TableSection from './TableSection';
import RenderTableRow from './RenderTableRow';
import emptyPbImg from "../img/empty_pokeball.svg";
import colorPbImg from "../img/color_pokeball.svg";
import '../scss/index.scss';

const BASETABLEURL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
// const TBASEURL = 'pokemon?limit=20&offset=0';
const TBASEURL = 'generation/1';
const BASEURL = 'https://pokeapi.co/api/v2/';
const GENONEMIN = 1;
const GENONEMAX = 151;
const GENTWOMIN = 152;
let searchPokemon = '';
//way to search singular pokemon example
//https://pokeapi.co/api/v2/pokemon/ditto
//way to search type example
//https://pokeapi.co/api/v2/type/3
//way to populate initial table w/ 100 pokemon
//https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'

const PokemonApp = () => {
    const [hideForm, setHideForm] = useState(false);
    const [pokeballImg, setPokeballImg] = useState(emptyPbImg);
    const [imgAltText, setImgAltText] = useState('show form');
    const [searchState, setSearchState] = useState(0);
    const [newSearch, setNewSearch] = useState('');
    const [searchPok, setSearchPok] = useState('ditto');
    const [firstGenUrls, setFirstGenUrls] = useState([]);
    const [firstGenRegionUrls, setFirstGenRegionUrls] = useState([]);
    const [firstGenContent, setFirstGenContent] = useState([]);
    const [firstTwennyContent, setFirstTwennyContent] = useState([]);

    const pokSearch = `https://pokeapi.co/api/v2/pokemon/${searchPok}`
    //const {name, types} = data;

    //setup initial table
    useEffect(() => {
        //origal
        //getPokemon(TBASEURL).then(res => setupPokemonTable(res.pokemon_species));
        const getData = async () => {
            const res = await fetch(BASEURL + TBASEURL);
            const data = await res.json();
            //console.log(data);
            const fetchedPokemon = data.pokemon_species;
            const urlMap = fetchedPokemon.map(thePokemon => `${BASEURL}pokemon/${thePokemon.name}`);    //using name to get pokemon url
            const regionUrlMap = fetchedPokemon.map(thePokemon => thePokemon.url);
            setFirstGenUrls(urlMap);
            setFirstGenRegionUrls(regionUrlMap);
            
            //start promise
            Promise.all(urlMap.map(url =>
                fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
            )).then(thePokemon => {
                setFirstGenContent(thePokemon); //set all content of first 151 pokemon
                setFirstTwennyContent(thePokemon.slice(0, 19)); //set first twenty pokemon content
            })
            //run function to get 5 random nums
            //
            console.log(firstTwennyContent);
        };
        getData(); 
    }, []);

    // add new pokemon form toggler
    const hideShowForm = () => {
        (hideForm ? setHideForm(false) : setHideForm(true));
        (hideForm ? setPokeballImg(emptyPbImg) : setPokeballImg(colorPbImg));
        (hideForm ? setImgAltText('show form') : setImgAltText('hide form'));
    }

    const changeSearchState = (buttonVal) => {
        ((buttonVal === 0) ? setSearchState(1) : setSearchState(2));
    }

    const changePok = (e) => {
        e.preventDefault();
        setSearchPok(newSearch);
        setSearchState(2)
    }

    const regionSelect = (buttonVal) => {
        switch(buttonVal){
            case 1:
                //search link
                break;
            default:
            
        }
        //set url to generation
    }

    return (
    <>
        <h1>Pokemon Adoption Center</h1>
        {/* header */}
        <p>add new pokemon here</p>
        {/* pokeheader */}
        <div>
            <NewPokemonHeader hideShowForm={hideShowForm} pokeballImg={pokeballImg} imgAltText={imgAltText} className='pbImg'></NewPokemonHeader>
            <FormSection>
                {(hideForm && searchState === 0) && <h2>Search Pokemon by:</h2>}
                {hideForm && <RenderForm changeSearchState={changeSearchState} searchState={searchState}></RenderForm>}
            </FormSection>
        </div>
        <p>search for pokemon in table here</p>
        {/* search section */}
        <p>adopted pokemanz</p>
        <TableSection>
            {/* add a header for region later*/}
            {firstTwennyContent && <tr><th>Name</th><th>Image</th><th>Type</th><th>Ability</th></tr>} 
            {firstTwennyContent && <RenderTableRow firstTwennyContent={firstTwennyContent}></RenderTableRow>}
        </TableSection>
    </> 
    );
};

export default PokemonApp;