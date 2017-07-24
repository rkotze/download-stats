import React from 'react';
import s from '../styles/home.style';
import { withPropsToPath, withFetch } from './superagent-hoc';
import { compose } from 'joinable';
import withLoading from './with-loading';

const RepoInfo = compose(
  withPropsToPath({
    packageName: ''
  }), 
  withFetch('https://api.github.com/repos/rkotze'),
  withLoading()
  )(RepoDisplay);

function RepoDisplay({success}) {
  const { stargazers_count, forks_count } = success;

  return <div>
    <p style={s.p}>
      <label><i className="fa fa-star" aria-hidden="true"></i></label> {stargazers_count} |&nbsp;
      <label><i className="fa fa-code-fork" aria-hidden="true"></i></label> {forks_count}
    </p>
  </div>
}

export default RepoInfo
