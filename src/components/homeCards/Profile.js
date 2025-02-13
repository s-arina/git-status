import React from 'react';
import '../../css/Profile.css';
import { UserLifespan } from './UserLifespan';

export function Profile(props) {
  const user = props.userData;
  const spanStyle = { color: '#58a6ff' };

  let email;
  if (user.email) {
    email = <span>{user.email}</span>;
  } else {
    email = <span style={{ color: '#e34c26' }}>Private</span>;
  }

  return (
    <div className='profile-card'>
      <div className='top-right-fold'></div>

      <a href={`${user.html_url}`} target='_blank' rel='noreferrer'>
        <div className='bottom-left-fold'></div>
      </a>

      <div className='profile'>
        <div className='profile-header'>
          <img src={`${user.avatar_url}`} alt='' />
          <div className='names'>
            <h1>{user.name}</h1>
            <h1>{user.login}</h1>
            <h3>
              <span style={spanStyle}>Email:</span> {email}
            </h3>
          </div>
        </div>
        <div className='bio'>
          <hr />
          <p>{user.bio ? user.bio : 'Your bio is empty!'}</p>
        </div>
        <hr />
        <div className='follow-type'>
          <h3>Following</h3>
          <hr />
          <h3>Followers</h3>
          <hr />
          <h3>Type</h3>
        </div>
        <div className='follow-type-info'>
          <h3>{user.following}</h3>
          <hr />
          <h3>{user.followers}</h3>
          <hr />
          <h3>{user.type}</h3>
        </div>
        <hr />
      </div>
      <UserLifespan userData={props.userData} />
    </div>
  );
}
