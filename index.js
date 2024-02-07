const fs = require('fs');
const fetch = require('node-fetch');

const token = 'YOUR_TOKEN';

async function updateAvatar() {
    const filePath = 'giphy.gif'; // Path to the avatar gif

    if (!fs.existsSync(filePath)) {
        console.error(`File does not exist: ${filePath}`);
        return;
    }

    try {
        const newAvatar = fs.readFileSync(filePath);

        if (!newAvatar) {
            console.error('Failed to read the file or the file is empty.');
            return;
        }

        const base64Avatar = newAvatar.toString('base64');
        if (!base64Avatar) {
            console.error('Failed to convert the avatar to base64.');
            return;
        }

        const response = await fetch('https://discord.com/api/v9/users/@me', {
            method: 'PATCH',
            headers: {
                Authorization: `Bot ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `data:image/gif;base64,${base64Avatar}`
            })
        });

        if (response.ok) {
            console.log('Avatar updated successfully!');
        } else {
            console.error(`Failed to update avatar: ${response.statusText}`);
            const responseBody = await response.text();
            console.error(`Response body: ${responseBody}`);
        }
    } catch (error) {
        console.error(`Error updating avatar: ${error}`);
    }
}

updateAvatar();
