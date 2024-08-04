import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';

function BooksTable() {
	const [books, setBooks] = useState([]);

	const { authState, setAuthState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/books`;

	const navigate = useNavigate();

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
							<TableCell>Name</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Created</TableCell>
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
									<TableCell>{book.name}</TableCell>
									<TableCell>{book.price}</TableCell>
									<TableCell>{dayjs(book.created).format('MMM D, YYYY')}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Box>
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