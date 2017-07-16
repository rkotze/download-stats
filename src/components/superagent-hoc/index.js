import request from 'superagent';
import React, { Component } from 'react';


export default function superagentHOC(MyComponent) {

	function NpmFetch(props) {
		const { queryType, period, packageName } = props;
		return <MyComponent {...props} queryPath={`/${queryType}/${period}/${packageName}`} />
		// return withFetch(MyComponent, `${url}/${queryType}/${period}/${packageName}`);
	}

	NpmFetch.defaultProps = {
		queryType: 'point', //range
		period: 'last-day', //last-week, last-month, date range 2014-01-01:2014-01-31
		packageName: ''
	}

	return NpmFetch;
}

export function withFetch(MyComponent, apiUrl, httpMethod = 'GET') {
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
			request(httpMethod, `${apiUrl}${queryPath}`)
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