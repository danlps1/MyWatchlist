import express from "express";
import db from "../services/database.js";
import { getData } from "../services/api.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM seriados_filmes ORDER BY titulo ASC");
  res.render("index.ejs", { seriadoOuFilme: result.rows });
});

router.get("/editar/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    "SELECT * FROM seriados_filmes WHERE imdb_id=$1",
    [id]
  );
  res.render("editar.ejs", { seriadoOuFilme: result.rows });
});

router.post("/cadastrar", async (req, res) => {
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
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    res.status(500).redirect("/");
  }
});

router.post("/editar/:id", async (req, res) => {
  try {
    const { titulo, comentarios } = req.body;
    const { id } = req.params;

    await db.query(
      "UPDATE seriados_filmes SET titulo=$1, comentarios=$2 WHERE imdb_id=$3",
      [titulo, comentarios, id]
    );
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    res.status(500).redirect("/");
  }
});

router.post("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM seriados_filmes WHERE imdb_id=$1", [id]);
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao excluir:", error);
    res.status(500).redirect("/");
  }
});

export default router;
