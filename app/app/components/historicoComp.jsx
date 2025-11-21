"use client";

import pedidoContext from "../context/pedidoContext";
import { useContext, useEffect, useState } from "react";

export default function HistoricoComp() {
   const { hist } = useContext(pedidoContext);
   return (
      <div>
         <div className="flex items-center justify-evenly">
            <h1 className="text-2xl!">Historico de pedidos</h1>
            <div>
               <span>
                  {hist.length > 0 ? (
                     <span>Total de itens: {hist.length}</span>
                  ) : (
                     <span></span>
                  )}
               </span>
            </div>
         </div>
         <div className="pb-3 flex flex-col">
            <div className="flex  justify-center">
               {hist.length > 0 ? (
                  <span className="text-2xl">Comidas</span>
               ) : (
                  <span></span>
               )}
            </div>
            <ul className="grid grid-cols-2 gap-6">
               {hist
                  .filter((item) => item.tipo === "Comida")
                  .map((obj, index) => {
                     return (
                        <li
                           key={index}
                           className="bg-white rounded-xl overflow-hidden border hover:scale-[1.02] transition-transform"
                        >
                           <img
                              src={obj.img}
                              alt="foto da comida"
                              className="w-6xl h-72 object-cover"
                           />
                           <div className="p-4 gap-3 flex">
                              <span>Nome: {obj.nome}</span>
                              <span>Categoria: {obj.categoria}</span>
                              <span>Quantidade: {obj.quantidade}</span>
                           </div>
                        </li>
                     );
                  })}
            </ul>
            <div className="flex justify-center">
               {hist.length > 0 ? (
                  <span className="text-2xl">Bebidas</span>
               ) : (
                  <span></span>
               )}
            </div>
            <ul className="grid grid-cols-2 gap-6">
               {hist
                  .filter((item) => item.tipo === "Bebida")
                  .map((obj, index) => {
                     return (
                        <li
                           key={index}
                           className="bg-white rounded-xl overflow-hidden border hover:scale-[1.02] transition-transform"
                        >
                           <img
                              src={obj.img}
                              alt="foto da bebida"
                              className="w-6xl h-72 object-cover"
                           />
                           <div className="p-4 gap-3 flex">
                              <span>Nome: {obj.nome}</span>
                              <span>Categoria: {obj.categoria}</span>
                              <span>Qunatidade: {obj.quantidade}</span>
                           </div>
                        </li>
                     );
                  })}
            </ul>
         </div>
      </div>
   );
}
