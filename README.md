# Discord Bot Server Management

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This Discord bot is designed to help manage your bot's presence in servers by identifying and leaving servers owned by users with more than three servers. It addresses the issue of inorganic growth, a common challenge for bot developers seeking verification.

## Features

- Identifies servers owned by users with more than three servers.
- Leaves servers owned by such users to maintain organic growth.
- Logs actions to a file, including guild ID, owner ID, and owner name.
- Uses environment variables for secure token storage.

## Installation

1. Clone this repository.

    ```bash
    git clone https://github.com/NightFury-Supreme/Inorganically-Growth-Fixer.git
    cd Inorganically-Growth-Fixer
    ```

2. Create a `.env` file and add your bot token.

    ```
    BOT_TOKEN=your_bot_token_here
    ```

3. Install dependencies.

    ```bash
    npm install
    ```

4. Run the bot.

    ```bash
    npm start
    ```

## Usage

Ensure you have completed the installation steps and have the bot running. The bot will automatically identify and leave servers owned by users with more than three servers.

## Node.js and Discord.js Versions

- Node.js: 14.x (or higher)
- Discord.js: 13.x (or higher)

## Contributing

If you'd like to contribute to this project, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
