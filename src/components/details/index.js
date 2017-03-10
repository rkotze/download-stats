import React, { PropTypes } from 'react';
import s from '../../styles/style';
import superagentHoc from '../superagent-hoc';
import moment from 'moment';

function Details({params}) {
  return (
    <div>
    	<h2>{Capitalize(params.name)} over the past 30 days</h2>
    	<div><OneMonthPackage packageName={params.name} /></div>
    </div>
  );
}

function Capitalize(sentance) {
	return sentance.replace(/\b\w/g, word => word.toUpperCase());
}

const OneMonthPackage = superagentHoc(PackageDownloadList,'https://api.npmjs.org/downloads');
OneMonthPackage.defaultProps = {
	queryType: 'range',
	period: 'last-month',
};

function PackageDownloadList({packageName, success, failure}){
	if(success && failure === null){
		const { downloads, start, end } = success;
		return (<div>
				<p style={s.p}>
					Range: <em>{start}</em>-&nbsp;
					<em>{end}</em>
				</p>
				{downloads.reverse().map(function(download, i){
					return <PackageData key={i} {...download} />
				})}
			</div>);
	}

	return (<div>Loading ...</div>);
}

function PackageData({day, downloads}){
	return (<p><strong style={s.downloadNumber}>{downloads}</strong> downloads&nbsp;
        {moment(day + ' 23:59:59', 'YYYY-MM-DD hh:mm:ss').fromNow()}</p>)
}

export default Details;
