import axios from 'axios';
import '../../css/AllRepos.css';
import '../../css/SingleRepoCard.css';
import { useState, useEffect } from 'react';
import { loading } from '../Elements';
import { Link } from 'react-router-dom';
import { usePagination, AllReposPagination } from './AllReposPagination.js'; // pagination

function AllRepos() {
  const screenName = localStorage.getItem('screenName');

  const spanStyle = { color: '#58a6ff' };

  const leftAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&lt;</span>
  );
  const rightAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&gt;</span>
  );
  const openText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>all</span>
  );
  const closeText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>/all</span>
  );

  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('last-updated');
  let [page, setPage] = useState(1); //pagination

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = async () => {
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?q=user:${screenName}+fork:true+archived:false&per_page=100`
    );

    setRepos(data.items);
    setIsLoading(false);
  };

  useEffect(() => {}, [filter]);

  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const renderFilteredRepos = () => {
    if (filter === 'date-created') {
      return repos.sort((a, b) => b.created_at.localeCompare(a.created_at));
    } else if (filter === 'alphabetical') {
      return repos.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return repos.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    }
  };

  //pagination stuff added below
  const PER_PAGE = 24;
  const count = Math.ceil(repos.length / PER_PAGE);
  const _DATA = usePagination(renderFilteredRepos(), PER_PAGE);
  ///////////////////////////////////////////////

  return (
    <div className='all-repos'>
      <div className='all-repos-header'>
        <h1>
          {leftAngleBrace}
          {openText}
          {rightAngleBrace}
          Repositories
          {leftAngleBrace}
          {closeText}
          {rightAngleBrace}
        </h1>
        <h3>
          The Github API limits results to repositories{' '}
          <span style={spanStyle}>you own</span> or have{' '}
          <span style={spanStyle}>forked</span>.
        </h3>
        <div className='filter'>
          <select
            defaultValue='last-updated'
            onChange={(e) => {
              handleChangeFilter(e);
            }}
          >
            <option value='last-updated'>Sort by: Last updated</option>
            <option value='alphabetical'>Sort by: Alphabetical</option>
            <option value='date-created'>Sort by: Date created</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        loading
      ) : repos.length === 0 ? (
        <div className='all-repos-container'>You have no repos!</div>
      ) : (
        <div className='all-repos-container'>
          {_DATA.currentData().map((repo) => (
            <Link  key={repo.id} to={`/repos/${repo.name}`}>
              <div className='single-repo-card' >
                <h2>{repo.name}</h2>
                <hr />
                {filter === 'date-created' ? (
                  <div>
                    <p>Created at:</p>
                    <p>{repo.created_at.slice(0, 10)}</p>
                  </div>
                ) : (
                  <div>
                    <p>Last updated at:</p>
                    <p>{repo.updated_at.slice(0, 10)}</p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <AllReposPagination
        _DATA={_DATA}
        count={count}
        page={page}
        setPage={setPage}
        PER_PAGE={PER_PAGE}
      />
    </div>
  );
}

export default AllRepos;
