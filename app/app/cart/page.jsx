"use client";

import { useState } from "react";
import HistoricoComp from "../components/historicoComp";
import PedidoComp from "../components/pedidoComp";
import Link from "next/link";

export default function cartPage() {
   const [filtro, setFiltro] = useState()

   function filtrar(bool){
      setFiltro(bool);
   }

   return (
      <div>
         <header className="flex bg-yellow-500 max-w-full">
            <nav>
               <ul className="flex gap-5 justify-center items-center pt-2 sm:w-fit">
                  <li className="text-2xl" onClick={() => filtrar(false)}>
                     Pedidos
                  </li>
                  <li className="text-2xl" onClick={() => filtrar(true)}>
                     Historico de pedidos
                  </li>
                  <li className="text-2xl">
                     <Link
                        href="/"
                        className="text-black text-2xl! no-underline! hover:no-underline!"
                     >
                        Voltar
                     </Link>
                  </li>
               </ul>
            </nav>
         </header>
         <div>
            {filtro != true ? (
               <PedidoComp></PedidoComp>
            ) : (
               <HistoricoComp></HistoricoComp>
            )}
         </div>
      </div>
   );
}
