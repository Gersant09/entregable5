import React from 'react'
import Footer from '../components/Footer'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

const handleSubmit = (e)=>{
e.preventDefault()
dispatch(setNameTrainer(e.target.nameTrainer.value))
navigate("/pokedex")
}

  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
      <section className='flex justify-center items-center'>
        <article>
            <div>
            <img src="/images/pokedex.png" alt="" />
            </div>
            <h1 className='text-red-600 font-bold text-4xl mt-10 font-[inter]'>Hello Trainer!</h1>
            <p className='font-semibold font-["inter"]'>Give me your name to start! :</p>
            <form onSubmit={handleSubmit}>
                <input id='nameTrainer' type="text" placeholder='Your name...'/>
                <button className='bg-red-500 text-white p-2 font-["inter"] rounded-md'>Start!</button>
            </form>
        </article>
      </section>

<Footer />

    </section>
  )
}

export default Home
