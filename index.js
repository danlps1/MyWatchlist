import express from "express";
import pg from "pg";
import axios from "axios";

const porta = 3000;
const API_URL = "http://www.omdbapi.com/?apikey=f88790d1&";
const app = express();

const db = new pg.Client({
  user: "postgres",
  password: "adminsql",
  host: "localhost",
  database: "Streamings",
  port: 5432,
});

db.connect();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

async function getData(imdbID) {
  try {
    const response = await axios.get(`${API_URL}i=${imdbID}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM seriados_filmes");
  res.render("index.ejs", { seriadoOuFilme: result.rows });
});

app.get("/editar/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    "SELECT * FROM seriados_filmes WHERE imdb_id=$1",
    [id]
  );
  res.render("editar.ejs", { seriadoOuFilme: result.rows });
});

app.post("/cadastrar", async (req, res) => {
  try {
    const { titulo, IMDb_ID, comentarios } = req.body;
    const seriadoOuFilme = await getData(IMDb_ID);

    if (!seriadoOuFilme) {
      return res.status(500).send("Erro ao buscar dados na API.");
    }

    await db.query(
      "INSERT INTO seriados_filmes (titulo, imdb_id, comentarios, genero, poster, ranking) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        titulo,
        IMDb_ID,
        comentarios,
        seriadoOuFilme.Genre,
        seriadoOuFilme.Poster,
        seriadoOuFilme.imdbRating,
      ]
    ); 
    console.log(`${IMDb_ID} cadastrado com sucesso`);
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    res.status(500).redirect("/");
  }
});

app.post("/editar/:id", async (req, res) => {
  try {
    const { titulo, comentarios } = req.body;
    const { id } = req.params;

    await db.query(
      "UPDATE seriados_filmes SET titulo=$1, comentarios=$2 WHERE imdb_id=$3",
      [titulo, comentarios, id]
    );
    console.log(`${id} editado com sucesso`);
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    res.status(500).redirect("/");
  }
});

app.post("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM seriados_filmes WHERE imdb_id=$1", [id]);
    console.log(`${id} excluído com sucesso`);
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao excluir:", error);
    res.status(500).redirect("/");
  }
});

app.listen(porta, () => {
  console.log(`Aplicação rodando em http://localhost:${porta}`);
});
