# 🎬 MyWatchlist 

Este é um projeto desenvolvido com **Node.js**, **Express** e **PostgreSQL**, permitindo que os usuários cadastrem e gerenciem filmes, séries e animes que já assistiram ou desejam assistir. Além disso, é possível adicionar comentários e avaliações para cada título.


![image](https://github.com/user-attachments/assets/e1017a35-753e-44af-9b10-608e34eba956)
<sup> Imagem ilustrativa</sup>


## ⚙️ Funcionalidades

- Cadastrar filmes, séries e animes com base no IMDb ID
- Adicionar comentários e avaliações aos títulos
- Editar informações cadastradas
- Excluir títulos da base de dados
- Listar todos os títulos cadastrados

### 🌐 API Utilizada

Este projeto consome dados da OMDb API para obter informações detalhadas sobre os títulos cadastrados.

Para utilizar a API OMDb, é necessário obter uma chave de acesso. Siga os passos abaixo:

  - Acesse [OMDb API](https://www.omdbapi.com/apikey.aspx)
  - Cadastre-se com seu e-mail e gere uma chave de API

## 🛠️ Como Rodar o Projeto

### 1. Clonar o repositório

   ```sh
   git clone https://github.com/danlps1/MyWatchlist.git
   ```
### 2. Instalar as dependências

Navegue até a pasta do projeto e instale as dependências necessárias:

   ```sh
   cd MyWatchlist
   npm install
   ```
### 3. Configure o banco de dados PostgreSQL:

   - Crie um banco de dados chamado `Streamings`
   - Tabela utilizada no PostgreSQL:

   ```sql
    CREATE TABLE seriados_filmes (
        id SERIAL PRIMARY KEY,
        titulo TEXT NOT NULL,
        imdb_id TEXT UNIQUE NOT NULL,
        comentarios TEXT,
        genero TEXT,
        poster TEXT,
        ranking FLOAT
    );
   ```
   - Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais:

   ```sh
    # Configuração do banco de dados
    DB_USER=seu_usuario
    DB_PASS=sua_senha
    DB_HOST=localhost
    DB_NAME=Streamings
    DB_PORT=5432
    
    # Chave da API OMDb
    OMDB_API_KEY=sua_chave_api
    
    # Configuração do servidor
    PORT=3000
   ```
    
### 4. Inicie a aplicação:
   ```sh
   npm start
   ```
A aplicação estará rodando em [http://localhost:3000](http://localhost:3000).
