import React from 'react';

export default function Certificate({ name, course }) {
	const date = new Date().toLocaleDateString();

	return (
		<div
			style={{
				fontFamily: 'Arial, sans-serif',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '50vh',
				margin: 0,
				backgroundColor: '#f0f0f0',
			}}
		>
			<div
				style={{
					backgroundColor: 'white',
					border: '2px solid gold',
					padding: '40px',
					textAlign: 'center',
				}}
			>
				<h1 style={{ color: '#333' }}>Certificate of Completion</h1>
				<p style={{ color: '#666', margin: '10px 0' }}>
					This is to certify that
				</p>
				<h2>{name}</h2>
				<p style={{ color: '#666', margin: '10px 0' }}>
					has successfully completed the course
				</p>
				<h3>{course}</h3>
				<p style={{ color: '#666', margin: '10px 0' }}>Date: {date}</p>
			</div>
		</div>
	);
}
