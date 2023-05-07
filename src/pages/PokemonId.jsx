import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PokemonId = () => {

    const [pokemon, setPokemon] = useState()


    const { id } = useParams()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
        axios.get(URL)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    }, [])


    const getPercentStatBar = (stat_base) => {
        const percentBarProgres = Math.floor((stat_base * 100) / 255)
        return `${percentBarProgres}%`
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


      const bgByType = {
        grass: "bg-green-500",
        fire: "bg-red-700",
        water: "bg-blue-500",
        bug: "bg-yellow-500",
        normal:"bg-indigo-500",
        flying:"bg-sky-500",
        fighting:"bg-red-500",
        poison: "bg-purple-700",
        ground:"bg-yellow-950",
        rock:"bg-stone-600",
        ghost:"bg-violet-800",
        steel:"bg-zinc-500",
        electric:"bg-yellow-300",
        psychic:"bg-blue-700",
        ice:"bg-blue-400",
        dragon:"bg-sky-400",
        dark:"bg-black",
        fairy:"bg-pink-400",
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

    return (
        <section>
            <Header />

            <section className='px-2 py-30'>

                <article className='max-w-[768px] mx-auto py-16 shadow-xl px-2'>
                    {/*parte superior*/}
                    <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[100px]`}>

                        <div className='w-[150px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14'>
                            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                        </div>
                    </section>
                    {/*Generalidades*/}

                    <section>
                        <div>
                            <h3 className={`${textByType[pokemon?.types[0].type.name]}`}>#{pokemon?.id}</h3>
                        </div>

                        <div className='grid grid-cols-[1fr,auto,1fr] items-center gap-2'>
                            <hr />
                            <h2 className={`capitalize font-bold ${textByType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h2>
                            <hr />
                        </div>

                        <div className='flex justify-center gap-6 text-center'>

                            <div>
                                <h5>Weight</h5>
                                <span>{pokemon?.weight}</span>
                            </div>

                            <div>
                                <h5>Height</h5>
                                <span>{pokemon?.height}</span>
                            </div>

                        </div>

                        <section className='grid  sm:grid-cols-2 gap-4'>

                            {/*tipos*/}
                            <section className='text-center'>
                                <h3>Types</h3>
                                <section className='grid grid-cols-2 gap-3 mt-4'>
                                    {
                                        pokemon?.types.map(type => <article key={type.type.name} className={`p-2 px-8 border-[1px] ${bgByType[pokemon?.types[0].type.name]}  capitalize text-white`}>{type.type.name}</article>)
                                    }
                                </section>
                            </section>

                            {/*habilidades*/}
                            <section className='text-center'>
                                <h3>Abilities</h3>
                                <section className='grid grid-cols-2 gap-3 mt-4'>
                                    {
                                        pokemon?.abilities.map(ability=> <article className={`p-2 px-8 border-[1px] ${bgByType[pokemon?.types[0].type.name]} text-white capitalize truncate`} key={ability.ability.name}>{ability.ability.name}</article>)
                                    }
                                </section>
                            </section>
                        </section>

                    </section>


                    {/*stats*/}
                    <section>
                        <h3 className='p-5'>Stats</h3>
                        <section>
                            {
                                pokemon?.stats.map(stat => (
                                    <article key={stat.stat.name}>
                                        <section className='flex justify-between'>
                                            <h5 className='capitalize'>{stat.stat.name}</h5>
                                            <span>{stat.base_stat}/255</span>
                                        </section>
                                        <div className='bg-gray-100 h-6 rounded-sm'>
                                            <div style={{ "width": getPercentStatBar(stat.base_stat) }} className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}></div>
                                        </div>

                                    </article>
                                ))
                            }

                        </section>

                    </section>
                </article>

            </section>

        </section>
    )
}

export default PokemonId
