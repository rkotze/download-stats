import React from 'react';
import s from '../styles/home.style';
import { withPropsToPath, withFetch } from './superagent-hoc';
import { compose } from 'joinable';

const RepoInfo = compose(
  withPropsToPath({
    packageName: ''
  }), 
  withFetch('https://api.github.com/repos/rkotze')
  )(RepoDisplay);

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

export default RepoInfo
