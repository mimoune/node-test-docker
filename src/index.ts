import cors from 'cors'
import express from 'express'
const mongoose = require('mongoose');
import { createClient } from 'redis';
const client = createClient({ url: 'redis://redis:6379' });
// const { Client } = require('pg')
// const connectionString = 'postgresql://root:example@postgres:3211'

// const clientpg = new Client({
//     connectionString,
// })
// clientpg.connect().then(() => {
//     console.log("connected to postgres")
// }).catch(() => console.log("connect to postgres failed"));

client.connect().then(() => {
    console.log("connected to redis")
}).catch(() => console.log("connect to redis failed"));

const DB_HOST = "mongo";
const DB_PORT = "27017"
const DB_USERNAME = 'root';
const DB_PASSWORD = 'example';

mongoose.connect('mongodb://root:example@mongo:27017').then(() => {
    console.log('connect db');
}).catch(() => {
    console.log("connect faild")
});
/**
 * On créé une nouvelle "application" express
 */
const app = express()

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors())

/**
 * Toutes les routes CRUD pour les animaux seronts préfixées par `/pets`
 */

/**
 * Homepage (uniquement necessaire pour cette demo)
 */
app.get('/', (req, res) => {
    client.set('products', 'productsssssssssss');
    res.send('🏠 hello krimo i am from docker container and AWS' + process.env.NODE_ENV)
})
app.get('/data', async (req, res) => {
    const products = await client.get('products');
    res.send('🏠 hello krimo i am from docker container milo' + process.env.NODE_ENV + '<h2>' + products + '</h2>')
})


/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(4000, () => console.log('Silence, ça tourne.'))