import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Context from '../../context';

const Signout = ({ classes }) => {
	const mobileSize = useMediaQuery('(max-width: 650px)');
	const { dispatch } = useContext(Context);
	const onLogout = () => {
		dispatch({ type: 'LOGOUT_USER' });
		// console.log('Logged out user');
	};

	return (
		<GoogleLogout
			onLogoutSuccess={onLogout}
			render={({ onClick }) => (
				<span className={classes.root} onClick={onClick}>
					<Typography
						style={{ display: mobileSize ? 'none' : 'block' }}
						variant="body1"
						className={classes.buttonText}>
						Sign out
					</Typography>
					<ExitToApp className={classes.buttonIcon} />
				</span>
			)}
		/>
	);
};

const styles = {
	root: {
		cursor: 'pointer',
		display: 'flex'
	},
	buttonText: {
		color: 'white'
	},
	buttonIcon: {
		marginLeft: '5px',
		color: 'white'
	}
};

export default withStyles(styles)(Signout);
