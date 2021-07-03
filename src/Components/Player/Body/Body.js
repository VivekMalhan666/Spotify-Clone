import React, { useEffect, useState } from 'react';
import './Body.css';
import SongRow from './SongRows/SongRow';
import Header from '../../Header/Header';
import { useDataLayerValue } from '../../../DataLayer/DataLayer';
import SpotifyWebApi from 'spotify-web-api-node';
import { Favorite, MoreHoriz, PlayCircleFilled } from '@material-ui/icons';

const spotifyApi = new SpotifyWebApi({
  clientId: '',
});

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState([]);

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZF1DX4GsmbWgWBBu`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: 'SET_ITEM',
            item: r.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    setSearch('');
    setSearchResults([]);
    setPlayingTrack(id);
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: 'SET_ITEM',
            item: r.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
        });
      });
  };

  useEffect(() => {
    if (!search) return setSearchResults([]);
    let cancel = false;
    spotifyApi.searchTracks(search).then((response) => {
      if (cancel) return;
      setSearchResults(response.body.tracks.items);
      return () => (cancel = true);
    });
  }, [search]);

  return (
    <div className="body">
      <Header
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        playSong={playSong}
      />

      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilled className="body__shuffle" onClick={playPlaylist} />
          <Favorite fontSize="large" />
          <MoreHoriz />
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body;
