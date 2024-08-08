import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

function UserProfileDetails({authState, first_name, last_name, email_add, phone_number, handleSubmit}) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const URL = `${process.env.REACT_APP_API_URL}/users`;

	const navigate = useNavigate();

	useEffect(() => {
		if (!authState.status) {
			localStorage.removeItem("accessToken");
			navigate('/login');
		} else {
			try {
				const user = { username: authState.username };

				const fetchData = async() => {
					await axios.post(`${URL}/getUserDetails/${authState.id}`, user).then((response) => {
						if (response.data.error) {
							// alert(response.data.error);
						} else {
							const data = response.data.data;
							// console.log(data.email)
							// setFirstName(data.first_name)
						}
					});
				}

				fetchData();
			} catch (error) {
				console.error('Error user get data:', error);
			}
		}
	}, []);

	useEffect(() => {
		setFirstName(first_name);
	}, [first_name]);

	useEffect(() => {
		setLastName(last_name);
	}, [last_name]);

	useEffect(() => {
		setEmail(email_add);
	}, [email_add]);

	useEffect(() => {
		setPhoneNumber(phone_number);
	}, [phone_number]);

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader subheader="The information can be edited" title="Profile" />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid md={6} xs={12}>
							<FormControl fullWidth required>
								<InputLabel>First name</InputLabel>
								<OutlinedInput value={firstName} label="First name" name="firstName" onChange={(e) => setFirstName(e.target.value)} />
							</FormControl>
						</Grid>
						<Grid md={6} xs={12}>
							<FormControl fullWidth required>
								<InputLabel>Last name</InputLabel>
								<OutlinedInput value={lastName} label="Last name" name="lastName" onChange={(e) => setLastName(e.target.value)} />
							</FormControl>
						</Grid>
						<Grid md={6} xs={12}>
							<FormControl fullWidth required>
								<InputLabel>Email address</InputLabel>
								<OutlinedInput value={email} label="Email address" name="email" onChange={(e) => setEmail(e.target.value)} />
							</FormControl>
						</Grid>
						<Grid md={6} xs={12}>
							<FormControl fullWidth>
								<InputLabel>Phone number</InputLabel>
								<OutlinedInput value={phoneNumber} label="Phone number" name="phone" type="tel" onChange={(e) => setPhoneNumber(e.target.value)} />
							</FormControl>
						</Grid>
						
						<Grid md={6} xs={12}>
							<FormControl fullWidth>
								<InputLabel>City</InputLabel>
								<OutlinedInput label="City" />
							</FormControl>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<CardActions sx={{ justifyContent: 'flex-end' }}>
					<Button type="submit" variant="contained" style={{textTransform: 'none'}}>Save details</Button>
				</CardActions>
			</Card>
		</form>
	)
}

export default UserProfileDetails;