import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../helpers/AuthContext';
import Popup from '../components/Popup';

import UserProfileDetails from '../components/userProfile/UserProfileDetails';
import UserInfo from '../components/userProfile/UserInfo';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

function UserProfile() {
	const navigate = useNavigate();

	const [buttonPopup, setButtonPopup] = useState(false);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [popupContent, setPopupContent] = useState('');

	const { authState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/users`;

	// useEffect(() => {
	// 	try {
	// 		const fetchData = async() => {
	// 			const result = await fetch(URL);
	// 			if (!result.ok) {
	// 				throw new Error(`HTTP error! status: ${result.status}`);
	// 			}
	// 			result.json().then(json => {
	// 				setBooks(json.data);
	// 			})
	// 		}

	// 		fetchData();
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// }, []);

	const resetPassword = () => {	
		try {
			if (newPassword === rePassword) {
				const utcDateTime = new Date().toISOString();
				const utcDateConvertToLocal = new Date(utcDateTime);
				const user = { username: authState.username, password: oldPassword, newPassword: newPassword, modified: utcDateConvertToLocal };

				axios.put(`${URL}/updatePassword/${authState.id}`, user).then((response) => {
					const data = response.data;

					if (data.error) {
						alert(data.error);
					} else {
						if (data.data) {
							setButtonPopup(false);
						} else {
							console.log("wrong old password")
						}

					}
				});
			} else {
				console.log("Repeat Password not same")
			}
		} catch (error) {
			console.error('Error save data:', error);
		}
	}

	return (
		// <div className='userProfileContainer'>
		// 	<label>Username: { authState.username }</label>
		// 	<br />

		// 	<button onClick={ () => setButtonPopup(true) }>Reset Password</button>
		// 	<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
		// 		<div>
		// 			<div>
		// 				<h3>Reset Password:</h3>
		// 				<br />

		// 				<label>Old Password:</label>
		// 				<input type='password' onChange={(event) => { setOldPassword(event.target.value) }} />
		// 				<br />

		// 				<label>New Password:</label>
		// 				<input type='password' onChange={(event) => { setNewPassword(event.target.value) }} />
		// 				<br />

		// 				<label>Repeat New Password:</label>
		// 				<input type='password' onChange={(event) => { setRePassword(event.target.value) }} />
		// 				<br />
		// 				<br />

		// 				<button onClick={ () => resetPassword() }>Save</button>
		// 				<button onClick={ () => setButtonPopup(false) }>Cancel</button>
		// 			</div>
		// 		</div>
		// 	</Popup>
		// </div>
		<Stack spacing={3} style={{ paddingTop: '64px', paddingLeft: '24px', paddingRight: '24px' }}>
			 <div>
				<Typography variant="h4">Account</Typography>
			</div>
			<Grid container spacing={3}>
				<Grid lg={4} md={6} xs={12}>
					<UserInfo />
				</Grid>
				<Grid lg={8} md={6} xs={12}>
					<UserProfileDetails />
				</Grid>
			</Grid>
		</Stack>
	)
}

export default UserProfile;