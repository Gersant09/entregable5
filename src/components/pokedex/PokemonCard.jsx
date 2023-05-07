import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const bordersByType = {
  grass: "border-green-500",
  fire: "border-red-700",
  water: "border-blue-500",
  bug: "border-yellow-500",
  normal:"border-indigo-500",
  flying:"border-sky-500",
  fighting:"border-red-500",
  poison: "border-purple-700",
  ground:"border-yellow-950",
  rock:"border-stone-600",
  ghost:"border-violet-800",
  steel:"border-zinc-500",
  electric:"border-yellow-300",
  psychic:"border-blue-700",
  ice:"border-blue-400",
  dragon:"border-sky-400",
  dark:"border-black",
  fairy:"border-pink-400",
  unknown:"",
  shadow:""
}

const backgroundByType = {
  grass: " from-cyan-500 to-green-500",
  fire: " from-red-700 to-black",
  water: "from-blue-500 to-black",
  bug: "from-yellow-500 to-green-200",
  normal:"from-indigo-500 to-white",
  flying:"from-sky-500 to-white",
  fighting:"from-red-700",
  poison: "from-purple-700 ",
  ground:"from-yellow-950 to-yellow-700",
  rock:"from-stone-700 to-stone-400",
  ghost:"from-fuchsia-800 to-lime-800",
  steel:"from-zinc-500 to-white",
  electric:"from-yellow-600 to-yellow-300",
  psychic:"from-emerald-600 to-blue-700",
  ice:"from-blue-400 to-white",
  dragon:"from-sky-400 to-yellow-200",
  dark:"from-black to-violet-950",
  fairy:"from-rose-400 to-white",
  unknown:"",
  shadow:""
}


const textByType = {
  grass: "text-green-500",
  fire: "text-red-700",
  water: "text-blue-500",
  bug: "text-yellow-500",
  normal:"text-indigo-500",
  flying:"text-sky-500",
  fighting:"text-red-500",
  poison: "text-purple-700",
  ground:"text-yellow-950",
  rock:"text-stone-600",
  ghost:"text-violet-800",
  steel:"text-zinc-500",
  electric:"text-yellow-300",
  psychic:"text-blue-700",
  ice:"text-blue-400",
  dragon:"text-sky-400",
  dark:"text-black",
  fairy:"text-pink-400",
  unknown:"",
  shadow:""
}

const PokemonCard = ({pokemonUrl}) => {
  const [pokemon, setPokemon] = useState()

  const types = pokemon?.types.slice(0,2).map(type=> type.type.name).join(" / ")

  useEffect(() => {
    axios.get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))
  }, [])


  

  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 sm:max-w-[230px] rounded-md ${bordersByType[pokemon?.types[0].type.name]} `}>

     
       {/*seccion superior*/}
       <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
        <div className='absolute -bottom-12 w-[150px] left-1/2 -translate-x-1/2'>
          <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </div>
      </section>

      {/*seccion inferior*/}
      <section>
        <h3 className={`mt-10 font-bold capitalize ${textByType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
        <h4>{types}</h4>
        <span>Types</span>
        <hr />

        <section className='grid grid-cols-3 gap-2 p-2 font-normal'>
          {
            pokemon?.stats.map(stat=> (
              <div key={stat.stat.name}>
                <h5>{stat.stat.name}</h5>
                <span>{stat.base_stat}</span>
              </div>
            ))
          }
        </section>
      </section>
     

    </Link>
  )
}

export default PokemonCard
