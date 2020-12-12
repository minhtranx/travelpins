import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
	palette: {
		primary: {
			light: cyan[300],
			main: cyan[500],
			dark: cyan[700],
			contrastText: '#fff'
		},
		secondary: {
			light: blueGrey[300],
			main: blueGrey[500],
			dark: blueGrey[700],
			contrastText: '#fff'
		}
	},
	typography: {
		useNextVariants: true
	}
});

function withRoot(Component) {
	function WithRoot(props) {
		// MuiThemeProvider makes the theme available down the React tree
		// thanks to React context.
		return (
			<MuiThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				{/* https://material-ui.com/getting-started/usage/#cssbaseline */}
				<CssBaseline />
				<Component {...props} />
			</MuiThemeProvider>
		);
	}

	return WithRoot;
}

export default withRoot;
