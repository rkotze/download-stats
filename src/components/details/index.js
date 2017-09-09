import React, { PropTypes, Component } from 'react';
import s from '../../styles/style';
import { withPropsToPath, withFetch } from '../superagent-hoc';
import { compose } from 'joinable';
import moment from 'moment';
import c3 from 'c3';
import 'c3/c3.min.css';

function Details({params}) {
  return (
    <div>
    	<h2><i className="fa fa-bar-chart fa-3x" aria-hidden="true"></i> {capitalize(params.name)} for the last 30 days</h2>
    	<div><OneMonthPackage packageName={params.name} /></div>
    </div>
  );
}

function capitalize(sentance) {
	return sentance.replace(/\b\w/g, word => word.toUpperCase());
}

const OneMonthPackage = compose(
	withPropsToPath({
		queryType: 'range', //range
    period: 'last-month', //last-week, last-month, date range 2014-01-01:2014-01-31
    packageName: ''}),
  withFetch('https://api.npmjs.org/downloads')
  )(PackageDownloadList);

function PackageDownloadList({packageName, success, failure}){
	if(success && failure === null){
		const { downloads, start, end } = success;
		return (<div>
				<p style={s.p}><i className="fa fa-calendar fa-2x" aria-hidden="true"></i>&nbsp;
					<em>{moment(start).format('Do MMM YYYY')}</em> -&nbsp;
					<em>{moment(end).format('Do MMM YYYY')}</em>
				</p>
				<p style={s.p} className="fa-2x">
					<strong><i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>&nbsp;
						{downloads.reduce(function(total, downloads, i){
							return total + downloads.downloads;
						}, 0)}
					</strong>
				</p>
				<ChartBar downloads={downloads} />
			</div>);
	}

	return (<div>Loading ...</div>);
}

class ChartBar extends Component {
	constructor(){
		super();
	}

	componentDidMount(){
		const { downloads } = this.props;
		let downloadData = ['downloads'].concat(extractPropValues(downloads, 'downloads'));
		let xAxis = ['day'].concat(extractPropValues(downloads, 'day'));
		var chart = c3.generate({
        data: {
        	x: 'day',
          columns: [
            downloadData,
            xAxis
          ],
          type: 'bar'
        },
        axis : {
        	x:{
            type : 'timeseries',
            tick: {
                format: function (downloadDate) { return moment(downloadDate).format('ddd Do MMM'); }
            }
	        }
		    },
        bar: {
          width: {
            ratio: 0.9,
          },
        }
      });
	}

	render(){
		return(
      <div id="chart"></div>
		);
	}
}

function extractPropValues(downloads, prop){
	return downloads.map(function(download) {
		return download[prop];
	});
};

export default Details;
