import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../helpers/AuthContext';
import Popup from '../components/Popup';

import BooksTable from '../components/books/BooksTable';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import dayjs from 'dayjs';

// import { useSelection } from '@/hooks/use-selection';

function Home() {
	const [books, setBooks] = useState([]);
	const [search, setSearch] = useState('');

	const [editRow, setEditRow] = useState(null);
	const [editColumn, setEditColumn] = useState(null);
	const [editValue, setEditValue] = useState('');
	const [buttonPopup, setButtonPopup] = useState(false);
	const [popupContent, setPopupContent] = useState('');

	const { authState, setAuthState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/books`;

	const navigate = useNavigate();

	// MUI GUI
	// const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

	// const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
	// const selectedAll = rows.length > 0 && selected?.size === rows.length;

	useEffect(() => {
		if (!authState.status) {
			localStorage.removeItem("accessToken");
			navigate('/login');
		} else {
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
		}
	}, []);

	const handleEdit = (rowId, columnKey, value) => {
		setEditRow(rowId);
		setEditColumn(columnKey);
		setEditValue(value);
	};

	const handleSave = () => {
		setBooks((prevData) =>
			prevData.map((book) =>
				book.book_id === editRow ? { ...book, [editColumn]: editValue } : book
			)
		);
		setEditRow(null);
		setEditColumn(null);
		setEditValue('');
	};

	const handleCancel = () => {
		setEditRow(null);
		setEditColumn(null);
		setEditValue('');
	};

	const Save = (name, price) => {
		try {
			// const currentLocalDateTime = new Date();
			const utcDateTime = new Date().toISOString();
			const utcDateConvertToLocal = new Date(utcDateTime);
			const book = { name: name, price: price, modified: utcDateConvertToLocal };

			// const saveData = async() => {
			// 	const result = await fetch(`${URL}`, {
			// 		method: 'POST',
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 		body: JSON.stringify(book)
			// 	});

			// 	setBooks([...comments, commentToAdd])
			// 	setButtonPopup(false);
			// }

			const saveData = async() => {
				axios.post(URL, book).then((response) => {
					if (response.data.error) {
						alert(response.data.error);
					} else {
						const data = response.data.data;
						const bookToAdd = { book_id: data.book_id, name: name, price: price, modified: dayjs(utcDateConvertToLocal).format('MMM D, YYYY') };
						setBooks([...books, bookToAdd]);
						setButtonPopup(false);
					}
				});
			}

			saveData();
		} catch (error) {
			console.error('Error save data:', error);
		}
	}

	const Add = () => {
		try {
			setButtonPopup(true);
			setPopupContent(
				<Stack spacing={3} style={{ paddingTop: '64px', paddingLeft: '24px', paddingRight: '24px' }}>
					<div>
						<Typography variant="h5">Add New Book:</Typography>
					</div>
					<Card>
						<CardContent>
							<Grid container spacing={3}>
								<Grid md={6} xs={12}>
									<FormControl fullWidth required>
										<InputLabel>Book Name</InputLabel>
										<OutlinedInput label="Book Name" name="name" id='name' onChange={(e) => document.getElementById(e.target.name).value = e.target.value} />
									</FormControl>
								</Grid>
								<Grid md={6} xs={12}>
									<FormControl fullWidth required>
										<InputLabel>Price</InputLabel>
										<OutlinedInput label="Price" name="price" id='price' onChange={(e) => document.getElementById(e.target.name).value = e.target.value} />
									</FormControl>
								</Grid>
							</Grid>
						</CardContent>

						<CardActions sx={{ justifyContent: 'flex-end' }}>
							<Button variant="contained" style={{textTransform: 'none'}} onClick={() => Save(document.getElementById('name').value, document.getElementById('price').value)}>Add</Button>
							<Button variant="contained" style={{textTransform: 'none'}} onClick={() => setButtonPopup(false)}>Cancel</Button>
						</CardActions>
					</Card>
				</Stack>
			);
		} catch (error) {
			console.error('Error edit data:', error);
		}
	}

	return (
		// <div className='homeContainer'>
		// 	<div>
		// 		<Container>
		// 			<Form>
		// 				<InputGroup className='my-3'>
		// 					<Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search books' />
		// 				</InputGroup>
		// 			</Form>

		// 			<Table striped bordered hover>
		// 				<tbody>
		// 					{books ? (
		// 						books.filter((book) => {
		// 							return search.toLowerCase() === ''
		// 								? book
		// 								: book.name.toLowerCase().includes(search);
		// 						})
		// 						.map((book, key) => {
		// 							return <tr key={key}>
		// 								<td>{book.book_id}</td>
		// 								<td>{book.name}</td>
		// 								<td onClick={() => handleEdit(book.book_id, 'name', book.name)}>
		// 									{editRow === book.book_id && editColumn === 'name' ? (
		// 										<input
		// 										type="text"
		// 										value={editValue}
		// 										onChange={(e) => setEditValue(e.target.value)}
		// 										onBlur={handleSave}
		// 										/>
		// 									) : (
		// 										book.name
		// 									)}
		// 								</td>
		// 								<td onClick={() => handleEdit(book.book_id, 'price', book.price)}>
		// 									{editRow === book.book_id && editColumn === 'price' ? (
		// 										<input
		// 										type="text"
		// 										value={editValue}
		// 										onChange={(e) => setEditValue(e.target.value)}
		// 										onBlur={handleSave}
		// 										/>
		// 									) : (
		// 										book.price
		// 									)}
		// 								</td>
		// 								<td>
		// 									<button onClick={ () => Save(book.book_id, book.name, book.price) }>Save</button>
		// 									<button onClick={ () => Edit(book.book_id, book.name, book.price) }>Edit</button>
		// 									<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
		// 										<div>{ popupContent }</div>
		// 									</Popup>
		// 								</td>
		// 							</tr>
		// 						})
		// 					) : (
		// 						<p>Loading...</p>
		// 					)}
		// 				</tbody>
		// 			</Table>
		// 		</Container>
		// 	</div>
		// </div>
		<Stack spacing={3} style={{ paddingTop: '64px', paddingLeft: '24px', paddingRight: '24px' }}>
			<Stack direction="row" spacing={3}>
        		<Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          			<Typography variant="h4">Books</Typography>
				</Stack>
				<div>
					<Button startIcon={<PlusIcon fontSize='20px' color='white' />} variant="contained"  style={{textTransform: 'none'}} onClick={ Add }>
						Add
					</Button>
				</div>
			</Stack>
			<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
				<div>{ popupContent }</div>
			</Popup>
			<BooksTable books={books} />
		</Stack>
	)
}

export default Home;