import express from "express"
import { Perimetro } from "./libs/Perimetro";
import { Superficie } from "./libs/Superficie";
const app = express()
const PORT = 3000

let perimetro:Perimetro = new Perimetro()
let superficie:Superficie = new Superficie()

app.get("/:operacion/:figura/:param1/:param2", (req, res) => {
    console.log(req.params)
    res.send(
      [
        {
          "cuadrado": perimetro.cuadrado(10),
          "rectangulo": perimetro.rectangulo(10,20),
          "circulo": perimetro.circulo(10)
        },
        {
          "cuadrado": superficie.cuadrado(10),
          "rectangulo": superficie.rectangulo(10,20),
          "circulo": superficie.circulo(10)
        }
      ]
    )
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
    }
);