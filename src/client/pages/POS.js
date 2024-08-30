import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

import { AuthContext } from '../helpers/AuthContext';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OutlinedInput from '@mui/material/OutlinedInput';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function POS() {
	const [books, setBooks] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);

	const { authState, setAuthState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/books`;
	const SO_URL = `${process.env.REACT_APP_API_URL}/salesOrders`;

	useEffect(() => {
		try {
			const fetchData = async() => {
				const result = await fetch(URL);
				if (!result.ok) {
					throw new Error(`HTTP error! status: ${result.status}`);
				}
				result.json().then(json => {
					setBooks(json.data);
				})
			}

			fetchData();
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}, []);

	const handleRowClick = (book) => {
		const existingItem = selectedItems.find(item => item.name === book.name);

		if (existingItem) {
			const updatedItems = selectedItems.map(item => 
				item.name === book.name 
					? { 
						...item, 
						qty: item.qty + 1, 
						amount: (item.qty + 1) * item.rate 
					}
					: item
			);
			setSelectedItems(updatedItems);
		} else {
			const newItem = {
				idx: selectedItems.length + 1
				, item: book.book_id
				, name: book.name
				, qty: 1
				, rate: book.price
				, amount: book.price
				, stock_qty: book.stock_qty
			};
			setSelectedItems([...selectedItems, newItem]);
		}

		setTotalAmount(totalAmount + book.price);
	};

	const Save = (event) => {
		try {
			console.log(authState)
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);
			const so = { date: utcDateConvertToLocal, total_amount: totalAmount, items: selectedItems, created_modified_by: authState.username, modified: utcDateConvertToLocal };

			const saveData = async() => {
				await axios.post(`${SO_URL}`, so).then((response) => {
					if (response.data.error) {
						alert(response.data.error);
					} else {
						const data = response.data.data;
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
					// const items = err.response?.data?.data.items;
					// setRows(items);
					// items.forEach((row, index) => {
					// 	if (row.qty > row.stock_qty) {
					// 		qtyErrorHandler(index, true);
					// 	} else {
					// 		qtyErrorHandler(index, false);
					// 	}
					// });
					// return `Error: ${err.response?.data?.msg}`;
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Stack spacing={3} style={{ paddingTop: '64px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px' }}>
			<Stack direction="row" spacing={3}>
				<Card>
					<Box sx={{ overflowX: 'auto' }}>
						<Table sx={{ minWidth: '800px' }}>
							<TableHead style={{backgroundColor: '#f9fafb', color: '#667085',lineHeight: 1,}}>
								<TableRow key={'column'}>
									<TableCell>Name</TableCell>
									<TableCell>Rate</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{books.map((book, index) => (
									<TableRow hover key={book.idx} onClick={() => handleRowClick(book)}>
										<TableCell style={{width: '5%'}}>{book.name}</TableCell>
										<TableCell style={{width: '20%'}}>{book.price}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Box>
				</Card>
				<Card>
					<Box sx={{ overflowX: 'auto' }}>
						<Table sx={{ minWidth: '800px' }}>
							<TableHead style={{backgroundColor: '#f9fafb', color: '#667085',lineHeight: 1,}}>
								<TableRow key={'column'}>
									<TableCell></TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Rate</TableCell>
									<TableCell>Qty</TableCell>
									<TableCell>Amt</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{selectedItems ? (
									selectedItems.map((selectedItem, index) => (
										<TableRow hover key={selectedItem.idx}>
											<TableCell style={{width: '5%'}}>{selectedItem.idx}</TableCell>
											<TableCell style={{width: '5%'}}>{selectedItem.name}</TableCell>
											<TableCell style={{width: '20%'}}>{selectedItem.rate}</TableCell>
											<TableCell style={{width: '20%'}}><OutlinedInput value={selectedItem.qty} name="qty" id='qty' /></TableCell>
											<TableCell style={{width: '20%'}}>{selectedItem.amount}</TableCell>
										</TableRow>
									))
								) : ([])}
							</TableBody>
						</Table>
					</Box>
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
					<Divider />
					<Button onClick={(event) => Save()} variant="contained" color="primary" style={{ marginTop: '20px' }}>
						Confirm Order
					</Button>
				</Card>
			</Stack>
		</Stack>
	)
}

export default POS;