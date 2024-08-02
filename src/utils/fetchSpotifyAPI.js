import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const spotifyApi = new SpotifyWebApi({
  apiID: process.env.SPOTIFY_API_ID,
  apiSECRET: process.env.SPOTIY_API_SECRET,
});

export const fetchArtistsData = () => {
    return spotifyApi.clientCredentialsGrant()
      .then(data => {
        spotifyApi.setAccessToken(data.body['access_token']);
        return spotifyApi.searchArtists('a', { limit: 50 }); // return artists
      })
      .then(data => {
        // initilize map of artists 
        return data.body.artists.items.map(artist => ({
          id: artist.id,
          name: artist.name,
          followers: artist.followers.total,
          image: artist.images.length > 0 ? artist.images[0].url : null
        }));
      })
      .catch(err => {
        console.error('Error retrieving artists', err);
        return [];
      });
  };
