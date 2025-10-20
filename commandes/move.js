const { fana } = require("../njabulo/fana");
const axios = require('axios');

fana({
  nomCom: "move",
  aliases: ["vid", "mp4"],
  categorie: "download",
  reaction: "🎥"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  if (!arg) {
    return zk.sendMessage(dest, { text: "Please provide a movie title" });
  }

  const query = arg.join(" ");
  const url = `https://movieapi.giftedtech.co.ke/api/search/${query}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.success === "true") {
      const movies = data.results.items;
      const movieList = movies.map((movie) => ({
        title: movie.title,
        description: movie.description,
        releaseDate: movie.releaseDate,
        id: movie.subjectId,
      }));

      zk.sendMessage(dest, {
        text: `Found ${movieList.length} movies:\n\n` + movieList.map((movie, index) => `${index + 1}. *${movie.title}* (${movie.releaseDate})`).join("\n") + "\n\nPlease respond with the number of the movie you'd like to download",
      });

      const movieResponses = await zk.onMessage(userJid);
      const selectedMovieIndex = parseInt(movieResponses[0].message.conversation) - 1;

      if (isNaN(selectedMovieIndex) || selectedMovieIndex < 0 || selectedMovieIndex >= movieList.length) {
        return zk.sendMessage(dest, { text: "Invalid selection" });
      }

      const selectedMovie = movieList[selectedMovieIndex];
      const movieDownloadUrl = `https://movieapi.giftedtech.co.ke/api/download/${selectedMovie.id}`;

      zk.sendMessage(dest, {
        text: `Downloading ${selectedMovie.title}...`,
      });

      const movieFileResponse = await axios.get(movieDownloadUrl, { responseType: 'stream' });
      const movieFile = movieFileResponse.data;

      zk.sendMessage(dest, {
        document: movieFile,
        mimetype: 'application/octet-stream',
        fileName: `${selectedMovie.title}.mp4`,
      });
    } else {
      zk.sendMessage(dest, { text: "No movies found" });
    }
  } catch (error) {
    console.error(error);
    zk.sendMessage(dest, { text: "Error fetching movie data" });
  }
});