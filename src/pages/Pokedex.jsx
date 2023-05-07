import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'
import { current } from '@reduxjs/toolkit'
import { paginationLogic } from '../utils/pagination'

const Pokedex = () => {
//array de pokemons antes de filtrar
  const [pokemons, setPokemons] = useState([])

//string para filtrar los pokemons por nombre
  const [pokemonName, setPokemonName] = useState("")

  //arreglo de tipos de pokemons posibles
  const [types, setTypes] = useState([])

  //filtro de tipo, almacena el tipo actual  del select
  const [currentType, setCurrentType] = useState("")

  //pagina actual
  const [currentPage, setCurrentPage] = useState(1)
  
//estado blogal donde se almacena el nombre del usuario
  const nameTrainer = useSelector(store => store.nameTrainer)

  const handleSubmit = (e) => {
e.preventDefault() 
setPokemonName(e.target.pokemonName.value)
  }

const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()) )




{/*logica de la paginacion memorizada con usememo*/}
const {lastPage,pagesInBlock,pokemonInPage} = useMemo(() => paginationLogic(currentPage, pokemonsByName) , [currentPage, pokemons, pokemonName, currentType])

const handleClickPreviusPage = ()=>{
  const newCurrentPage = currentPage - 1
  if(newCurrentPage >= 1){
    setCurrentPage(newCurrentPage)
  }
}

const handleClickNextPage = () =>{
  const newCurrentPage = currentPage + 1
  if(newCurrentPage <= lastPage){
    setCurrentPage(newCurrentPage)
  }
}


  useEffect(() => {
    if(!currentType){
      const URL = "https://pokeapi.co/api/v2/pokemon?Limit=1281"
    axios.get(URL)
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.log(err))
    }
  }, [currentType])


  useEffect(()=>{
    const URL = "https://pokeapi.co/api/v2/type"
    axios.get(URL)
    .then((res)=>{
      const newTypes = res.data.results.map(type => type.name)
      setTypes(newTypes)
    })
    .catch((err)=>console.log(err))
      },[])


      useEffect(()=>{
        if(currentType){
          
          const URL = `https://pokeapi.co/api/v2/type/${currentType}`
          axios.get(URL)
              .then((res)=>{
                const pokemonsByType = res.data.pokemon.map(pokemon=> pokemon.pokemon)
                setPokemons(pokemonsByType)})
                
              .catch((err)=>console.log(err))
              
        }

      },[currentType])

useEffect(()=>{
setCurrentPage(1)
},[pokemonName, currentType])


  return (
    <section className='min-h-screen'>
      <Header />
      <section className='py-6 px-2'>
        
        <h3 className='text-red-600 font-bold text-3xl mt-10 font-[inter] inline'>Welcome {nameTrainer},<span className='text-black'>here you can find your favorite pokemon</span> </h3>
        
        
        <form onSubmit={handleSubmit}>
          <div className='inline justify-between '>
          <div className='p-4 inline '>
            <input id='pokemonName' type="text" placeholder='Search your pokemon' className='p-2 justify-around' />
            <button className='p-3 bg-red-600 text-white'>Search</button>
          </div>

          <select onChange={(e)=>setCurrentType(e.target.value)}>
            <option value="">All</option>
            {
              types.map((type)=> (<option className='capitalize' value={type} key={type}>{type}</option>))
            }
          </select>
          </div>
          
        </form>
      </section>

      {/*paginacion*/}
      <ul className='flex gap-3 justify-center py-4 px-2 flex-wrap'>
      <li onClick={()=>setCurrentPage(1)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<<"}</li>
        {/*pagina anterior*/}
        <li onClick={handleClickPreviusPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<"}</li>

        {/*lista de paginas*/}
        {
          pagesInBlock.map(numberPage=> <li onClick={()=> setCurrentPage(numberPage)} className={`p-3  font-bold text-white rounded-md cursor-pointer ${numberPage == currentPage ? "bg-red-400" : "bg-red-600"}`} key={numberPage}>{numberPage}</li>)
        }

        {/*pagina siguiente*/}
        <li onClick={handleClickNextPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">"}</li>
        {/*ultima pagina*/}
        <li onClick={()=>setCurrentPage(lastPage)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">>"}</li>
      </ul>
      
      

      <section className='px-2 grid gap-6 grid-cols-[240px] sm:grid-cols-4 max-w-[950px] mx-auto'>
        {
          pokemonInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
        }
      </section>

    </section>
  )
}

export default Pokedex
