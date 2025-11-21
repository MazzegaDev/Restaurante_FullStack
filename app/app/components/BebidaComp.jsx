"use client";

import { useEffect, useRef, useState, useContext } from "react";
import pedidoContext from "../context/pedidoContext";
import { Toaster, toast } from "react-hot-toast";


export default function ComidaComp() {
   const reqs = 10;
   const [comida, setComida] = useState([]);
   const [categoria, setCategoria]  = useState([]);
   const [filtro, setFiltro] = useState(false);
   const [tipo, setTipo] = useState("")
   
   const { pedido, setPedido } = useContext(pedidoContext);

      function adicionarAoCarrinho(obj) {
         let produtos = {
            tipo: "Bebida",
            id: obj.idDrink,
            nome: obj.strDrink,
            categoria: obj.strCategory,
            img: obj.strDrinkThumb,
            quantidade: 1,
         };

         let pedidoAtual = [...pedido];
         let repetido = false;

         pedidoAtual.map((obj, index) => {
            if (pedidoAtual[index].id === produtos.id) {
               pedidoAtual[index].quantidade += 1;
               repetido = true;
            }
         });

         if (!repetido) {
            pedidoAtual.push(produtos);
         }

         setPedido(pedidoAtual);
         toast.success("Drink adicionado ao carrinho");
      }

   useEffect(() => {
      buscar();
      buscarCategorias();
   }, []);

   async function buscarCategorias() {
      const response = await fetch(
         "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
      );
      const json = await response.json();
      setCategoria(json.drinks);
   }

   async function buscar() {
      let comidas = [];
      for (let i = 0; i < reqs; i++) {
         const response = await fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/random.php"
         );
         const json = await response.json();
         comidas.push(json.drinks[0]);
      }

      setComida(comidas);
   }

   function ingredientes(comida) {
      let ingredientes = [];

      for (let i = 0; i <= 20; i++) {
         const item = comida[`strIngredient${i}`];

         if (item && item.trim() !== "") {
            ingredientes.push(item);
         }
      }
      return ingredientes;
   }


   return (
      <div className="py-10 px-6">
         <Toaster position="top-right"></Toaster>
         <h1 className="text-3xl font-bold mb-8 text-center">Bebidas</h1>
         <div className="pb-3">
            <span>Filtrar por categoria</span>
            <select
               name=""
               id=""
               onChange={(e) => {
                  const valor = e.target.value;
                  if (valor == 0) {
                     setFiltro(false);
                     setTipo("");
                  } else {
                     setFiltro(true);
                     setTipo(valor);
                  }
               }}
            >
               <option value="0">--nenhum--</option>
               {categoria.map((obj, index) => {
                  return (
                     <option key={index} value={obj.strCategory}>
                        {obj.strCategory}
                     </option>
                  );
               })}
            </select>
         </div>
         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtro != true
               ? comida.map((obj, index) => {
                    const ingList = ingredientes(obj);

                    return (
                       <li
                          key={index}
                          className="bg-white rounded-xl shadow-lg overflow-hidden border hover:scale-[1.02] transition-transform"
                       >
                          {/* Imagem */}
                          <img
                             src={obj.strDrinkThumb}
                             alt="foto da comida"
                             className="w-full h-48 object-cover"
                          />

                          {/* Conteúdo */}
                          <div className="p-4 flex flex-col gap-3">
                             <span className="text-xl font-semibold">
                                {obj.strDrink}
                             </span>

                             <div>
                                <p className="font-semibold mb-1">
                                   Ingredientes:
                                </p>

                                <ul className="list-disc ml-5 text-sm flex flex-col gap-1">
                                   {ingList.map((ing, i) => (
                                      <li key={i}>{ing}</li>
                                   ))}
                                </ul>
                             </div>

                             <button
                                onClick={() => adicionarAoCarrinho(obj)}
                                className="bg-slate-600 rounded hover:bg-slate-500 duration-500 hover:scale-105 text-white"
                             >
                                <span>Adicionar ao carrinho</span>
                             </button>
                          </div>
                       </li>
                    );
                 })
               : comida
                    .filter((obj) => obj.strCategory === tipo)
                    .map((obj, index) => {
                       const ingList = ingredientes(obj);

                       return (
                          <li
                             key={index}
                             className="bg-white rounded-xl shadow-lg overflow-hidden border hover:scale-[1.02] transition-transform"
                          >
                             <img
                                src={obj.strDrinkThumb}
                                alt="foto da comida"
                                className="w-full h-48 object-cover"
                             />

                             <div className="p-4 flex flex-col gap-3">
                                <span className="text-xl font-semibold">
                                   {obj.strDrink}
                                </span>

                                <div>
                                   <p className="font-semibold mb-1">
                                      Ingredientes:
                                   </p>

                                   <ul className="list-disc ml-5 text-sm flex flex-col gap-1">
                                      {ingList.map((ing, i) => (
                                         <li key={i}>{ing}</li>
                                      ))}
                                   </ul>
                                </div>

                                <button
                                   onClick={() => adicionarAoCarrinho(obj)}
                                   className="bg-slate-600 rounded hover:bg-slate-500 duration-500 hover:scale-105 text-white"
                                >
                                   <span>Adicionar ao carrinho</span>
                                </button>
                             </div>
                          </li>
                       );
                    })}
         </ul>
      </div>
   );
}
