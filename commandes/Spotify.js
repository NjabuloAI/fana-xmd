const { fana } = require('../njabulo/fana');
const axios = require("axios");

async function sendFormattedMessage(zk, chatId, text, ms) {
  await zk.sendMessage(chatId, {
    text,
    contextInfo: {
     externalAdReply: {
         title: "njᥲbᥙᥣo jb",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: 'https://via.placeholder.com/150', // placeholder image
         renderLargerThumbnail: false,
        },
        },
          }, { quoted: ms });
}

fana({
  nomCom: "spotifylist",
  aliases: ["spotifysearch", "splaylist"],
  categorie: "Search",
  reaction: "🎬"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg[0]) return await sendFormattedMessage(zk, dest, '🤦Please provide a query!', ms);

  try {
    const searchApiUrl = `https://api.spotify.com/v1/search/tracks?q=${encodeURIComponent(arg[0])}`;
    const response = await axios.get(searchApiUrl, {
      headers: {
        Authorization: 'Bearer YOUR_SPOTIFY_API_TOKEN' // replace with your Spotify API token
      }
    });
    const searchData = response.data.tracks.items;

    if (!searchData || searchData.length === 0) return await sendFormattedMessage(zk, dest, "⁉️No Spotify search results found.", ms);

    let playlistMessage = `VW GOLF PLANET SPOTIFY PLAY\n\n`;

    searchData.forEach((track, index) => {
      const trackNumber = index + 1;
      playlistMessage += `*${trackNumber}.* ${track.name}\n`;
      playlistMessage += `*Artist*: ${track.artists[0].name || "Unknown"}\n`;
      playlistMessage += `*Album*: ${track.album.name || "Unknown"}\n`;
      playlistMessage += `*URL*: ${track.external_urls.spotify}\n\n`;
      playlistMessage += `─────────────\n\n`;
    });

    const firstTrack = searchData[0];
    const thumbnailUrl = firstTrack.album.images[0].url;

    await zk.sendMessage(dest, {
        image: { url: thumbnailUrl },
        text: playlistMessage,
       contextInfo: {
         externalAdReply: {
         title: "Spotify Search Results",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: thumbnailUrl,
         renderLargerThumbnail: true,
        },
        },
          }, { quoted: ms });

    const audioUrl = firstTrack.preview_url;

    if (audioUrl) {
        await zk.sendMessage(dest, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${firstTrack.name}.mp3`,
           contextInfo: {
             externalAdReply: {
             title: firstTrack.name,
             mediaType: 1,
              previewType: 0,
             thumbnailUrl: thumbnailUrl,
             renderLargerThumbnail: true,
            },
            },
              }, { quoted: ms });
    } else {
        await sendFormattedMessage(zk, dest, 'Audio preview not available for this track.', ms);
    }
  } catch (error) {
    await sendFormattedMessage(zk, dest, `❌Error: ${error.message}`, ms);
    console.error(error);
  }
})
