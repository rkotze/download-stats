import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/home.style';
import superagentHOC from './superagent-hoc';

function Home() {

  return (
    <div>
      <PackageMeta title="Joinable">
        <FetchDownloads packageName="joinable" />
        <FetchDownloads packageName="joinable" period="last-week" />
        <FetchDownloads packageName="joinable" period="last-month" />
      </PackageMeta>

      <PackageMeta title="Should Enzyme">
        <FetchDownloads packageName="should-enzyme" />
        <FetchDownloads packageName="should-enzyme" period="last-week" />
        <FetchDownloads packageName="should-enzyme" period="last-month" />
      </PackageMeta>
    </div>
  );
}

const FetchDownloads = superagentHOC(DataPointDisplay, 'https://api.npmjs.org/downloads');

function PackageMeta ({children, title}) {
  return (
      <div>
        <h3>{title}</h3>
        {children}
      </div>
    );
}

function DataPointDisplay({success, failure}) {
  if(success === null && failure === null){
    return <p>Loading...</p>
  }

  if(success && failure === null){

    const { downloads, start, end } = success;

    return <div>
      <p style={s.p}>{start} - {end}</p>
      <p style={s.p}>Downloads: <strong>{downloads}</strong></p>
    </div>
  }

  console.log(failure);

  return <p>Failed to fetch data.</p>
}

export default Home;