import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom"; 
import Layout from "./layout/Layout.jsx";
import { CssBaseline } from "@mui/material";

const Home = lazy(() => import("./pages/home/Home"));
const BlogListPage = lazy(() => import("./pages/bloglistpage/BlogListPage.jsx"));
const BlogPostPage = lazy(() => import("./pages/bloglistpage/BlogPostPage.jsx"));
const Register = lazy(() => import("./pages/register/register.jsx"));
const Login = lazy(() => import("./pages/login/Login.jsx"));

function App() {
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/inicio" element={<BlogListPage />} />
            <Route path="/blog/:blogId" element={<BlogPostPage />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;