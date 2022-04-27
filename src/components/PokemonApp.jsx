import React, {useEffect, useState} from 'react';
import FormSection from './FormSection';
import NewPokemonHeader from './NewPokemonHeader';
import SearchField from './SearchField';
import RenderForm from './RenderForm';
import TableSection from './TableSection';
import RenderTableRow from './RenderTableRow';
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

const PokemonApp = () => {
    const [count, setCount] = useState(0);                  //counter for search
    const [isFound, setIsFound] = useState(false);
    const [sortCount, setSortCount] = useState(0);          //counter for sorts
    const [sortCount2, setSortCount2] = useState(0);
    const [sortCount3, setSortCount3] = useState(0);
    const [hideForm, setHideForm] = useState(false);
    const [pokeballImg, setPokeballImg] = useState(emptyPbImg);
    const [imgAltText, setImgAltText] = useState('show form');
    const [searchState, setSearchState] = useState(0);
    const [newSearch, setNewSearch] = useState('');
    const [searchPok, setSearchPok] = useState('');
    const [userPokemon, setUserPokemon] = useState({});
    const [fiveRandos, setFiveRandos] = useState([]);
    const [curFilter, setCurFilter] = useState('');
    const [tableContent, setTableContent] = useState([]);   //table the user views
    const [tableState, setTableState] = useState([]);       //holds table state for filtering
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

    //if user pokemon found, then change state else mini error message
    useEffect(() => {
        if(isFound === true){
            changeSearchState(3);
        } else{
            //alert(`did not find ${searchPok}`);
            console.log(`did not find ${searchPok}`)
        }
    }, [isFound])

    //initial load of all pokemon according to their generation
    const loadGen = (genUrl, regionNum) => {
        const getData = async () => {
            const res = await fetch(BASEURL + genUrl);
            const data = await res.json();
            let fetchedPokemon = {};
            fetchedPokemon = data.pokemon_species
            const urlMap = fetchedPokemon.map(thePokemon => `${BASEURL}pokemon/${thePokemon.name}`);    //using name to get pokemon url
            switch(regionNum){
                case 1: //kanto                    
                    //start promise
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setFirstGenContent(successfulPromises); //set all content of first 151 pokemon
                        setTableContent(successfulPromises.slice(0, 19)); //set first twenty pokemon content
                        setTableState(successfulPromises.slice(0, 19));
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                case 2: //johto
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
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenSevenContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message)
                    })
                    break;
                default: //galar
                    Promise.allSettled(urlMap.map(url =>
                        fetch(url).then(resp => resp.json()) //could do resp.text() for single line info, resp.json() for object info
                    )).then(thePokemon => {
                        const successfulPromises = thePokemon.filter(p => p.status === 'fulfilled').map(result => result.value);
                        setGenEightContent(successfulPromises); //set content fetched pokemon
                    }).catch(function(err){
                        console.log(err.message)
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
        setSearchPok(newSearch);
        setCount(prevCount => prevCount + 1);
    }

    //call function to populate state w/ five random pokemon from user chosen generation
    const changeGenPok = (buttonVal) => {
        populateFiveRandos(buttonVal);
        changeSearchState(4);
    }

    //add single pokemon
    const addPkmn = () => {
        const thePkmn = userPokemon;
        //add to table state
        setTableState(tableState => ([
            ...tableState,
            thePkmn
        ]));
        //add to table view
        setTableContent(TableContent => ([
            ...TableContent,
            thePkmn
        ]));
        //reset
        changeSearchState(0)
    }

    //same above but for generation
    const addMultiplePkmn = (pkmnName) => {
        const thePkmn = filterAll(pkmnName);
        setTableState(tableState => ([
            ...tableState,
            thePkmn
        ]));
        setTableContent(TableContent => ([
            ...TableContent,
            thePkmn
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
                }
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
                }
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
                }
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
                }
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
                }
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
                }
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
                }
                break;
            case 8:
                genMax = genEightContent.length-1
                for(let i = 0; i < 5; i ++){
                    let randoPkmnVal = Math.floor(Math.random() * genMax);
                    let randomPkmn = genEightContent[randoPkmnVal];
                    setFiveRandos(fiveRandos => ([
                        ...fiveRandos,
                        randomPkmn
                    ]));
                }
                break;
            default:
                //shouldn't happen
        }
    }
    
    const findPokemon = (curPokemon) => {
        const foundPokemon = filterAll(curPokemon);
        let didFind = false;
        if (typeof foundPokemon === 'object'){
            didFind = true;
            setUserPokemon(foundPokemon)
        }
        setIsFound(didFind);
    }

    const filterAll = (curPokemon) => {
        const pokeData = [...firstGenContent, ...genTwoContent, ...genThreeContent, ...genFourContent, ...genFiveContent, 
            ...genSixContent, ...genSevenContent, ...genEightContent].find(({name}) => name === curPokemon);

        return pokeData;
    }

    const handleSortName = () => {
        const initPok = [...tableContent]
        if (sortCount % 3 === 2){
            setTableContent(tableState);
        } else if (sortCount % 3 === 1){
            sortDesc(initPok, 0)
        } else {
            sortAsc(initPok, 0)
        }

        setSortCount(prevCount => prevCount+1);
        setSortCount2(0);
        setSortCount3(0);
    };

    const handleSortType = () => {
        const initPok = [...tableContent]
        if (sortCount2 % 3 === 2){
            setTableContent(tableState);
        } else if (sortCount2 % 3 === 1){
            sortDesc(initPok, 1)
        } else {
            sortAsc(initPok, 1)
        }
        setSortCount(0);
        setSortCount2(prevCount => prevCount+1);
        setSortCount3(0);
    };

    const handleSortAb = () => {
        const initPok = [...tableContent]
        if (sortCount3 % 3 === 2){
            setTableContent(tableState);
        } else if (sortCount3 % 3 === 1){
            sortDesc(initPok, 2)
        } else {
            sortAsc(initPok, 2)
        }
        setSortCount(0);
        setSortCount2(0);
        setSortCount3(prevCount => prevCount+1);
    };

    const sortAsc = (sortPok, sortNum) => {
        let nameA = ''
        let nameB = ''
        const sortedPok = sortPok.sort(function (a, b) {
            switch (sortNum) {
                case 1:
                    nameA = a.types[0].type.name.toLowerCase(); // ignore upper and lowercase
                    nameB = b.types[0].type.name.toLowerCase(); // ignore upper and lowercase
                    break;
                case 2:
                    nameA = a.abilities[0].ability.name.toLowerCase(); // ignore upper and lowercase
                    nameB = b.abilities[0].ability.name.toLowerCase(); // ignore upper and lowercase
                    break;
                default:
                    nameA = a.name.toLowerCase(); // ignore upper and lowercase
                    nameB = b.name.toLowerCase(); // ignore upper and lowercase

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
    }

    const sortDesc = (sortPok, sortNum) => {
        let nameA = '';
        let nameB = '';
        const sortedPok = sortPok.sort(function (a, b) {
            switch (sortNum) {
                case 1:
                    nameA = a.types[0].type.name.toLowerCase(); // ignore upper and lowercase
                    nameB = b.types[0].type.name.toLowerCase(); // ignore upper and lowercase
                    break;
                case 2:
                    nameA = a.abilities[0].ability.name.toLowerCase(); // ignore upper and lowercase
                    nameB = b.abilities[0].ability.name.toLowerCase(); // ignore upper and lowercase
                    break;
                default:
                    nameA = a.name.toLowerCase(); // ignore upper and lowercase
                    nameB = b.name.toLowerCase(); // ignore upper and lowercase

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
    } 

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
                searchPok={searchPok} userPokemon={userPokemon} changeGenPok={changeGenPok} addPkmn={addPkmn}></RenderForm>}
                {/* mostly for when searching 5 randos -- add table */}
                {(hideForm && searchState === 4) && <TableSection className='search_five_randos'>
                    <tr><th>Add</th><th>Name</th><th>Image</th><th>Type</th><th>Ability</th></tr>
                    <RenderForm changeSearchState={changeSearchState} searchState={searchState} fiveRandos={fiveRandos} addMultiplePkmn={addMultiplePkmn}></RenderForm></TableSection>}
            </FormSection>
            {/* let user know if pokemon was not found */}
            {(!isFound && newSearch) && <p>Unable to find {newSearch}</p>}
        </div>
        {/* filter section */}
        <SearchField curFilter={curFilter} handleFilter={handleFilter}></SearchField>
        {/* table section */}
        <TableSection className='adopted_pkmn'>
            {tableContent && <tr ><th id="text" onClick={handleSortName}>Name</th><th >Image</th><th id="text" onClick={handleSortType}>Type</th><th id='text' onClick={handleSortAb}>Ability</th><th>Remove</th></tr>}
            {tableContent && <RenderTableRow tableContent={tableContent} removePkmn={removePkmn}></RenderTableRow>}
        </TableSection>
    </> 
    );
};

export default PokemonApp;