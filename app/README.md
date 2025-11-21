**README: Atividade de Revisão — Menu de Restaurante (Next.js + React)**

-  **Descrição:** Projeto frontend desenvolvido com Next.js e React para construir um menu de restaurante que consome duas APIs públicas (Meal API e Cocktail API). A aplicação permite visualizar refeições e bebidas, adicionar itens a um pedido, finalizar pedidos e armazenar o histórico de pedidos usando Context API.

**Objetivo**: O objetivo deste trabalho é construir uma aplicação frontend utilizando o framework `Next.js` em conjunto com `React`, que consuma duas APIs para a construção de um menu de restaurante. No menu, os usuários podem visualizar e escolher refeições e bebidas para o pedido. As refeições são consultadas pela Meal API e as bebidas pela Cocktail API.

**Funcionalidades implementadas**

-  **Página de listagem do menu:** exibe 10 refeições e 10 bebidas com opção de alternar entre as duas visualizações.
-  **Itens do menu:** cada item apresenta **nome**, **imagem**, **ingredientes** e um botão **"Adicionar ao pedido"**.
-  **Filtragem por categoria:** é possível filtrar itens por categoria (mostrando as categorias correspondentes ao tipo selecionado — refeições ou bebidas).
-  **Contexto de pedido:** uso de `React Context` para armazenar a lista de itens selecionados pelo usuário (carrinho/pedido atual).
-  **Página de finalização do pedido:** exibe os itens selecionados (refeições e bebidas) e inclui um botão **"Finalizar pedido"**. Ao finalizar, o contexto de seleção é zerado e os itens finalizados são adicionados ao contexto de histórico de pedidos.

**APIs utilizadas (endpoints)**

-  Consultar refeições (aleatórias): `https://www.themealdb.com/api/json/v1/1/random.php`
-  Consultar bebidas (aleatórias): `https://www.thecocktaildb.com/api/json/v1/1/random.php`
-  Categorias de refeições: `https://www.themealdb.com/api/json/v1/1/categories.php`
-  Categorias de bebidas: `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`

**Como o fluxo funciona (resumo técnico)**

-  A aplicação faz requisições às APIs públicas para popular a listagem de itens.
-  Componentes reutilizáveis foram criados para representar itens de comida e bebida (`ComidaComp`, `BebidaComp`).
-  O estado do pedido é gerenciado por um contexto (`pedidoContext`) que contém: seleção atual, ações para adicionar/remover itens, finalizar pedido e histórico de pedidos.
-  Ao clicar em **"Adicionar ao pedido"**, o item é enviado ao contexto de seleção.
-  Na página de finalização, o usuário confirma o pedido; a ação move os itens selecionados para o histórico e limpa o pedido atual.

**Decisões de implementação**

-  Uso do `App Router` do Next.js (pasta `app/`) para organizar páginas e rotas.
-  CSS utilitário com Tailwind (configuração base presente) e estilos adicionais em `public/css/style.css`.
-  Componentização: separação entre componentes de apresentação (item do menu) e lógica (contexto de pedido).

**Estrutura principal do projeto**

-  `app/` — páginas e layout principal
-  `app/components/` — componentes reutilizáveis (`BebidaComp.jsx`, `ComidaComp.jsx`, `pedidoComp.jsx`, `historicoComp.jsx`)
-  `app/context/pedidoContext.jsx` — contexto para pedido e histórico
-  `public/` — assets estáticos e estilos

**Como executar (desenvolvimento)**
Abra um terminal na raiz do projeto e execute:

```powershell
npm install
npm run dev
```

Em seguida, abra `http://localhost:3000` no navegador.

**Observações e melhorias futuras**

-  Limitar/ordenar melhor a lista aleatória (ex.: obter mais itens e deduplicar).
-  Adicionar autenticação simples para associar históricos a um usuário.
-  Persistir histórico de pedidos em armazenamento local (`localStorage`) ou backend.
-  Melhorar UX (feedback ao adicionar itens, modal de confirmação, total do pedido, quantidades).

**Conclusão**
Esta atividade revisou conceitos de React/Next.js, consumo de APIs externas, componentização e gerenciamento de estado global via Context API. A aplicação permite a construção de um fluxo completo de seleção e finalização de pedidos, incluindo armazenamento de histórico.

---

Arquivo atualizado: `app/README.md`
