import React, {useEffect, useState} from 'react';
import RenderImages from './RenderImages';
import Image from './Image';

const BASETABLEURL = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
const BASEURL = 'https://pokeapi.co/api/v2/'
let searchPokemon = '';
//way to search singular pokemon example
//https://pokeapi.co/api/v2/pokemon/ditto
//way to search type example
//https://pokeapi.co/api/v2/type/3
//way to populate initial table w/ 100 pokemon
//https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'

const PokemonApp = () => {
    const [firstHunnitName, setFirstHunnitName] = useState(null);
    const [firstHunnitUrl, setFirstHunnitUrl] = useState(null);
    // const [firstHunnitImg, setFirstHunnitImg] = useState(null);
    // const [pokemonUrl, setPokemonUrl] = useState('');
    // const [pokemonAlt, setPokemonAlt] = useState('');
    const [firstHunnit, setFirstHunnit] = useState([]);
    const [oneImg, setOneImg] = useState('');
    // const [firstHunnitImg, setFirstHunnitImg] = useState(null);
    // const [firstHunnitAlt, setFirstHunnitAlt] = useState(null);
    //let initialPokemonState = firstHunnit;
    //let pokemonNames = firstHunnit.map(thePokemon => thePokemon.results.name)
    //const {results} = firstHunnit;

    //useEffect for creating the initial table
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(BASETABLEURL);
            const data = await res.json();
            console.log(data);
            const fetchedPokemon = data.results;
            console.log(fetchedPokemon.map(thePokemon => thePokemon.name));
            const nameMap = fetchedPokemon.map(thePokemon => thePokemon.name);
            //const urlMap = fetchedPokemon.map(thePokemon => thePokemon.url);
            setFirstHunnitName(nameMap);
            //setFirstHunnitUrl(urlMap);
            //good starting point
            // const pokemonNames = data.results[0].name;
            // console.log(`Pokemon Names: ${pokemonNames}`)
            // setFirstHunnit(pokemonNames);
            // console.log(firstHunnit + "meow");
        };
        getData();
    }, []);

    useEffect(() => {
        getPokemon('pokemon/?limit=20&offset=0').then(res => setupPokemonTable(res.results));
    }, [])

    //fetch for pokemon
    const getPokemon = (url) => {
        return fetch(BASEURL + url)
        .then(result => {
            return result.json();
        })
    }

    //call getPokemon

    //function to setup pokemon table?
    const setupPokemonTable = (list) => {
        list.forEach(pokemon => {
            //console.log(pokemon.name);
            const pName = pokemon.name;
            getPokemon('pokemon/' + pName).then(res => {
                const img = res.sprites.front_default;
                //console.log(img);
                // setFirstHunnitImg(img);
                const updatedVal = {imgUrl: img, altText: pName};
                setFirstHunnit(firstHunnit => ([
                    ...firstHunnit,
                    updatedVal
                ]));
                //console.log(img)
                //setOneImg(img);
            });//
            //console.log(imgElmts[pokemon]);
        })
        console.log(firstHunnit);
    }

    // const checkPokemon = () => {
    //     const initialPokemonState = firstHunnit;
    //     const pokemonNames = firstHunnit.map(thePokemon => thePokemon.results.name)
    // }


    return (
    <>
        <h1>See console for api data!</h1>
        {firstHunnitName && <p>{firstHunnitName}</p>}
        {firstHunnitUrl && <p>{firstHunnitUrl}</p>}

        {firstHunnit && <RenderImages firstHunnit={firstHunnit}></RenderImages>}

    </> 
    );
};

export default PokemonApp;