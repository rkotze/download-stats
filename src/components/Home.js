import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/home.style';
import { withPropsToPath, withFetch } from './superagent-hoc';
import moment from 'moment';
import { compose } from 'joinable';
import RepoInfo from './git-repo';
import withLoading from './with-loading';

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

      <PackageMeta title="Eye drops" repoName="eye_drops">
        <RepoInfo packageName="eye_drops" />
        <HexFetchDownloads packageName="eye_drops" />
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
  withFetch('https://api.npmjs.org/downloads'),
  withLoading()
  )(DataPointDisplay);

const HexFetchDownloads = compose(
  withPropsToPath({
    packageName: ''
  }), 
  withFetch('https://hex.pm/api/packages'),
  withLoading()
  )(HexDataPointDisplay);

function PackageMeta ({children, title, repoName}) {
  return (
      <div style={s.downloadCard}>
        <h3>{title}</h3>
        <p>
          <a style={s.link.normal} href={`https://github.com/rkotze/${repoName}`} target="_blank"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>&nbsp;
          <a style={s.link.normal} href={`https://npmjs.com/package/${repoName}`} target="_blank"><i className="fa fa-archive fa-2x" aria-hidden="true"></i></a>&nbsp;
          <Link style={s.link.normal} to={`package/${repoName}`}><i className="fa fa-bar-chart fa-2x" aria-hidden="true"></i></Link>
        </p>
        {children}
      </div>
    );
}

function HexDataPointDisplay({success, failure}) {
  const { all, week, day } = success.downloads;

  return <div>
    <p style={s.p}>
      <strong className="fa-2x"><i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i> {week}</strong> 7 days ago
    </p>
    <p style={s.p}>
      <strong className="fa-2x"><i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i> {all}</strong> for all time
    </p>
  </div>
}

function DataPointDisplay({success}) {
  const { downloads, start, end } = success;

  return <div>
    <p style={s.p}>
      <strong className="fa-2x"><i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i> {downloads}</strong>&nbsp;
      {moment(start + ' 23:59:59', 'YYYY-MM-DD hh:mm:ss').fromNow()}
    </p>
  </div>
}

export default Home;
