import React, { PropTypes } from 'react';
import {AppBar, Tabs, Tab} from 'material-ui';
import {indigo500, indigo700, redA200} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment)
);

const styles = {
	navbar: {
		height: '70px',
		paddingTop: '2px'
	},
};

const muiTheme = getMuiTheme({
		palette: {
				primary1Color: indigo500,
				primary2Color: indigo700,
				accent1Color: redA200,
				pickerHeaderColor: indigo500,
		},
});

var events = [
	{
		'title': 'All Day Event',
		'allDay': true,
		'start': new Date(2015, 3, 0),
		'end': new Date(2015, 3, 0)
	},
	{
		'title': 'Long Event',
		'start': new Date(2015, 3, 7),
		'end': new Date(2015, 3, 10)
	},

	{
		'title': 'DTS STARTS',
		'start': new Date(2016, 2, 13, 0, 0, 0),
		'end': new Date(2016, 2, 20, 0, 0, 0)
	},

	{
		'title': 'DTS ENDS',
		'start': new Date(2016, 10, 6, 0, 0, 0),
		'end': new Date(2016, 10, 13, 0, 0, 0)
	},

	{
		'title': 'Some Event',
		'start': new Date(2015, 3, 9, 0, 0, 0),
		'end': new Date(2015, 3, 9, 0, 0, 0)
	},
	{
		'title': 'Conference',
		'start': new Date(2015, 3, 11),
		'end': new Date(2015, 3, 13),
		desc: 'Big conference for important people'
	},
	{
		'title': 'Meeting',
		'start': new Date(2015, 3, 12, 10, 30, 0, 0),
		'end': new Date(2015, 3, 12, 12, 30, 0, 0),
		desc: 'Pre-meeting meeting, to prepare for the meeting'
	},
	{
		'title': 'Lunch',
		'start':new Date(2015, 3, 12, 12, 0, 0, 0),
		'end': new Date(2015, 3, 12, 13, 0, 0, 0),
		desc: 'Power lunch'
	},
	{
		'title': 'Meeting',
		'start':new Date(2015, 3, 12,14, 0, 0, 0),
		'end': new Date(2015, 3, 12,15, 0, 0, 0)
	},
	{
		'title': 'Happy Hour',
		'start':new Date(2015, 3, 12, 17, 0, 0, 0),
		'end': new Date(2015, 3, 12, 17, 30, 0, 0),
		desc: 'Most important meal of the day'
	},
	{
		'title': 'Dinner',
		'start':new Date(2015, 3, 12, 20, 0, 0, 0),
		'end': new Date(2015, 3, 12, 21, 0, 0, 0)
	},
	{
		'title': 'Birthday Party',
		'start':new Date(2015, 3, 13, 7, 0, 0),
		'end': new Date(2015, 3, 13, 10, 30, 0)
	}
]

class Basic extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			events: events
		};
	}


	render(){
		return (
			<div>
				<MuiThemeProvider muiTheme={muiTheme}>
					<AppBar title="My App"/>
				</MuiThemeProvider>
				<BigCalendar
					{...this.props}
					events={events}
					defaultDate={new Date(2015, 3, 1)}
				/>
			</div>
		)
	}
}

export default Basic;
