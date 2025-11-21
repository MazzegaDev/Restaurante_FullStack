'use client'

const { createContext, useState } = require("react")

const pedidoContext = createContext();


export const PedidoProvider = ({ children }) => {
   const [pedido, setPedido] = useState([]);
   const [hist, setHist] = useState([]);
   
   function finalizarCompra(){
      setHist(prev => [...prev,...pedido]);
      setPedido([]);
   }


   return (
      <pedidoContext.Provider value={{ pedido, setPedido, hist, setHist, finalizarCompra }}>
         {children}
      </pedidoContext.Provider>
   );
};


export default pedidoContext;