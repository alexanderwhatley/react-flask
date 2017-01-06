import Hello from './Hello';
import React from 'react';
import ReactDOM from 'react-dom';
import Basic from './basic';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
	amber600,
	teal700, teal800,
	grey100, grey200, grey300, grey400, grey500, grey700,
	white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: teal700,
		primary2Color: teal800,
		primary3Color: grey200,
		accent1Color: amber600,
		accent2Color: grey200,
		accent3Color: grey300,
		textColor: darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: grey300,
		pickerHeaderColor: darkBlack,
	},
});

ReactDOM.render(
<MuiThemeProvider muiTheme={muiTheme}>
	<Basic/>
</MuiThemeProvider>
	,document.getElementById('reactEntry'));
