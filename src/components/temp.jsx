import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PokemonSearch = () => {
const [data, setData] = useState ({
  name: '',
});
const [newSearch, setNewSearch] = useState('');
const [searchPok, setSearchPok] = useState('ditto');
const pokSearch = `https://pokeapi.co/api/v2/pokemon/${searchPok}`
const {name, types} = data;
useEffect(() => {
  axios
    .get(pokSearch)
    .then((res) => {
      console.log(res.data)
      setData(res.data)
    })
    .catch((err) => console.log(err));
}, [pokSearch]);
const changePok = (e) => {
  e.preventDefault();
  setSearchPok(newSearch)
}
  return(<>
    <section>
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
      </form>
    </section>

</>
  );
};
export default PokemonSearch;