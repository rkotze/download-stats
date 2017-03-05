import request from 'superagent';
import React, { Component } from 'react';

export default function superagentHOC(ToWrapper, url, httpMethod = 'GET') {
	return class extends Component {
		constructor(props) {
			super();
			this.state = {
				success: null,
				failure: null
			}
		}

		static defaultProps = {
			queryType: 'point', //range
			period: 'last-day', //last-week, last-month, date range 2014-01-01:2014-01-31
			packageName: ''
		}

		componentDidMount() {
			const {queryType, period, packageName} = this.props;

			request(httpMethod, `${url}/${queryType}/${period}/${packageName}`)
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
				<ToWrapper {...this.props} success={this.state.success} failure={this.state.failure} />
				);
		}
	}
}