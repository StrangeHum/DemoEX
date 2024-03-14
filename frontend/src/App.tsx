import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState([{}])

  useEffect(()=>{
    fetch("/api").then(
      (response) => response.json()
      ).then(data => {
        setUser(data)
      })
  },[]);
  return (
    <>
      <h1>{user.message}</h1>
    </>
  )
}

export default App
