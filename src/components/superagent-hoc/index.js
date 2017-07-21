import request from 'superagent';
import React, { Component } from 'react';
import joinable from 'joinable';

export function withPropsToPath(propsToJoin) {
	function joinableSegments(props, definedProps){
		let segments = [];
		for(let prop in definedProps){
			segments.push(props[prop] || definedProps[prop]);
		}
		segments.push({ separator: '/' });
		return segments;
	}

	return function(MyComponent) {
		return function QueryPathJoin(props) {
			return (
				<MyComponent 
				{...props} 
				queryPath={joinable.apply(
					null, 
					joinableSegments(props, propsToJoin))} 
				/>
			);
		}
	}
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