import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

import { AuthContext } from '../../helpers/AuthContext';
import PurchaseOrderItemsTable from '../../components/purchaseOrder/PurchaseOrderItemsTable';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import dayjs from 'dayjs';

function PurchaseOrderDetails() {
	const navigate = useNavigate();
	const location = useLocation();
	let { po_id } = location.state || {};

	const [id, setID] = useState(po_id);
	const [rows, setRows] = useState([{ idx: 1, item: '', qty: 0, rate: 0, amount: 0, id: 0 }]);
	const [date, setDate] = useState('');
	const [totalAmount, setTotalAmount] = useState(0);

	const { authState, setAuthState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/purchaseOrders`;

	useEffect(() => {
		if (!authState.status) {
			localStorage.removeItem("accessToken");
			navigate('/login');
		} else {
			try {
				const getPOs = async() => {
					await axios.get(`${URL}/getpobyid/${id}`).then((response) => {
						if (response.data.error) {
							alert(response.data.error);
						} else {
							const data = response.data.data;
							setDate(dayjs(data.date).format('MM-DD-YYYY'));
							setTotalAmount(data.total_amount);
							getPOItems();
						}
					});
				}

				const getPOItems = async() => {
					await axios.get(`${URL}/getChildById/${id}`).then((response) => {
						if (response.data.error) {
							alert(response.data.error);
						} else {
							const data = response.data.data;
							setRows(data);
						}
					});
				}
	
				if (id) {
					getPOs();
				}
			} catch (error) {
				console.error('Error get data:', error);
			}
		}
	}, []);

	const addRow = () => {
		const newRow = {
			idx: rows.length + 1
			, item: 0
			, qty: 0
			, rate: 0
			, amount: 0
			, id: 0
		};
		setRows([...rows, newRow]);
	};

	const Save = (event) => {
		event.preventDefault();
		try {
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);
			const po_date = new Date(event.target.date.value);
			const po = { date: po_date, total_amount: totalAmount, created_modified_by: authState.username, modified: utcDateConvertToLocal };

			const saveData = async() => {
				await axios.post(`${URL}`, po).then((response) => {
					if (response.data.error) {
						alert(response.data.error);
					} else {
						const data = response.data.data;
						setID(data.id);
						SaveChild(data.id);
					}
				});
			}

			toast.promise(saveData, {
				loading: 'Loading...',
				success: () => {
				  return `PO has been created`;
				},
				error: 'Error',
			});
		} catch (error) {
			console.log(error)
		}
	};

	const SaveChild = (order_id) => {
		try {
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);

			rows.forEach(row => {
				const po_item = { idx: row.idx, item: row.item, qty: row.qty, rate: row.rate, amount: row.amount, order_id: order_id, created_modified_by: authState.username, modified: utcDateConvertToLocal };
				const saveChildData = async() => {
					await axios.post(`${URL}/createChild`, po_item).then((response) => {
						if (response.data.error) {
							alert(response.data.error);
						} else {
							const data = response.data.data;
							row.id = data.id;
						}
					});
				}

				saveChildData();
			});
		} catch (error) {
			console.log(error)
		}
	};

	const DeleteChild = (order_id) => {
		try {
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);

			const deleteChildData = async() => {
				await axios.delete(`${URL}/updatedeletechildbyid/${order_id}`).then((response) => {
					console.log(response)
					if (response.data.error) {
						alert(response.data.error);
					} else {
						const data = response.data.data;
						console.log(data)
						SaveChild(order_id)
					}
				});
			}

			deleteChildData();
		} catch (error) {
			console.log(error)
		}
	};

	const Update = (event) => {
		event.preventDefault();
		try {
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);
			const po_date = new Date(event.target.date.value);
			const po = { date: po_date, total_amount: totalAmount, modified_by: authState.username, modified: utcDateConvertToLocal };

			const updateData = async() => {
				await axios.put(`${URL}/${id}`, po).then((response) => {
					if (response.data.error) {
						alert(response.data.error);
					} else {
						const data = response.data.data;
						DeleteChild(id);
					}
				});
			}

			toast.promise(updateData, {
				loading: 'Loading...',
				success: () => {
				  return `PO has been updated`;
				},
				error: 'Error',
			});
		} catch (error) {
			console.log(error)
		}
	}

	const calTotalAmt = (items, item_value, qty) => {
		let rate = 0;
		let amount = 0;

		const item = items.filter((val) => {
			if (val.book_id == item_value) {
				rate = val.price;
				amount = qty * val.price;
			};
		});

		return {rate, amount}
	}

	const editRow = (e, index, items) => {
		let {rate, amount} = calTotalAmt(items, rows[index].item, e.target.value);

		const updatedRow = {
			...rows[index],
			qty: e.target.value,
			rate: rate,
			amount: amount
		};

		const updatedRows = [...rows];
		updatedRows[index] = updatedRow;
		setRows(updatedRows);
		calTotalAmount(updatedRows);
	}

	const editBookSelectRow = async (e, index, items) => {
		let {rate, amount} = calTotalAmt(items, e.target.value, rows[index].qty);

		const updatedRow = {
			...rows[index],
			item: e.target.value,
			rate: rate,
			amount: amount
		};

		const updatedRows = [...rows];
		updatedRows[index] = updatedRow;
		setRows(updatedRows);
		calTotalAmount(updatedRows);
	}

	const calTotalAmount = (updatedRows) => {
		let total_amount = 0;

		updatedRows.forEach(row => {
			total_amount += row.amount;
		});

		setTotalAmount(total_amount);
	}

	return (
		<form onSubmit={id ? (Update) : (Save)}>
			<Stack spacing={3} style={{ paddingTop: '64px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px' }}>
				<Stack direction="row" spacing={3}>
					<Stack spacing={1} sx={{ flex: '1 1 auto' }}>
						<Typography variant="h4">{id ? (id) : ('New Purchase Order')}</Typography>
					</Stack>
					<div>
						<Button type="submit" variant="contained" style={{textTransform: 'none'}}>
							{id ? ('Update') : ('Save')}
						</Button>
					</div>
				</Stack>
				<Card>
					<CardContent>
						<Grid container spacing={3}>
							<Grid md={6} xs={12}>
								<FormControl required>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['DatePicker']}>
											<DatePicker value={dayjs(date)} label="Date" format="MM-DD-YYYY" id="date" name="date" slotProps={{textField: {helperText: 'MM-DD-YYYY'}}} />
										</DemoContainer>
									</LocalizationProvider>
								</FormControl>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<PurchaseOrderItemsTable
						// pos={po}
						// pages={page}
						// rowsPerPages={rowsPerPage}
						rows={rows}
						editRow={editRow}
						editBookSelectRow={editBookSelectRow}
					/>
					<Button onClick={addRow} variant="contained" color="primary" style={{ marginTop: '20px' }}>
						Add Row
					</Button>
					<Divider />
					<CardContent>
						<Grid container spacing={3}>
							<Grid md={6} xs={12}>
								<FormControl required>
									<label>Total Amount: {totalAmount}</label>
								</FormControl>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Stack>
		</form>
	)
}

export default PurchaseOrderDetails