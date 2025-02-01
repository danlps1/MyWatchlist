import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&`;

export async function getData(imdbID) {
  try {
    const response = await axios.get(`${API_URL}i=${imdbID}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}
