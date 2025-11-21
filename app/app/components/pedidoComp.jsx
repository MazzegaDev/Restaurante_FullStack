"use client";
import pedidoContext from "../context/pedidoContext";
import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
export default function PedidoComp() {
   const { pedido, setPedido, hist, setHist, finalizarCompra } = useContext(pedidoContext);

   function finalizar(){
      toast.success("Compra finalizada, volte sempre")
      finalizarCompra();
   }

   return (
      <div>
         <Toaster></Toaster>
         <div className="flex items-center justify-evenly">
            <h1 className="text-2xl!">Seus pedidos</h1>
            <div>
               <button className=" duration-500 hover:scale-105 text-black p-2 m-2" onClick={finalizar}>
                  {pedido.length > 0 ? (
                     
                     <span className="bg-green-400 rounded  hover:bg-green-600 p-2 m-2">
                        Finalizar pedido
                     </span>
                     
                  ) : (
                     <span></span>
                  )}
               </button>
               <span>
                  {
                     pedido.length > 0 ? <span>Total de itens: {pedido.length}</span> : <span></span>
                  }
               </span>
            </div>
         </div>
         <div className="pb-3 flex flex-col">
            <div className="flex  justify-center">
               {pedido.length > 0 ? (
                  <span className="text-2xl">Comidas</span>
               ) : (
                  <span></span>
               )}
            </div>
            <ul className="grid grid-cols-2 gap-6">
               {pedido
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
               {pedido.length > 0 ? (
                  <span className="text-2xl">Bebidas</span>
               ) : (
                  <span></span>
               )}
            </div>
            <ul className="grid grid-cols-2 gap-6">
               {pedido
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
