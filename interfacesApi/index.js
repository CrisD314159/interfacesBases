import express from 'express'
import cors from 'cors'
import { router } from './routes/routes.js'

const app = express() // Crea la instancia de express
app.use(express.json()) // Middleware para parsear JSON
app.use(cors()) // Middleware para permitir CORS

app.use('/api', router) // Establece la ruta base de la API y se llama al router que contiene las rutas


const port = 3000

app.listen(port, ()=>{ // Inicia el servidor en el puerto 3000
    console.log(`Server running on port ${port}`)
})



// para levantar el servidor se ejecuta el comando npm run dev

// Para esta api, primero de debe crear en el oracle express el usuario C##VITALIS con la contraseña 12345678 y con todos sus permisos