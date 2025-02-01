import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
const porta = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(porta, () => {
  console.log(`Aplicação rodando em http://localhost:${porta}`);
});
