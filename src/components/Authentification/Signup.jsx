import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth, fs } from '../../config/Config'
import './Signup.css'

export const Signup = ({ showLoginForm, onClose }) => {
	const navigate = useNavigate()

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [errorMsg, setErrorMsg] = useState('')
	const [successMsg, setSuccessMsg] = useState('')

	const handleSignup = (e) => {
		e.preventDefault()
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((credentials) => {
				console.log(credentials)
				fs.collection('users')
					.doc(credentials.user.uid)
					.set({
						Name: fullName,
						Email: email,
						Password: password,
					})
					.then(() => {
						setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login')
						setFullName('')
						setEmail('')
						setPassword('')
						setErrorMsg('')
						setTimeout(() => {
							setSuccessMsg('')
							navigate('/login')
						}, 3000)
					})
					.catch((error) => setErrorMsg(error.message))
			})
			.catch((error) => {
				setErrorMsg(error.message)
			})
	}

	return (
		<div onClick={onClose} className='modalBackdrop'>
			<div className='signUpForm'>
				<div className='closeButtonContainer'>
					<button className='signUpFormButton' onClick={onClose}>
						close
					</button>
				</div>
				<h1>Sign Up</h1>
				<form className='form' onSubmit={handleSignup}>
					<label>Full Name</label>
					<input
						type='text'
						className='form-control'
						required
						value={fullName}
						onChange={(event) => setFullName(event.target.value)}
					/>
					<label>Email</label>
					<input
						type='email'
						className='form-control'
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<label>Password</label>
					<input
						type='password'
						className='form-control'
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<div className='btn-box'>
						<button className='signUpFormButton' type='submit'>
							SIGN UP
						</button>
					</div>
				</form>
				<p>
					Already have an account? <button onClick={showLoginForm}>Login</button>
				</p>
			</div>
		</div>
	)
}
