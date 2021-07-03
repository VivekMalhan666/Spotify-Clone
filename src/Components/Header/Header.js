import React from 'react';
import './Header.css';
import { useDataLayerValue } from '../../DataLayer/DataLayer';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import SongRow from '../Player/Body/SongRows/SongRow';

function Header({ search, setSearch, searchResults, playSong }) {
  const [{ user }, dispatch] = useDataLayerValue();
  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
          value={search}
          onInput={(e) => setSearch(e.target.value)}
        />
        {searchResults.length !== 0 ? (
          <div className="header__result-container">
            {searchResults?.map((track) => (
              <SongRow track={track} playSong={playSong} />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name}></Avatar>
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
