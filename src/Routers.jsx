import { Routes, Route } from "react-router-dom";
import HomePage from "./Page/Home";
import BlogPage from "./Page/Blog";
import SinglePostPage from "./Page/SinglePost";
import BlogPostPage from "./Page/BlogPost";
import AdminPage from "./Page/Admin";
import NotFoundPage from "./Page/NotFound";

function AppRouter(){
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="blog" element={<BlogPage />}/>
            <Route path="blog/:slug" element={<BlogPostPage />}/>
            <Route path="single_post" element={<SinglePostPage />}/>
            <Route path="admin" element={<AdminPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
    );
}

export default AppRouter;