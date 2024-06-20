import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Login from "../pages/Login";


export const privateRoutes = [
    {path: "/about", Component: About},
    {path: "/posts", Component: Posts},
    {path: "/posts/:id", Component: PostIdPage},
]

export const publicRoutes = [
    {path: "/login", Component: Login},
]