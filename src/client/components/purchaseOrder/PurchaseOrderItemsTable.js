import React, { useEffect, useState, useContext } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function PurchaseOrderItemsTable({rows, editRow, editBookSelectRow}) {
	const [books, setBooks] = useState([]);

	const URL = `${process.env.REACT_APP_API_URL}/books`;

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

	return (
		<Stack spacing={3} style={{ paddingTop: '24px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}>
			<Card>
				<Box sx={{ overflowX: 'auto' }}>
					<Table sx={{ minWidth: '800px' }}>
						<TableHead style={{backgroundColor: '#f9fafb', color: '#667085',lineHeight: 1,}}>
							<TableRow key={'column'}>
								<TableCell>ID</TableCell>
								<TableCell>Items</TableCell>
								<TableCell>Qty</TableCell>
								<TableCell>Rate</TableCell>
								<TableCell>Amount</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, index) => (
								<TableRow hover key={row.idx}>
									<TableCell style={{width: '5%'}}>{row.idx}</TableCell>
									<TableCell style={{width: '35%'}}>
										<Select style={{width: '100%'}} value={row.item} name="item" id="item" variant="outlined" onChange={(e) => editBookSelectRow(e, index, books)}>
											{books.map((book) => (
												<MenuItem key={book.book_id} value={book.book_id}>
													{book.name}
												</MenuItem>
											))}
										</Select>
									</TableCell>
									<TableCell style={{width: '20%'}}><OutlinedInput value={row.qty} name="qty" id='qty' onChange={(e) => editRow(e, index, books)} /></TableCell>
									<TableCell style={{width: '20%'}}>{row.rate}</TableCell>
									<TableCell style={{width: '20%'}}>{row.amount}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{/* <Button onClick={addRow} variant="contained" color="primary" style={{ marginTop: '20px' }}>
						Add Row
					</Button> */}
				</Box>
			</Card>
		</Stack>
	)
}

export default PurchaseOrderItemsTable;