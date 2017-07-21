import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/home.style';
import { withPropsToPath, withFetch } from './superagent-hoc';
import moment from 'moment';
import { compose } from 'joinable';

function Home() {

  return (
    <div>
      <PackageMeta title="Joinable" repoName="joinable">
        <RepoInfo packageName="joinable" />
        <FetchDownloads packageName="joinable" />
        <FetchDownloads packageName="joinable" period="last-week" />
        <FetchDownloads packageName="joinable" period="last-month" />
      </PackageMeta>

      <PackageMeta title="Should Enzyme" repoName="should-enzyme">
        <RepoInfo packageName="should-enzyme" />
        <FetchDownloads packageName="should-enzyme" />
        <FetchDownloads packageName="should-enzyme" period="last-week" />
        <FetchDownloads packageName="should-enzyme" period="last-month" />
      </PackageMeta>
    </div>
  );
}

const FetchDownloads = compose(
  withPropsToPath({
    queryType: 'point', //range
    period: 'last-day', //last-week, last-month, date range 2014-01-01:2014-01-31
    packageName: ''
  }), 
  withFetch('https://api.npmjs.org/downloads')
  )(DataPointDisplay);

const RepoInfo = compose(
  withPropsToPath({
    packageName: ''
  }), 
  withFetch('https://api.github.com/repos/rkotze')
  )(RepoDisplay);

function PackageMeta ({children, title, repoName}) {
  return (
      <div>
        <h3>{title}</h3>
        <p>
          <a style={s.link} href={`https://github.com/rkotze/${repoName}`} target="_blank">Github</a> |&nbsp;
          <a style={s.link} href={`https://npmjs.com/package/${repoName}`} target="_blank">NPM</a> |&nbsp;
          <Link style={s.link} to={`package/${repoName}`}>Details</Link>
        </p>
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
      <p style={s.p}>
        <strong style={s.downloadNumber}>{downloads}</strong> downloads&nbsp;
        {moment(start + ' 23:59:59', 'YYYY-MM-DD hh:mm:ss').fromNow()}
      </p>
    </div>
  }

  console.log(failure);

  return <p>Failed to fetch data.</p>
}

function RepoDisplay({success, failure}) {
  if(success === null && failure === null){
    return <p>Loading...</p>
  }

  if(success && failure === null){

    const { stargazers_count, forks_count } = success;

    return <div>
      <p style={s.p}>
        <label><i className="fa fa-star" aria-hidden="true"></i></label> {stargazers_count} |&nbsp;
        <label><i className="fa fa-code-fork" aria-hidden="true"></i></label> {forks_count}
      </p>
    </div>
  }

  console.log(failure);

  return <p>Failed to fetch data.</p>
}

export default Home;