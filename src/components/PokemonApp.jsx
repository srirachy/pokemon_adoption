import React, {useEffect, useState} from 'react';
import {nanoid} from 'nanoid';
import { useLocalStorage } from '../useLocalStorage';
import FormSection from './FormSection';
import NewPokemonHeader from './NewPokemonHeader';
import SearchField from './SearchField';
import RenderForm from './RenderForm';
import TableSection from './TableSection';
import RenderTableRow from './RenderTableRow';
import Button from './Button'
import emptyPbImg from "../img/empty_pokeball.svg";
import colorPbImg from "../img/color_pokeball.svg";
import '../scss/index.scss';

const GENONEURL = 'generation/1/';
const GENTWOURL = 'generation/2/';
const GENTHREEURL = 'generation/3/';
const GENFOURURL = 'generation/4/';
const GENFIVEURL = 'generation/5/';
const GENSIXURL = 'generation/6/';
const GENSEVENURL = 'generation/7/';
const GENEIGHTURL = 'generation/8/';
const BASEURL = 'https://pokeapi.co/api/v2/';
//list of pokemon 404'ing in api
const excludeList = ['deoxys', 'wormadam', 'giratina', 'shaymin', 'wormadam', 'giratina', 'shaymin', 
'basculin', 'darmanitan', 'thundurus', 'tornadus', 'keldeo', 'landorus', 'meloetta', 'aegislash', 
'meowstic', 'pumpkaboo', 'zygarde', 'gourgeist', 'morpeko', 'indeedee', 'eiscue', 'toxtricity', 'urshifu',
'oricorio', 'wishiwashi', 'lycanroc', 'minior', 'mimikyu', 'oricorio'];

const PokemonApp = () => {
    const [count, setCount] = useState(0);                  //counter for search
    const [isFound, setIsFound] = useState(false);
    const [sortCount, setSortCount] = useState(0);          //counter for sorts
    const [sortCount2, setSortCount2] = useState(0);
    const [sortCount3, setSortCount3] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [hideForm, setHideForm] = useState(false);
    const [pokeballImg, setPokeballImg] = useState(emptyPbImg); //hide/show toggle img button
    const [imgAltText, setImgAltText] = useState('show form');
    const [searchState, setSearchState] = useState(0);
    const [newSearch, setNewSearch] = useState('');
    const [searchPok, setSearchPok] = useState('');
    const [userPokemon, setUserPokemon] = useState({});
    const [fiveRandos, setFiveRandos] = useState([]);
    const [curFilter, setCurFilter] = useState('');
    const [alreadyExists, setAlreadyExists] = useState(false);
    const [tableContent, setTableContent] = useLocalStorage('pkmns', '');   //table the user views
    const [tableState, setTableState] = useState(tableContent);             //holds table state for filtering
    const [firstGenContent, setFirstGenContent] = useState([]);
    const [genTwoContent, setGenTwoContent] = useState([]);
    const [genThreeContent, setGenThreeContent] = useState([]);
    const [genFourContent, setGenFourContent] = useState([]);
    const [genFiveContent, setGenFiveContent] = useState([]);
    const [genSixContent, setGenSixContent] = useState([]);
    const [genSevenContent, setGenSevenContent] = useState([]);
    const [genEightContent, setGenEightContent] = useState([]);

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

    //use effect when user searches for pokemon
    useEffect(() => {
        findPokemon(searchPok);
    }, [count, searchPok])

    //if user pokemon found, change search state to the data view
    useEffect(() => {
        if(isFound === true && alreadyExists === false){
            changeSearchState(3);
        }
    }, [isFound, alreadyExists])

    //reset searchPok when changing views from adding pokemon (mostly for warning message if pokemon not found)
    useEffect(() => {
        if (searchState !== 2){
            setSearchPok('');
        }
    }, [searchState])

    //disable search if add field is empty
    useEffect(() => {
        if (newSearch.length > 0){
            setIsDisabled(false);
        } else{
            setIsDisabled(true);
        }
    }, [newSearch])

    //initial load of all pokemon according to their generation
    const loadGen = (genUrl, regionNum) => {
        const getData = async () => {
            const res = await fetch(BASEURL + genUrl);
            const data = await res.json();
            let fetchedPokemon = {};
            //fetch pokemon but exclude the ones 404'ing in the api
            fetchedPokemon = data.pokemon_species.filter(thePokemon => !excludeList.includes(thePokemon.name));
            const urlMap = fetchedPokemon.map(thePokemon => `${BASEURL}pokemon/${thePokemon.name}`);    //using name to get pokemon url
            switch(regionNum){
                case 1: //kanto                    
                    //start promise
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setFirstGenContent(successfulPromises); //set all content of first 151 pokemon
                        //setTableContent(successfulPromises.slice(0, 19)); //set first twenty pokemon content
                        //setTableState(successfulPromises.slice(0, 19));
                    }).catch(function(err){
                        console.log(err.message);
                    })
                    break;
                case 2: //johto
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenTwoContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message);
                    })
                    break;
                case 3: //hoenn
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);    //once we filter, we map for the thing we're looking for to avoid for eachs or any other repetitive iteration
                        setGenThreeContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message);
                    })
                    break;
                case 4: //sinnoh
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenFourContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message);
                    })
                    break;
                case 5: //unova
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenFiveContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message);
                    })
                    break;
                case 6: //kallos
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenSixContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message);
                    })
                    break;
                case 7: //alola
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenSevenContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message);
                    })
                    break;
                default: //galar
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenEightContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message);
                    })
            }
        }
        getData();
    }

    //add new pokemon form toggler
    const hideShowForm = () => {
        (hideForm ? setHideForm(false) : setHideForm(true));
        (hideForm ? setPokeballImg(emptyPbImg) : setPokeballImg(colorPbImg));
        (hideForm ? setImgAltText('show form') : setImgAltText('hide form'));
    }

    // change views for adding pokemon section
    const changeSearchState = (buttonVal) => {
        setSearchState(buttonVal);
        if(buttonVal === 1){
            setNewSearch('');
        } else if(buttonVal === 2){
            setFiveRandos([]);
        }
    }

    //event handler for filter pokemon field
    const handleFilter = (filter) => {
        setCurFilter(filter);
        const filtered = [...tableState].filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
        setTableContent(filtered);
    }

    //event handler for single search pokemon
    const changePok = (e) => {
        e.preventDefault();
        const thePkmn = filterAll(newSearch);
        const inTable = checkTable(thePkmn);
        if (inTable === true){
            setAlreadyExists(inTable);
        } else{
            setSearchPok(newSearch);
            setCount(prevCount => prevCount + 1);
        }
    }

    //call function to populate state w/ five random pokemon from user chosen generation
    const changeGenPok = (buttonVal) => {
        populateFiveRandos(buttonVal);
        changeSearchState(4);
    }

    //add single pokemon
    const addPkmn = (pkmnName) => {
        const thePkmn = filterAll(pkmnName);
        //console data for debugging
        console.log('from addPkmn:')
        console.log(thePkmn);
        const inTable = checkTable(thePkmn);
        if (inTable === true){
            setAlreadyExists(inTable);
        } else{
            //add to table state
            addToState(thePkmn);
            //reset
            setAlreadyExists(inTable);
            changeSearchState(0);
        }
    }

    //same above but for generation
    const addGenPkmn = (pkmnName) => {
        const thePkmn = filterAll(pkmnName);
        //console data for debugging
        console.log('from genPkmn:')
        console.log(thePkmn);
        const inTable = checkTable(thePkmn);
        setUserPokemon(pkmnName);
        if(inTable === true){
            setAlreadyExists(inTable);
        } else{
            setAlreadyExists(inTable);
            setUserPokemon('');
            addToState(thePkmn);
        }
    }

    // helper to check if pokemon already exists in adopted table view
    const checkTable = (pkmnData) => {
        let doesExist = false;
        if (tableContent.includes(pkmnData)){
            doesExist = true;
        } else{
            doesExist = false;
        }
        return doesExist;
    };

    // adds pokemon to table state and table content
    const addToState = (pkmnData) => {
        setTableState(tableState => ([
            ...tableState,
            pkmnData
        ]));
        setTableContent(tableContent => ([
            ...tableContent,
            pkmnData
        ]));
    }

    //remove pokemon from table
    const removePkmn = (pkmnName) => {
        const filtered = [...tableState].filter(p => p.name.toLowerCase() !== pkmnName.toLowerCase());
        setTableState(filtered);
        setTableContent(filtered);
    }

    //populate five rando state according to user selected generation
    const populateFiveRandos = (theGen) => {
        let genMax = 0;

        switch(theGen){
            case 1:
                genMax = firstGenContent.length-1
                for(let i = 0; i < 5; i ++){
                    let randoPkmnVal = Math.floor(Math.random() * genMax);
                    let randomPkmn = firstGenContent[randoPkmnVal];
                    setFiveRandos(fiveRandos => ([
                        ...fiveRandos,
                        randomPkmn
                    ]));
                };
                break;
            case 2:
                genMax = genTwoContent.length-1
                for(let i = 0; i < 5; i ++){
                    let randoPkmnVal = Math.floor(Math.random() * genMax);
                    let randomPkmn = genTwoContent[randoPkmnVal];
                    setFiveRandos(fiveRandos => ([
                        ...fiveRandos,
                        randomPkmn
                    ]));
                };
                break;
            case 3:
                genMax = genThreeContent.length-1
                for(let i = 0; i < 5; i ++){
                    let randoPkmnVal = Math.floor(Math.random() * genMax);
                    let randomPkmn = genThreeContent[randoPkmnVal];
                    setFiveRandos(fiveRandos => ([
                        ...fiveRandos,
                        randomPkmn
                    ]));
                };
                break;
            case 4:
                genMax = genFourContent.length-1
                for(let i = 0; i < 5; i ++){
                    let randoPkmnVal = Math.floor(Math.random() * genMax);
                    let randomPkmn = genFourContent[randoPkmnVal];
                    setFiveRandos(fiveRandos => ([
                        ...fiveRandos,
                        randomPkmn
                    ]));
                };
                break;
            case 5:
                genMax = genFiveContent.length-1
                for(let i = 0; i < 5; i ++){
                    let randoPkmnVal = Math.floor(Math.random() * genMax);
                    let randomPkmn = genFiveContent[randoPkmnVal];
                    setFiveRandos(fiveRandos => ([
                        ...fiveRandos,
                        randomPkmn
                    ]));
                };
                break;
            case 6:
                genMax = genSixContent.length-1
                for(let i = 0; i < 5; i ++){
                    let randoPkmnVal = Math.floor(Math.random() * genMax);
                    let randomPkmn = genSixContent[randoPkmnVal];
                    setFiveRandos(fiveRandos => ([
                        ...fiveRandos,
                        randomPkmn
                    ]));
                };
                break;
            case 7:
                genMax = genSevenContent.length-1
                for(let i = 0; i < 5; i ++){
                    let randoPkmnVal = Math.floor(Math.random() * genMax);
                    let randomPkmn = genSevenContent[randoPkmnVal];
                    setFiveRandos(fiveRandos => ([
                        ...fiveRandos,
                        randomPkmn
                    ]));
                };
                break;
            default:    //gen 8 by default
                genMax = genEightContent.length-1
                for(let i = 0; i < 5; i ++){
                    let randoPkmnVal = Math.floor(Math.random() * genMax);
                    let randomPkmn = genEightContent[randoPkmnVal];
                    setFiveRandos(fiveRandos => ([
                        ...fiveRandos,
                        randomPkmn
                    ]));
                };
        };
    };
    
    // find user selected pokemon
    const findPokemon = (curPokemon) => {
        const foundPokemon = filterAll(curPokemon);
        let didFind = false;
        if (typeof foundPokemon === 'object'){
            didFind = true;
            setUserPokemon(foundPokemon);
        };
        setIsFound(didFind);
    };

    //helper to find pokemon regardless of generation
    const filterAll = (curPokemon) => {
        const pokeData = [...firstGenContent, ...genTwoContent, ...genThreeContent, ...genFourContent, ...genFiveContent, 
            ...genSixContent, ...genSevenContent, ...genEightContent].find(({name}) => name === curPokemon);

        return pokeData;
    };

    //helper to sort pokemon by name
    const handleSortName = () => {
        const initPok = [...tableContent]
        if (sortCount % 3 === 2){
            setTableContent(tableState);
        } else if (sortCount % 3 === 1){
            sortDesc(initPok, 0);
        } else {
            sortAsc(initPok, 0);
        };

        setSortCount(prevCount => prevCount+1);
        setSortCount2(0);
        setSortCount3(0);
    };

    //helper to sort pokemon by type
    const handleSortType = () => {
        const initPok = [...tableContent]
        if (sortCount2 % 3 === 2){
            setTableContent(tableState);
        } else if (sortCount2 % 3 === 1){
            sortDesc(initPok, 1);
        } else {
            sortAsc(initPok, 1);
        }
        setSortCount(0);
        setSortCount2(prevCount => prevCount+1);
        setSortCount3(0);
    };

    //helper to sort pokemon by ability
    const handleSortAb = () => {
        const initPok = [...tableContent]
        if (sortCount3 % 3 === 2){
            setTableContent(tableState);
        } else if (sortCount3 % 3 === 1){
            sortDesc(initPok, 2);
        } else {
            sortAsc(initPok, 2);
        }
        setSortCount(0);
        setSortCount2(0);
        setSortCount3(prevCount => prevCount+1);
    };

    //helper to sort ascending
    const sortAsc = (sortPok, sortNum) => {
        let nameA = ''
        let nameB = ''
        const sortedPok = sortPok.sort(function (a, b) {
            switch (sortNum) {
                case 1:
                    nameA = a.types[0].type.name.toLowerCase();
                    nameB = b.types[0].type.name.toLowerCase();
                    break;
                case 2:
                    nameA = a.abilities[0].ability.name.toLowerCase();
                    nameB = b.abilities[0].ability.name.toLowerCase();
                    break;
                default:
                    nameA = a.name.toLowerCase();
                    nameB = b.name.toLowerCase();

            };
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
        });   
        setTableContent(sortedPok);
    };

    //helper to sort descending
    const sortDesc = (sortPok, sortNum) => {
        let nameA = '';
        let nameB = '';
        const sortedPok = sortPok.sort(function (a, b) {
            switch (sortNum) {
                case 1:
                    nameA = a.types[0].type.name.toLowerCase();
                    nameB = b.types[0].type.name.toLowerCase();
                    break;
                case 2:
                    nameA = a.abilities[0].ability.name.toLowerCase();
                    nameB = b.abilities[0].ability.name.toLowerCase();
                    break;
                default:
                    nameA = a.name.toLowerCase();
                    nameB = b.name.toLowerCase();

            };
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            // names must be equal
            return 0;
        });   
        setTableContent(sortedPok);
    }; 

    return (
    <>
        {/* header */}
        <h1>Shiny Pokemon Adoption Center</h1>
        {/* search section */}
        <div>
            <NewPokemonHeader hideShowForm={hideShowForm} pokeballImg={pokeballImg} imgAltText={imgAltText} className='pbImg'></NewPokemonHeader>
            <FormSection>
                {(hideForm && searchState === 0) && <h2>Search Pokemon by:</h2>}
                {(hideForm && searchState !== 4) && <RenderForm changeSearchState={changeSearchState} searchState={searchState} newSearch={newSearch} setNewSearch={setNewSearch} changePok={changePok} 
                searchPok={searchPok} userPokemon={userPokemon} changeGenPok={changeGenPok} addPkmn={addPkmn} isDisabled={isDisabled}></RenderForm>}
                {/* mostly for when searching 5 randos -- add table */}
                {(hideForm && searchState === 4) && <TableSection className='search_five_randos'>
                    <tr><th>Add</th><th>Name</th><th>Image</th><th>Type</th><th>Ability</th></tr>
                    <RenderForm changeSearchState={changeSearchState} searchState={searchState} fiveRandos={fiveRandos} addGenPkmn={addGenPkmn}></RenderForm></TableSection>}
            </FormSection>
            {/* notify user if pokemon was not found */}
            {(!isFound && searchPok) && <p color='red'>Unable to find {searchPok}</p>}
            {/* notify user if pokemon already exists in adopted table */}
            {(alreadyExists && (searchState === 4 || searchState === 3)) && <p>{userPokemon} already exists</p>}
            {(hideForm && searchState === 4) && <Button key={nanoid()} children='Back' onClick={() => changeSearchState(2)}></Button>}
        </div>
        {/* filter section */}
        <SearchField curFilter={curFilter} handleFilter={handleFilter}></SearchField>
        {/* table section */}
        <TableSection className='adopted_pkmn'>
            {tableContent && <tr><th id="text" onClick={handleSortName}>Name</th><th >Image</th><th id="text" onClick={handleSortType}>Type</th><th id='text' onClick={handleSortAb}>Ability</th><th>Remove</th></tr>}
            {tableContent && <RenderTableRow tableContent={tableContent} removePkmn={removePkmn}></RenderTableRow>}
        </TableSection>
    </> 
    );
};

export default PokemonApp;