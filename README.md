# 📦 Almoxarifado Virtual

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Uma aplicação web completa construída com Node.js e Express projetada para gerenciar inventários. O sistema realiza operações CRUD completas no lado do cliente utilizando a Web Storage API do navegador para manter os dados persistentes.

## 📋 Sumário
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Melhorias Futuras](#-melhorias-futuras)
- [Como Executar](#-como-executar)

---

## 🛠 Tecnologias
- **Node.js & Express:** Responsáveis pela criação do servidor e roteamento.
- **EJS (Embedded JavaScript):** Motor de visualização usado para renderizar as páginas dinâmicas no lado do servidor.
- **JavaScript (Client-Side):** Gerencia a lógica de manipulação do DOM e filtros em tempo real.
- **LocalStorage API:** API nativa do navegador usada para persistir os dados em formato JSON.

## ✨ Funcionalidades
- **Entrada de Produtos (Create):** O usuário pode cadastrar novos itens fornecendo nome, categoria, quantidade, alerta mínimo e URL da foto.
- **Inventário e Busca (Read):** Tabela dinâmica exibe todos os produtos com busca em tempo real e tags de alerta condicional para estoque baixo.
- **Retirada de Produtos (Update):** Permite retirar itens, subtraindo automaticamente o valor do estoque atual e bloqueando caso a quantidade seja insuficiente.
- **Remoção (Delete):** Botão para excluir permanentemente um item do sistema através do seu ID único.

## 📂 Arquitetura do Projeto
O projeto segue a estrutura de diretórios padrão do Express.js:
* `bin/www`: Ponto de entrada principal que inicia o servidor HTTP.
* `public/`: Arquivos estáticos servidos para o cliente (imagens, scripts, folhas de estilo).
* `routes/`: Controladores de rotas do Express mapeando os endpoints.
* `views/`: Arquivos de template EJS para renderizar as interfaces visuais.
* `app.js`: Configuração principal da aplicação Express.

## 🔮 Melhorias Futuras
- [ ] Integrar um banco de dados real como MongoDB ou PostgreSQL.
- [ ] Adicionar sistema de login e autenticação de usuários.
- [ ] Implementar funcionalidade de exportação de dados (ex: baixar inventário como CSV).

## 🚀 Como Executar

1. **Instale as dependências:**
   Certifique-se de ter o Node.js instalado e execute o comando abaixo na raiz do projeto:
   ```bash
   npm install
   ```

2. **Inicie a aplicação:**
   O projeto utiliza o modo watch nativo do Node. Execute:
   ```bash
   npm start
   ```

3. **Acesse o sistema:**
   Abra o seu navegador e acesse `http://localhost:3000`.
