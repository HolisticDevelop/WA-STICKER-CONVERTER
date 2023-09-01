// Require the framework and instantiate it

// ESM
import Fastify from "fastify";
const fastify = Fastify({
    logger: true
});


import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as path from "path";
import { indexController } from "./controllers/indexController.js";
import {BotClient} from "./botClient.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
    const botClient = await BotClient.getInstance().init({
        session: 'TEST',
        // headless: true,
        // useChrome: false,
    });

    botClient.onMessage((message) => {
        console.log(message.from, typeof message.from);
        botClient.sendText('573245875857@c.us', 'Hello World');
    });
}catch (e) {
    console.log('Error:', e)
}
// Declare a route


fastify.post('/upload', indexController.upload);

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})
