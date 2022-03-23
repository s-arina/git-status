import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { UsualCommitTime } from './homeCards/UsualCommitTime';
import { TopLanguages } from './homeCards/TopLanguages';
import { UserLifespan } from './homeCards/UserLifespan';
import { Timeline } from './homeCards/Timeline';

function Home() {
  const leftAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&lt;</span>
  );
  const rightAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&gt;</span>
  );
  const openText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>welcome</span>
  );
  const closeText = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>/welcome</span>
  );

  const [userData, setUserData] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const githubUsername = localStorage.getItem('screenName');

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const userData = await axios.get(
          `https://api.github.com/users/${githubUsername}`
        );
        setUserData(userData.data);

        const userRepos = await axios.get(
          `https://api.github.com/search/repositories?q=user:${githubUsername}+fork:true&per_page=100`
        );
        setUserRepos(userRepos.data);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className='home'>
      <h1>
        {leftAngleBrace}
        {openText}
        {rightAngleBrace}
        {localStorage.getItem('name') !== 'null'
          ? localStorage.getItem('name')
          : localStorage.getItem('screenName')}
        {leftAngleBrace}
        {closeText}
        {rightAngleBrace}
      </h1>
      {/* <img src={localStorage.getItem('profilePic')} alt='profile pic' /> */}
      <div className='home-cards'>
        <Timeline />
        <UserLifespan userData={userData} />
        <TopLanguages userRepos={userRepos} />
        <UsualCommitTime />
      </div>
    </div>
  );
}

export default Home;
