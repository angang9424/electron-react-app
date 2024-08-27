import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../helpers/AuthContext';

import SalesOrderTable from '../components/salesOrder/SalesOrderTable';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

function PurchaseOrder() {
	const page = 0;
	const rowsPerPage = 5;

	const [po, setPO] = useState([]);

	const { authState, setAuthState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/salesOrders`;

	const navigate = useNavigate();

	useEffect(() => {
		if (!authState.status) {
			localStorage.removeItem("accessToken");
			navigate('/login');
		} else {
			try {
				const getPOs = async() => {
					await axios.get(URL).then((response) => {
						if (response.data.error) {
							alert(response.data.error);
						} else {
							const data = response.data.data;
							setPO(data);
						}
					});
				}
	
				getPOs();
			} catch (error) {
				console.error('Error get data:', error);
			}

			return () => {
			}
		}
	}, []);

	return (
		<Stack spacing={3} style={{ paddingTop: '64px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px' }}>
			<Stack direction="row" spacing={3}>
        		<Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          			<Typography variant="h4">Sales Order</Typography>
				</Stack>
				<div>
					<Button startIcon={<PlusIcon fontSize='20px' color='white' />} variant="contained"  style={{textTransform: 'none'}} onClick={() => navigate('/sales_order_details')}>
						Add
					</Button>
				</div>
			</Stack>
			<SalesOrderTable
				pos={po}
				pages={page}
				rowsPerPages={rowsPerPage}
			/>
		</Stack>
	)
}

export default PurchaseOrder;