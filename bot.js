(async () => {
    const Discord = require("discord.js");
    const Database = require("easy-json-database");
    const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const s4d = {
        Discord,
        database: new Database(`${devMode ? S4D_NATIVE_GET_PATH : "."}/db.json`),
        joiningMember: null,
        reply: null,
        tokenInvalid: false,
        tokenError: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };
    s4d.client = new s4d.Discord.Client({
        intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
        partials: ["REACTION"]
    });

    await s4d.client.login('MTI1NzQ4MzQwNTYwODc0NzE1MA.G3hgy3.kM6pH7b7dPpuIFReq7v1UxIVB3RqJk5D3O1_WU').catch((e) => {
        s4d.tokenInvalid = true;
        s4d.tokenError = e;
    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if ((s4dmessage.content) == 'n?ping') {
            s4dmessage.channel.send(String((s4d.client.ws.ping)));
        }
        if (String((s4dmessage.content)).includes(String('n?clear'))) {
            if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
                (s4dmessage.channel).bulkDelete((([(s4dmessage.content).slice(8, 10)].reduce(function(x, y) {
                    return x + y;
                })) | 1))
            }
        }
        if ((s4dmessage.content) == 'n?dev') {
            if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
                s4d.client.user.setActivity(String('In a dev phase!'));
            }
        }
        if ((s4dmessage.content) == 'n?rel') {
            if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
                s4d.client.user.setActivity(String('Latest update released!'));
            }
        }

    });


    return s4d;
})();
