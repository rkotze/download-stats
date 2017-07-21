import request from 'superagent';
import React, { Component } from 'react';
import joinable from 'joinable';

export function withNpmApi(MyComponent) {

	function NpmFetch(props) {
		const { queryType, period, packageName } = props;
		return <MyComponent {...props} queryPath={`${queryType}/${period}/${packageName}`} />
	}

	NpmFetch.defaultProps = {
		queryType: 'point', //range
		period: 'last-day', //last-week, last-month, date range 2014-01-01:2014-01-31
		packageName: ''
	}

	return NpmFetch;
}

export function withGithubApi(MyComponent) {

	function GithubFetch(props) {
		const { queryType, period, packageName } = props;
		return <MyComponent {...props} queryPath={packageName} />
	}

	GithubFetch.defaultProps = {
		packageName: ''
	}

	return GithubFetch;
}

export function withFetch(apiUrl, httpMethod = 'GET') {
	return function(MyComponent){
		return class extends Component {
			constructor(props) {
				super();
				this.state = {
					success: null,
					failure: null
				}
			}

			componentDidMount() {
				const { queryPath } = this.props;
				request(httpMethod, joinable(apiUrl, queryPath, { separator: '/' }))
				.then(
					(response) => {
						this.setState({
							success: response.body
						});
					},
					(err) => {
						this.setState({
							failure: err
						});
					})
			}

			render(){
				return (
					<MyComponent {...this.props} success={this.state.success} failure={this.state.failure} />
					);
			}
		}
	}
}