import {BotClient} from "../botClient.js";
import * as https from "https";

export const indexController = {
    upload: async (req, res) => {

        const {number, url} = req.body;

        console.log(number, url);
        // const url = "https://static.wikia.nocookie.net/p__/images/a/a8/Oogway.WEBP.webp/revision/latest/zoom-crop/width/500/height/500?cb=20230619061850&path-prefix=";

        try {
            // const data = await urlToBase64("https://static.wikia.nocookie.net/p__/images/a/a8/Oogway.WEBP.webp/revision/latest/zoom-crop/width/500/height/500?cb=20230619061850&path-prefix=");
            // await BotClient.getInstance().sendText({ to: number + '@c.us', message: "Hello there!" });
            // await BotClient.getInstance().sendGiphySticker({to: number + '@c.us', url: url}); //giphy
            await BotClient.getInstance().sendImage({to: number + '@c.us', url: url});

            res.status(200);

        } catch (error) {
            console.error(error);
        }

    }
}


function urlToBase64(url) {
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            let data = '';

            response.setEncoding('base64');

            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                resolve(data);
            });

            response.on('error', error => {
                reject(error);
            });
        });
    });
}
