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
const GENONEURL = 'generation/1/';
const GENTWOURL = 'generation/2/';
const GENTHREEURL = 'generation/3/';
const GENFOURURL = 'generation/4/';
const GENFIVEURL = 'generation/5/';
const GENSIXURL = 'generation/6/';
const GENSEVENURL = 'generation/7/';
const GENEIGHTURL = 'generation/8/';
const BASEURL = 'https://pokeapi.co/api/v2/';
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
    const [searchPok, setSearchPok] = useState('');
    const [userPokemon, setUserPokemon] = useState({});
    const [firstGenUrls, setFirstGenUrls] = useState([]);
    const [firstGenRegionUrls, setFirstGenRegionUrls] = useState([]);
    const [firstGenContent, setFirstGenContent] = useState([]);
    const [firstTwennyContent, setFirstTwennyContent] = useState([]);   //10
    const [genTwoUrls, setGenTwoUrls] = useState([]);
    const [genTwoRegionalUrls, setGenTwoRegionUrls] = useState([])
    const [genTwoContent, setGenTwoContent] = useState([]);
    const [genThreeUrls, setGenThreeUrls] = useState([]);
    const [genThreeRegionalUrls, setGenThreeRegionUrls] = useState([])
    const [genThreeContent, setGenThreeContent] = useState([]);
    const [genFourUrls, setGenFourUrls] = useState([]);
    const [genFourRegionalUrls, setGenFourRegionUrls] = useState([])
    const [genFourContent, setGenFourContent] = useState([]);
    const [genFiveUrls, setGenFiveUrls] = useState([]);                 //20
    const [genFiveRegionalUrls, setGenFiveRegionUrls] = useState([])
    const [genFiveContent, setGenFiveContent] = useState([]);
    const [genSixUrls, setGenSixUrls] = useState([]);
    const [genSixRegionalUrls, setGenSixRegionUrls] = useState([])
    const [genSixContent, setGenSixContent] = useState([]);
    const [genSevenUrls, setGenSevenUrls] = useState([]);
    const [genSevenRegionalUrls, setGenSevenRegionUrls] = useState([])
    const [genSevenContent, setGenSevenContent] = useState([]);
    const [genEightUrls, setGenEightUrls] = useState([]);
    const [genEightRegionalUrls, setGenEightRegionUrls] = useState([])  //30
    const [genEightContent, setGenEightContent] = useState([]);
    const [genPok, setGenPok] = useState(0);
    const [count, setCount] = useState(0);

    //setup initial table
    useEffect(() => {
        loadGen(GENONEURL, 1);
        loadGen(GENTWOURL, 2);
        loadGen(GENTHREEURL, 3);
        loadGen(GENFOURURL, 4);
        loadGen(GENFIVEURL, 5);
        loadGen(GENSIXURL, 6);
        loadGen(GENSEVENURL, 7);
        loadGen(GENEIGHTURL, 8);
    }, []);

    //kanto, johto, hoenn, sinnoh, unova, kalos, alola, galar
    const loadGen = (genUrl, regionNum) => {
        const getData = async () => {
            const res = await fetch(BASEURL + genUrl);
            const data = await res.json();
            let fetchedPokemon = {};
            fetchedPokemon = data.pokemon_species
            const urlMap = fetchedPokemon.map(thePokemon => `${BASEURL}pokemon/${thePokemon.name}`);    //using name to get pokemon url
            const regionUrlMap = fetchedPokemon.map(thePokemon => thePokemon.url);
            switch(regionNum){
                case 1: //kanto
                    setFirstGenUrls(urlMap);
                    setFirstGenRegionUrls(regionUrlMap);
                    
                    //start promise
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setFirstGenContent(successfulPromises); //set all content of first 151 pokemon
                        setFirstTwennyContent(successfulPromises.slice(0, 19)); //set first twenty pokemon content
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                case 2: //johto
                    setGenTwoUrls(urlMap);
                    setGenTwoRegionUrls(regionUrlMap);

                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenTwoContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                case 3: //hoenn
                    setGenThreeUrls(urlMap);
                    setGenThreeRegionUrls(regionUrlMap);

                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);    //once we filter, we map for the thing we're looking for to avoid for eachs or any other repetitive iteration
                        setGenThreeContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                case 4: //sinnoh
                    setGenFourUrls(urlMap);
                    setGenFourRegionUrls(regionUrlMap);

                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenFourContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                case 5: //unova
                    setGenFiveUrls(urlMap);
                    setGenFiveRegionUrls(regionUrlMap);

                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenFiveContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                case 6: //kallos
                    setGenSixUrls(urlMap);
                    setGenSixRegionUrls(regionUrlMap);

                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenSixContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                case 7: //alola
                    setGenSevenUrls(urlMap);
                    setGenSevenRegionUrls(regionUrlMap);

                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenSevenContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                case 8: //galar
                    setGenEightUrls(urlMap);
                    setGenEightRegionUrls(regionUrlMap);

                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenEightContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                default:
                    //this shouldnt happen
            
            }
        }
        getData();
    }
    

    // add new pokemon form toggler
    const hideShowForm = () => {
        (hideForm ? setHideForm(false) : setHideForm(true));
        (hideForm ? setPokeballImg(emptyPbImg) : setPokeballImg(colorPbImg));
        (hideForm ? setImgAltText('show form') : setImgAltText('hide form'));
    }

    const changeSearchState = (buttonVal) => {
        setSearchState(buttonVal);
        if(buttonVal === 1){
            setNewSearch('');
        }
    }

    const changePok = (e) => {
        e.preventDefault();
        setSearchPok(newSearch);
        setCount(prevCount => prevCount + 1);
    }

    const changeGenPok = (buttonVal) => {
        //setGenPok(buttonVal);
        changeSearchState(4);
        console.log(buttonVal);
    }

    //use effect when user searches for pokemon
    useEffect(() => {
        const isFound = findPokemon(searchPok);
        if(isFound === true){
            changeSearchState(3);
        } else{
            alert(`did not find ${searchPok}`);
        }
    }, [count])
    
    const findPokemon = (curPokemon) => {
        const foundPokemon = filterAll(curPokemon);
        let didFind = false;
        if (typeof foundPokemon === 'object'){
            didFind = true;
            setUserPokemon(foundPokemon)
        }
        return didFind;
    }

    const filterAll = (curPokemon) => {
        const pokeData = [...firstGenContent, ...genTwoContent, ...genThreeContent, ...genFourContent, ...genFiveContent, 
            ...genSixContent, ...genSevenContent, ...genEightContent].find(({name}) => name === curPokemon);
        
        return pokeData;
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
        {/* header */}
        <h1>Pokemon Adoption Center</h1>
        {/* pokeheader */}
        <div>
            <NewPokemonHeader hideShowForm={hideShowForm} pokeballImg={pokeballImg} imgAltText={imgAltText} className='pbImg'></NewPokemonHeader>
            <FormSection>
                {(hideForm && searchState === 0) && <h2>Search Pokemon by:</h2>}
                {hideForm && <RenderForm changeSearchState={changeSearchState} searchState={searchState} newSearch={newSearch} setNewSearch={setNewSearch} changePok={changePok} searchPok={searchPok} userPokemon={userPokemon} changeGenPok={changeGenPok}></RenderForm>}
            </FormSection>
        </div>
        {/* search section */}
        <h1>search pokemanz here</h1>
        {/* table section */}
        <p>adopted pokemanz</p>
        <TableSection className='adopted_pkmn'>
            {/* add a header for region later*/}
            {firstTwennyContent && <tr><th>Name</th><th>Image</th><th>Type</th><th>Ability</th></tr>} 
            {firstTwennyContent && <RenderTableRow firstTwennyContent={firstTwennyContent}></RenderTableRow>}
        </TableSection>
    </> 
    );
};

export default PokemonApp;