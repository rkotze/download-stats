import React, { PropTypes, Component } from 'react';
import s from '../../styles/style';
import { withNpmApi } from '../superagent-hoc';
import moment from 'moment';
import c3 from 'c3';
import 'c3/c3.min.css';

function Details({params}) {
  return (
    <div>
    	<h2>{capitalize(params.name)} for the last 30 days</h2>
    	<div><OneMonthPackage packageName={params.name} /></div>
    </div>
  );
}

function capitalize(sentance) {
	return sentance.replace(/\b\w/g, word => word.toUpperCase());
}

const OneMonthPackage = withNpmApi(PackageDownloadList,'https://api.npmjs.org/downloads');
OneMonthPackage.defaultProps = {
	queryType: 'range',
	period: 'last-month',
};

function PackageDownloadList({packageName, success, failure}){
	if(success && failure === null){
		const { downloads, start, end } = success;
		return (<div>
				<p>
					<em>{moment(start).format('Do MMM YYYY')}</em> -&nbsp;
					<em>{moment(end).format('Do MMM YYYY')}</em>
				</p>
				<p style={s.p}>
					Total: <strong>
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
                format: function (downloadDate) { return moment(downloadDate).format('Do MMM'); }
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
