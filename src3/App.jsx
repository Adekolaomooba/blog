import { createBrowserRouter, 
          createRoutesFromElements, 
          RouterProvider,
          Route } from "react-router-dom"

  //LAYOUTS
import MainLayout from "./components/MainLayout"


  //PAGES
import Home from "./components/Home"
import About from "./components/About"
import SingleNewsPage from "./components/SingleNewsPage"
import NewArticleForm from "./components/NewArticleForm"
import SignIn from "./components/SignIn"
import EditArticleForm from "./components/EditArticleForm"
import EditPageLayout from "./components/EditPageLayout"
import SignUp from "./components/SignUp"


function App() {

  const myRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path=":id" element={<SingleNewsPage />} />
        <Route path="newarticle" element={<NewArticleForm />} />
        <Route path="editarticle" element={<EditPageLayout />}>
          <Route path=":index" element={<EditArticleForm />} />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />

      </Route>
    )
  )

  return (
  
  <RouterProvider router={myRouter} />

  )
}

export default App
