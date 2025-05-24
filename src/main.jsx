import React, { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import { CssBaseline } from "@mui/material";

const Home = lazy(() => import("./pages/home/Home"));
const BlogListPage = lazy(() => import("./pages/bloglistpage/BlogListPage.jsx"))
const BlogPostPage = lazy(() => import("./pages/bloglistpage/BlogPostPage.jsx"))
const Login = lazy(() => import("./pages/login/Login.jsx"))

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssBaseline /> {/* Aplica estilos base de Material UI globalmente */}
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}> {/* El Layout envuelve las rutas hijas */}
            <Route index path="/" element={<Home />} />
            <Route index path="/inicio" element={<BlogListPage />} />
            <Route path="/blog/:blogId" element={<BlogPostPage />} />
           
             {/* Nueva ruta */}
            {/* Aquí puedes agregar más rutas que usarán el mismo Layout */}
            {/* <Route path="/otra-pagina" element={<OtraPagina />} /> */}
          </Route>
           <Route path="/login" element={<Login />} /> 
          {/* Aquí puedes agregar rutas que NO usen este Layout */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);