import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../helpers/AuthContext';
import Popup from '../../components/Popup';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import EditIcon from '@mui/icons-material/Edit';

import dayjs from 'dayjs';

function BooksTable({books}) {
	const [buttonPopup, setButtonPopup] = useState(false);
	const [popupContent, setPopupContent] = useState('');

	const { authState, setAuthState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/books`;

	const navigate = useNavigate();

	useEffect(() => {
		if (!authState.status) {
			localStorage.removeItem("accessToken");
			navigate('/login');
		}
	}, []);

	const Save = (book_id, name, price) => {
		try {
			// const currentLocalDateTime = new Date();
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);
			const book = { name: name, price: price, modified: utcDateConvertToLocal };

			const saveData = async() => {
				const result = await fetch(`${URL}/${book_id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(book)
				});

				setButtonPopup(false);
			}

			saveData();
		} catch (error) {
			console.error('Error save data:', error);
		}
	}

	const Edit = (book_id, name, price) => {
		try {
			setButtonPopup(true);
			setPopupContent(
				<Stack spacing={3} style={{ paddingTop: '64px', paddingLeft: '24px', paddingRight: '24px' }}>
					<div>
						<Typography variant="h5">Book Details:</Typography>
					</div>
					<Card>
						<CardContent>
							<Grid container spacing={3}>
								<Grid md={6} xs={12}>
									<FormControl fullWidth>
										<InputLabel>Book ID</InputLabel>
										<OutlinedInput value={book_id} label="Book ID" name="book_id" readOnly />
									</FormControl>
								</Grid>
								<Grid md={6} xs={12}>
									<FormControl fullWidth required>
										<InputLabel>Book Name</InputLabel>
										<OutlinedInput defaultValue={name} label="Book Name" name="name" id='name' onChange={(e) => document.getElementById(e.target.name).value = e.target.value} />
									</FormControl>
								</Grid>
								<Grid md={6} xs={12}>
									<FormControl fullWidth required>
										<InputLabel>Price</InputLabel>
										<OutlinedInput defaultValue={price} label="Price" name="price" id='price' onChange={(e) => document.getElementById(e.target.name).value = e.target.value} />
									</FormControl>
								</Grid>
							</Grid>
						</CardContent>

						<CardActions sx={{ justifyContent: 'flex-end' }}>
							<Button variant="contained" style={{textTransform: 'none'}} onClick={() => Save(book_id, document.getElementById('name').value, document.getElementById('price').value)}>Save</Button>
							<Button variant="contained" style={{textTransform: 'none'}} onClick={() => setButtonPopup(false)}>Cancel</Button>
						</CardActions>
					</Card>
				</Stack>
				// <div>
				// 	<h3>Book Details:</h3>
				// 	<input type="text" id="book_id" value={book_id} readOnly />
				// 	<input type="text" id="name" defaultValue={name} onChange={(e) => document.getElementById(e.target.id).value = e.target.value} />
				// 	<input type="text" id="price" defaultValue={price} onChange={(e) => document.getElementById(e.target.id).value = e.target.value} />
				// 	<button onClick={ () => Save(book_id, document.getElementById('name').value, document.getElementById('price').value) }>Save</button>
				// 	<button onClick={ () => setButtonPopup(false) }>Cancel</button>
				// </div>
			);
		} catch (error) {
			console.error('Error edit data:', error);
		}
	}
	console.log(books)
	return (
		<Card>
			<Box sx={{ overflowX: 'auto' }}>
				<Table sx={{ minWidth: '800px' }}>
					<TableHead style={{backgroundColor: '#f9fafb', color: '#667085',lineHeight: 1,}}>
						<TableRow>
							{/* <TableCell padding="checkbox">
								<Checkbox
									checked={selectedAll}
									indeterminate={selectedSome}
									onChange={(event) => {
										if (event.target.checked) {
											selectAll();
										} else {
											deselectAll();
										}
									}}
								/>
							</TableCell> */}
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Created</TableCell>
							<TableCell>Modified</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{books.map((book) => {
							// const isSelected = selected?.has(row.id);

							return (
								<TableRow hover key={book.id}>
									{/* <TableCell padding="checkbox">
										<Checkbox
											checked={isSelected}
											onChange={(event) => {
												if (event.target.checked) {
													selectOne(row.id);
												} else {
													deselectOne(row.id);
												}
											}}
										/>
									</TableCell> */}
									{/* <TableCell>
										<Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
										<Avatar src={row.avatar} />
										<Typography variant="subtitle2">{row.name}</Typography>
										</Stack>
									</TableCell> */}
									<TableCell>{ book.book_id }</TableCell>
									<TableCell>{ book.name }</TableCell>
									<TableCell>{ book.price }</TableCell>
									<TableCell>{ dayjs(book.created).format('MMM D, YYYY') }</TableCell>
									<TableCell>{ dayjs(book.modified).format('MMM D, YYYY') }</TableCell>
									<TableCell>
										<div>
											<Button style={{position: 'inherit'}} variant="contained" onClick={() => Edit(book.book_id, book.name, book.price)}><EditIcon /></Button>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Box>
			<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
				<div>{ popupContent }</div>
			</Popup>
			<Divider />
			{/* <TablePagination
				component="div"
				count={count}
				onPageChange={noop}
				onRowsPerPageChange={noop}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/> */}
		</Card>
	)
}

export default BooksTable;