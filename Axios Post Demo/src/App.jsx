import { useState } from 'react'
import viteLogo from '/vite.svg'
import axios from 'axios'

function App() {
  const [post, setPost] = useState({
    title: '',
    body: ''
  })

  const handleInput = (event) => {
    setPost({...post, [event.target.name]: event.target.value})
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('https://jsonplaceholder.typicode.com/posts', {post})
    .then(response => console.log(response))
    .then(err => console.log(err))
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        Title : <input type="text" onChange={handleInput} name="title"/>
        <br/>
        Post : <input type="text" onChange={handleInput} name="body"/>
        <br/>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default App
