import React from 'react';
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

function Registration() {
	const URL = `${process.env.REACT_APP_API_URL}/users`;
	const initialValue = {
		username: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string().min(3).max(15).required("You must insert username"),
		password: Yup.string().min(4).max(20).required(),
	});

	let navigate = useNavigate();

	const onSubmit = async(data) => {
		const utcDateTime = new Date().toISOString();
		const utcDateConvertToLocal = new Date(utcDateTime);
		const user = { username: data.username, password: data.password, created_modified: utcDateConvertToLocal }
		// toast.success('Success', {
		// 	description: 'User Register Success',
		// })
		try {
			const postData = async() => {
				const result = await fetch(URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(user)
				});

				if (!result.ok) {
					throw new Error(`HTTP error! status: ${result.status}`);
				} else {
					// toast.success('Success', {
					// 	description: 'User Register Success',
					// })
					navigate('/');
				}
			}

			// postData();
			toast.promise(postData, {
				loading: 'Loading...',
				success: () => {
				  return `User has been registered`;
				},
				error: 'Error',
			});
		} catch (error) {
            console.error('Error posting data:', error);
        }
		// axios.post("http://localhost:3001/auth", data).then((response) => {
		// 	console.log(response.data);
		// 	console.log("Done!");
		// 	navigate('/');
		// });
	};

	return (
		<div className='registerContainer'>
			<Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
				<Form className='formContainer'>
					<ErrorMessage name='username' component='span'></ErrorMessage>
					<Field id='inputRegister' name='username' placeholder='Username' autoComplete='off'></Field>

					<ErrorMessage name='password' component='span'></ErrorMessage>
					<Field type='password' id='inputRegister' name='password' placeholder='Password'></Field>

					<button className='RegisterBtn' type='submit'>Register</button>

					<div className="links">
						<Link to='/login'>Login</Link>
					</div>
				</Form>
			</Formik>
		</div>
	)
}

export default Registration