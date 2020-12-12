import React, { useState, useContext } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/SaveTwoTone';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Context from '../../context';
import { useClient } from '../../client';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';

const CreatePin = ({ classes }) => {
	const mobileSize = useMediaQuery('(max-width: 650px)');
	const client = useClient();
	const { state, dispatch } = useContext(Context);
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [content, setContent] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const handleDeleteDraft = () => {
		setTitle('');
		setImage('');
		setContent('');
		dispatch({ type: 'DELETE_DRAFT' });
	};

	const handleImageUpload = async () => {
		const data = new FormData();
		data.append('file', image);
		data.append(
			'upload_preset',
			process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
		);
		data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
		const res = await axios.post(
			process.env.REACT_APP_CLOUDINARY_URL,
			data
		);
		return res.data.url;
	};

	const handleSubmit = async event => {
		try {
			event.preventDefault();
			setSubmitting(true);
			const url = await handleImageUpload();
			const { latitude, longitude } = state.draft;
			const variables = {
				title,
				image: url,
				content,
				latitude,
				longitude
			};
			await client.request(CREATE_PIN_MUTATION, variables);
			// console.log('Pin created', { createPin });
			// dispatch({ type: 'CREATE_PIN', payload: createPin });
			// console.log({ title, image, url, content });
			handleDeleteDraft();
		} catch (error) {
			setSubmitting(true);
			console.error('Error creating pin', error);
		}
	};

	return (
		<form className={classes.form}>
			<Typography
				className={classes.alignCenter}
				component="h2"
				variant="h4"
				color="secondary">
				<LandscapeIcon className={classes.iconLarge} /> Pin Location
			</Typography>
			<div>
				<TextField
					name="title"
					label="Title"
					placeholder="Insert pin title"
					onChange={e => setTitle(e.target.value)}
				/>
				<input
					accept="image/*"
					id="image"
					type="file"
					className={classes.input}
					onChange={e => setImage(e.target.files[0])}
				/>
				<label htmlFor="image">
					<Button
						color={image ? 'primary' : 'secondary'}
						component="span"
						size="small"
						className={classes.button}>
						<AddAPhotoIcon />
					</Button>
				</label>
			</div>
			<div className={classes.contentField}>
				<TextField
					name="content"
					label="Content"
					multiline
					rows={mobileSize ? '3' : '6'}
					margin="normal"
					fullWidth
					variant="outlined"
					onChange={e => setContent(e.target.value)}
				/>
			</div>
			<div>
				<Button
					className={classes.button}
					variant="contained"
					color="secondary"
					onClick={handleDeleteDraft}>
					<ClearIcon className={classes.leftIcon} />
					Discard
				</Button>
				<Button
					type="Submit"
					className={classes.button}
					variant="contained"
					color="primary"
					disabled={
						!title.trim() || !content.trim() || !image || submitting
					}
					onClick={handleSubmit}>
					Submit
					<SaveIcon className={classes.rightIcon} />
				</Button>
			</div>
		</form>
	);
};

const styles = theme => ({
	form: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		paddingBottom: theme.spacing.unit
	},
	contentField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '95%'
	},
	input: {
		display: 'none'
	},
	alignCenter: {
		display: 'flex',
		alignItems: 'center'
	},
	iconLarge: {
		fontSize: 40,
		marginRight: theme.spacing.unit
	},
	leftIcon: {
		fontSize: 20,
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		fontSize: 20,
		marginLeft: theme.spacing.unit
	},
	button: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit,
		marginLeft: 0
	}
});

export default withStyles(styles)(CreatePin);
