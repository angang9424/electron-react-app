import React, { useContext } from 'react';

import { AuthContext } from '../../helpers/AuthContext';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function UserInfo() {
	const { authState } = useContext(AuthContext);

	return (
		<Card>
			<CardContent>
				<Stack spacing={2} sx={{ alignItems: 'center' }}>
					<div>
						<Avatar sx={{ height: '80px', width: '80px' }} />
					</div>
					<Stack spacing={1} sx={{ textAlign: 'center' }}>
						<Typography variant="h5">{ authState.username }</Typography>
						<Typography color="text.secondary" variant="body2">
							{/* {user.city} {user.country} */}
							Los Angeles USA
						</Typography>
						<Typography color="text.secondary" variant="body2">
							{/* {user.timezone} */}
							GTM-7
						</Typography>
					</Stack>
				</Stack>
			</CardContent>
			<Divider />
			<CardActions>
				<Button fullWidth variant="text">
					Upload picture
				</Button>
			</CardActions>
		</Card>
	)
}

export default UserInfo;