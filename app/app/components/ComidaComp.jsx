"use client";

import { useContext, useEffect, useRef, useState } from "react";
import pedidoContext from "../context/pedidoContext";
import { Toaster, toast } from "react-hot-toast";

export default function ComidaComp() {
   const reqs = 10;
   const [comida, setComida] = useState([]);
   const [categoriaC, setCategoriaC] = useState([]);
   const [filtro, setFiltro] = useState(false);
   const [tipos, setTipos] = useState("");

   const { pedido, setPedido } = useContext(pedidoContext);

   useEffect(() => {
      buscar();
      bucarCategorias();
   }, []);

   async function bucarCategorias() {
      const response = await fetch(
         "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const json = await response.json();
      setCategoriaC(json.categories);
   }

   const selectRef = useRef("");

   async function buscar() {
      let comidas = [];
      for (let i = 0; i < reqs; i++) {
         const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
         );
         const json = await response.json();
         comidas.push(json.meals[0]);
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

   function adicionarAoCarrinho(obj) {
      let produtos = {
         tipo: "Comida",
         id: obj.idMeal,
         nome: obj.strMeal,
         categoria: obj.strCategory,
         img: obj.strMealThumb,
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
      toast.success("Comida adicionado ao carrinho")
   }
   console.log(pedido)
   /*
      verificar se o filtro exite
         se sim verificar o valor do ref
      listar todos os produtos dessa categoria 
   */

   return (
      <div className="py-10 px-6">
         <Toaster position="top-right"></Toaster>
         <h1 className="text-3xl font-bold mb-8 text-center">Comidas</h1>
         <div className="pb-3">
            <span>Filtrar por categoria</span>
            <select
               name=""
               id=""
               ref={selectRef}
               onChange={(e) => {
                  const valor = e.target.value;

                  if (valor === "0") {
                     setFiltro(false);
                     setTipos("");
                  } else {
                     setFiltro(true);
                     setTipos(valor);
                  }
               }}
            >
               <option value="0">--nenhum--</option>
               {categoriaC.map((obj, index) => {
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
                          <img
                             src={obj.strMealThumb}
                             alt="foto da comida"
                             className="w-full h-48 object-cover"
                          />

                          <div className="p-4 flex flex-col gap-3">
                             <span className="text-xl font-semibold">
                                {obj.strMeal}
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
                    .filter((obj) => obj.strCategory === tipos)
                    .map((obj, index) => {
                       const ingList = ingredientes(obj);
                       return (
                          <li
                             key={index}
                             className="bg-white rounded-xl shadow-lg overflow-hidden border hover:scale-[1.02] transition-transform"
                          >
                             {/* Imagem */}
                             <img
                                src={obj.strMealThumb}
                                alt="foto da comida"
                                className="w-full h-48 object-cover"
                             />

                             {/* Conteúdo */}
                             <div className="p-4 flex flex-col gap-3">
                                <span className="text-xl font-semibold">
                                   {obj.strMeal}
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
