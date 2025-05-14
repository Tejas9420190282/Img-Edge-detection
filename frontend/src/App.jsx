import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'
import ImgUploader from './component/ImgUploader';

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path : "/",
      element : <Login /> 
    },
    {
      path : "/register",
      element : <Register /> 
    },
    {
      path : "/user/home",
      element : <ImgUploader /> 
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
