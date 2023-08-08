// Require the framework and instantiate it

// ESM
import Fastify from "fastify";
const fastify = Fastify({
    logger: true
})


import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as path from "path";


const __dirname = dirname(fileURLToPath(import.meta.url));

fastify.register(import("@fastify/view"), {
    engine: {
        handlebars: import("handlebars"),
    },
    root: path.join(__dirname, "views"), // Points to `./views` relative to the current file
    layout: "./templates/layout.hbs", // Sets the layout to use to `./views/templates/layout.handlebars` relative to the current file.
    viewExt: "hbs", // Sets the default extension to `.hbs`
    options: {}
    // layout: "layout.hbs"
});

// fastify.register(import("@fastify/static"), {
//     root: path.join(__dirname, "/public"),
//     prefix: '/public/', // optional: default '/'
// })

// Declare a route
fastify.get('/', async function (request, reply) {
    reply.view("index.hbs")
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})
