import React from 'react';
import PlaceTwoTone from '@material-ui/icons/PlaceTwoTone';

const PinIcon = ({ size, color, onClick }) => (
	<PlaceTwoTone onClick={onClick} style={{ fontSize: size, color }} />
);
export default PinIcon;
