import React, { useState } from 'react'
import Loader from './Loader/Loader'

function Home() {
  const initialData = { search: "", size: "" }
  const [data, setData] = useState(initialData)
  const [imageUrl,setImageUrl]=useState('')
  const [isLoading,setIsLoading]=useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const postData = async (data) => {
   try {
    const response= await fetch('http://localhost:8000/api/v1/image', {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json();
   } catch (error) {
    return error
   }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!data.search) return
    setIsLoading(true)
    
    postData(data).then(res=>{
      setData(initialData)
      setImageUrl(res.data)
    }).catch(err=>{
      setIsLoading(false)
    })
  }

  return (
    <>
      <section>
        <form onSubmit={handleSubmit} >
          <input name='search' autoComplete='off' onChange={handleChange} value={data.search} />
          <select name='size' onChange={handleChange} >
            <option value="small"> Small </option>
            <option value="medium"> Medium </option>
            <option value="large"> Large </option>
          </select>
          <button onClick={handleSubmit} type="button" > Search </button>
        </form>
        {isLoading && <Loader/>}
        <div className='image'>
        {imageUrl && <img alt='image generated' src={imageUrl} onLoad={()=>setIsLoading(false)}/>}
        </div>
      </section>
    </>
  )
}

export default Home