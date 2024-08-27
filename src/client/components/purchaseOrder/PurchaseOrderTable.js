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
import TablePagination from '@mui/material/TablePagination';

import dayjs from 'dayjs';

function PurchaseOrderTable({pos = [], pages = 0, rowsPerPages = 0, editData, deleteData}) {
	const [page, setPage] = useState(pages);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPages);
	const [paginatedBook, setPaginatedBook] = useState([]);

	const { authState, setAuthState } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {

	}, []);

	useEffect(() => {
		setPaginatedBook(pos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
	}, [pos]);

	const onPageChange = (event, newPage) => {
		setPage(newPage);
		setPaginatedBook(pos.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
	}

	const onRowsPerPageChange = (event) => {
		setRowsPerPage(event.target.value);
		setPaginatedBook(pos.slice(page * event.target.value, page * event.target.value + event.target.value));
	}

	return (
		<Card>
			<Box sx={{ overflowX: 'auto' }}>
				<Table sx={{ minWidth: '800px' }}>
					<TableHead style={{backgroundColor: '#f9fafb', color: '#667085',lineHeight: 1}}>
						<TableRow key={'column'}>
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
							<TableCell>Date</TableCell>
							<TableCell>Total Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedBook.map((po) => {
							// const isSelected = selected?.has(row.id);

							return (
								<TableRow hover key={po.id} onClick={() => navigate('/purchase_order_details', {state: { po_id: po.id }})}>
									<TableCell>{ po.id }</TableCell>
									<TableCell>{ dayjs(po.date).format('MMM D, YYYY') }</TableCell>
									<TableCell>{ po.total_amount }</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Box>
			<Divider />
			<TablePagination className="tablePagination-div"
				style={{position: 'relative'}}
				component="div"
				count={pos.length}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	)
}

export default PurchaseOrderTable;