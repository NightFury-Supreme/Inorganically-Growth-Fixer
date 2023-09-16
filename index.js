const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const client = new Discord.Client();

const token = process.env.BOT_TOKEN;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Fetch the list of all servers the bot is a member of
    const guilds = client.guilds.cache.array();

    // Create a Map to store server owner IDs and their respective server count
    const ownerServerCounts = new Map();

    // Iterate through all servers
    for (const guild of guilds) {
        const ownerID = guild.ownerID;

        // Increment the count for the owner's servers
        if (ownerServerCounts.has(ownerID)) {
            ownerServerCounts.set(ownerID, ownerServerCounts.get(ownerID) + 1);
        } else {
            ownerServerCounts.set(ownerID, 1);
        }
    }

    let leftGuildsCount = 0;

    // Create a log file and write bot actions to it
    const logStream = fs.createWriteStream('bot_actions.log', { flags: 'a' });

    // Iterate through the Map to leave servers owned by users with more than 3 servers
    for (const [ownerID, serverCount] of ownerServerCounts) {
        if (serverCount > 3) {
            // Fetch the list of servers owned by this user
            const userGuilds = guilds.filter(guild => guild.ownerID === ownerID);

            // Leave all servers owned by this user
            for (const serverToLeave of userGuilds) {
                // Check if the bot has permission to leave the server and leave it
                if (serverToLeave.me.hasPermission('MANAGE_GUILD')) {
                    const logMessage = `Leaving server ${serverToLeave.name} (Guild ID: ${serverToLeave.id}) owned by ${serverToLeave.owner.user.tag} (Owner ID: ${serverToLeave.ownerID})`;
                    console.log(logMessage);
                    logStream.write(logMessage + '\n');
                    serverToLeave.leave()
                        .then(() => {
                            const leftMessage = `Left server ${serverToLeave.name}`;
                            console.log(leftMessage);
                            logStream.write(leftMessage + '\n');
                            leftGuildsCount++;
                        })
                        .catch(error => {
                            console.error(error);
                            logStream.write('Error: ' + error + '\n');
                        });
                }
            }
        }
    }

    // Display the count of guilds left
    if (leftGuildsCount > 0) {
        const leftCountMessage = `Left ${leftGuildsCount} servers.`;
        console.log(leftCountMessage);
        logStream.write(leftCountMessage + '\n');
    } else {
        const nothingToDoMessage = 'Nothing to do.';
        console.log(nothingToDoMessage);
        logStream.write(nothingToDoMessage + '\n');
    }

    // Close the log file
    logStream.end();

    // Log out the bot
    client.destroy();
});

client.login(token);
