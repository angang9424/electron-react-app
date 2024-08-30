import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

import { AuthContext } from '../../helpers/AuthContext';
import SalesOrderItemsTable from '../../components/salesOrder/SalesOrderItemsTable';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import dayjs from 'dayjs';

function SalesOrderDetails() {
	const navigate = useNavigate();
	const location = useLocation();
	let { so_id } = location.state || {};

	const [id, setID] = useState(so_id);
	const [rows, setRows] = useState([{ idx: 1, item: '', qty: 0, rate: 0, amount: 0, id: 0, stock_qty: 0 }]);
	const [date, setDate] = useState('');
	const [totalAmount, setTotalAmount] = useState(0);
	const [qtyError, setQtyError] = useState(Array(rows.length).fill(''));

	const { authState, setAuthState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/salesOrders`;

	useEffect(() => {
		if (!authState.status) {
			localStorage.removeItem("accessToken");
			navigate('/login');
		} else {
			try {
				const getSOs = async() => {
					await axios.get(`${URL}/getsobyid/${id}`).then((response) => {
						if (response.data.error) {
							alert(response.data.error);
						} else {
							const data = response.data.data;
							setDate(dayjs(data.date).format('MM-DD-YYYY'));
							setTotalAmount(data.total_amount);
							getSOItems();
						}
					});
				}

				const getSOItems = async() => {
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
					getSOs();
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
			, stock_qty: 0
		};
		setRows([...rows, newRow]);
	};

	const Save = (event) => {
		event.preventDefault();
		try {
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);
			const so_date = new Date(event.target.date.value);
			const so = { date: so_date, total_amount: totalAmount, items: rows, created_modified_by: authState.username, modified: utcDateConvertToLocal };

			const saveData = async() => {
				await axios.post(`${URL}`, so).then((response) => {
					if (response.data.error) {
						alert(response.data.error);
					} else {
						const data = response.data.data;
						setID(data.id);
						// SaveChild(data.id);
					}
				});
			}

			toast.promise(saveData, {
				loading: 'Loading...',
				success: () => {
				  return `SO has been created`;
				},
				error: (err) => {
					// setQtyError('Error: Qty more than Stock QTY');
					const items = err.response?.data?.data.items;
					setRows(items);
					items.forEach((row, index) => {
						if (row.qty > row.stock_qty) {
							qtyErrorHandler(index, true);
						} else {
							qtyErrorHandler(index, false);
						}
					});
					return `Error: ${err.response?.data?.msg}`;
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const SaveChild = (order_id) => {
		try {
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);

			rows.forEach(row => {
				const so_item = { idx: row.idx, item: row.item, qty: row.qty, stock_qty: row.stock_qty, rate: row.rate, amount: row.amount, order_id: order_id, created_modified_by: authState.username, modified: utcDateConvertToLocal };
				const saveChildData = async() => {
					await axios.post(`${URL}/createChild`, so_item).then((response) => {
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
				await axios.delete(`${URL}/updatedeletechildbyid/${order_id}`, {params: { 
					modified_by: authState.username, 
					modified: utcDateConvertToLocal 
				}}).then((response) => {
					if (response.data.error) {
						alert(response.data.error);
					} else {
						const data = response.data.data;
						SaveChild(order_id);
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
			const so_date = new Date(event.target.date.value);
			const so = { date: so_date, total_amount: totalAmount, modified_by: authState.username, modified: utcDateConvertToLocal };

			const updateData = async() => {
				await axios.put(`${URL}/${id}`, so).then((response) => {
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
				  return `SO has been updated`;
				},
				error: 'Error',
			});
		} catch (error) {
			console.log(error)
		}
	}

	const calTotalAmt = (index, items, item_value, qty) => {
		let stock_qty = 0;
		let rate = 0;
		let amount = 0;

		const item = items.filter((val) => {
			if (val.book_id == item_value) {
				stock_qty = val.stock_qty;
				rate = val.price;
				amount = qty * val.price;

				if (qty > stock_qty) {
					// setQtyError('Error: Qty more than Stock QTY');
					qtyErrorHandler(index, true);
				} else {
					// setQtyError('');
					qtyErrorHandler(index, false);
				}
			};
		});

		return {stock_qty, rate, amount}
	}

	const editRow = (e, index, items) => {
		let {stock_qty, rate, amount} = calTotalAmt(index, items, rows[index].item, e.target.value);

		const updatedRow = {
			...rows[index],
			qty: e.target.value,
			stock_qty: stock_qty,
			rate: rate,
			amount: amount
		};

		const updatedRows = [...rows];
		updatedRows[index] = updatedRow;
		setRows(updatedRows);
		calTotalAmount(updatedRows);
	}

	const editBookSelectRow = async (e, index, items) => {
		let {stock_qty, rate, amount} = calTotalAmt(index, items, e.target.value, rows[index].qty);

		const updatedRow = {
			...rows[index],
			qty: 0,
			item: e.target.value,
			stock_qty: stock_qty,
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

	const Delete = (event) => {
		try {
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);
			// const po_date = new Date(event.target.date.value);
			// const po = { date: po_date, total_amount: totalAmount, modified_by: authState.username, modified: utcDateConvertToLocal };

			const deleteData = async() => {
				await axios.delete(`${URL}/${id}`, {params: { 
					modified_by: authState.username, 
					modified: utcDateConvertToLocal 
				}}).then((response) => {
					if (response.data.error) {
						alert(response.data.error);
					} else {
						// const data = response.data.data;
						navigate('/sales_order');
					}
				});
			}

			toast.promise(deleteData, {
				loading: 'Loading...',
				success: () => {
				  return `SO has been deleted`;
				},
				error: 'Error',
			});
		} catch (error) {
			console.log(error)
		}
	}

	const qtyErrorHandler = async (index, error) => {
		if (error) {
			setQtyError((prevErrors) => {
				const newQtyError = [...prevErrors];
				newQtyError[index] = 'Error: Qty more than Stock QTY';
				return newQtyError;
			});
		} else {
			setQtyError((prevErrors) => {
				const newQtyError = [...prevErrors];
				newQtyError[index] = '';
				return newQtyError;
			});
		}
	}

	return (
		<form onSubmit={id ? (Update) : (Save)}>
			<Stack spacing={3} style={{ paddingTop: '64px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px' }}>
				<Stack direction="row" spacing={3}>
					<Stack spacing={1} sx={{ flex: '1 1 auto' }}>
						<Typography variant="h4">{id ? (id) : ('New Sales Order')}</Typography>
					</Stack>
					<div>
						<Button style={{backgroundColor:'red'}} variant="contained" onClick={(event) => Delete()}><DeleteIcon /></Button>
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
					{/* <Alert severity="success">
						Here is a gentle confirmation that your action was successful.
					</Alert> */}
					<SalesOrderItemsTable
						// pos={po}
						// pages={page}
						// rowsPerPages={rowsPerPage}
						rows={rows}
						editRow={editRow}
						editBookSelectRow={editBookSelectRow}
						qtyError={qtyError}
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

export default SalesOrderDetails;