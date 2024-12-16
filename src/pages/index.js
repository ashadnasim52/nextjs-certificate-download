'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Certificate from '@/components/Certificate';

export default function Home() {
	const [name, setName] = useState('');
	const [course, setCourse] = useState('');
	const [format, setFormat] = useState('pdf');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`/api/generate-certificate?format=${format}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, course }),
		});

		if (response.ok) {
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			a.download = `certificate.${format}`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		} else {
			alert('Error generating certificate');
		}
	};

	return (
		<div className='container mx-auto p-4 '>
			<Certificate name={name} course={course} />
			<h1 className='text-2xl font-bold mb-4'>Generate Certificate</h1>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<Label htmlFor='name'>Name</Label>
					<Input
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div>
					<Label htmlFor='course'>Course</Label>
					<Input
						id='course'
						value={course}
						onChange={(e) => setCourse(e.target.value)}
						required
					/>
				</div>
				<RadioGroup value={format} onValueChange={setFormat}>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='pdf' id='pdf' />
						<Label htmlFor='pdf'>PDF</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='png' id='png' />
						<Label htmlFor='png'>PNG</Label>
					</div>
				</RadioGroup>
				<Button type='submit'>Generate Certificate</Button>
			</form>
		</div>
	);
}
