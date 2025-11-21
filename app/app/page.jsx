"use client";
import Image from "next/image";
import "./globals.css";
import { useState } from "react";
import ComidaComp from "./components/ComidaComp";
import BebidaComp from "./components/BebidaComp";
import Link from "next/link";


export default function Home() {
   const [filtros, setFiltros] = useState("todos");

   function apenasDrinks() {
      setFiltros("drinks");
   }

   function apenasComidas() {
      setFiltros("comidas");
   }

   function limpar() {
      setFiltros("todos");
   }

   return (
      <div>
         <nav className="navbar navbar-expand-lg">
            <div className="container px-4 px-lg-5">
               <a className="navbar-brand" href="#!">
                  Restaurante Fullstack
               </a>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div>
                  <Link href="/cart/" className="no-underline! text-black">
                     Meus pedidos
                  </Link>
               </div>
            </div>
         </nav>
         <header className="bg-warning py-5 text-center">
            <Image
               alt="banner"
               width="350"
               height="270"
               src="/banner.png"
            ></Image>
         </header>
         <section className="py-5">
            <div className="container px-4 px-lg-5 flex flex-col">
               <h2>Confira nosso saboroso menu abaixo:</h2>
               <hr></hr>

               <nav className="flex gap-3 items-end">
                  <h3 className="self-center">Filtro</h3>
                  <div className="flex justify-center items-center">
                     <ul className="flex flex-row p-2 gap-2.5 items-end justify-center m-2">
                        <li onClick={apenasComidas} className="hover:scale-120">
                           Comidas
                        </li>
                        <li onClick={apenasDrinks} className="hover:scale-120">
                           Bebidas
                        </li>
                        <li onClick={limpar} className="hover:scale-120">
                           Limpar
                        </li>
                     </ul>
                  </div>
               </nav>

               <div className="flex flex-row">
                  <div className="flex">
                     {filtros == "todos" ? (
                        <div>
                           <ComidaComp></ComidaComp> <BebidaComp></BebidaComp>
                        </div>
                     ) : filtros == "drinks" ? (
                        <BebidaComp></BebidaComp>
                     ) : (
                        <ComidaComp></ComidaComp>
                     )}
                  </div>
               </div>

               <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>
            </div>
         </section>
      </div>
   );
}
