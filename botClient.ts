import * as wa from '@open-wa/wa-automate';

export class BotClient {
    #botClient
    #session


    static getInstance() {
        if (BotClient.instance === undefined) BotClient.instance = new BotClient();
        return BotClient.instance
    }


    async init({session}){
        this.#session = session
        this.#botClient = await wa.create({
            sessionId: session,
            multiDevice: true, //required to enable multiDevice support
            authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
            blockCrashLogs: true,
            disableSpins: true,
            headless: true,
            hostNotificationLang: 'PT_BR',
            logConsole: false,
            popup: true,
            qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
        });

        return this;
    }


    get getSessionName() {
        return this.#session
    }

    async onMessage(callback) {
        if (!this.#botClient) throw new Error('BotClient not initialized.');
        return await this.#botClient.onMessage(callback);
    }

    async sendText({to, message}){
        if (!this.#botClient) throw new Error('BotClient not initialized.');
        return await this.#botClient.sendText(to, message);
    }

    async sendSticker({to, url}){
        if (!this.#botClient) throw new Error('BotClient not initialized.');
        return await this.#botClient.sendStickerfromUrl(to, url);
    }

    async sendGiphySticker({to, url}){
        if (!this.#botClient) throw new Error('BotClient not initialized.');
        return await this.#botClient.sendGiphyAsSticker(to, url);
    }

    async sendImage({to, url}){
        if (!this.#botClient) throw new Error('BotClient not initialized.');
        return await this.#botClient.sendImageAsSticker(to, url);
    }
}
