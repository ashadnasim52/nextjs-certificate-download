import { generateCertificateHTML } from '@/utils/generateCertificateHTML';
import htmlPdf from 'html-pdf-node';
import path from 'path';
import { promises as fs } from 'fs';
const { pdfToPng } = require('pdf-to-png-converter');
const pdfPoppler = require('pdf-poppler');
async function convertPDFToPNG(pdfPath) {
	const outputPath = path.join(path.dirname(pdfPath), 'output_image.png');
	const options = {
		format: 'png',
		out_dir: path.dirname(pdfPath),
		out_prefix: 'output_image',
		page: 1,
	};

	await pdfPoppler.convert(pdfPath, options);
	return outputPath;
}
export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const { name, course } = req.body;

	if (!name || !course) {
		return res.status(400).json({ message: 'Name and course are required' });
	}

	try {
		// Generate HTML
		const html = generateCertificateHTML(name, course);
		console.log({ html });

		// Convert PDF to PNG

		// Determine which format to return based on the 'format' query parameter
		const format = req.query.format;
		const pdfBuffer = await htmlPdf.generatePdf(
			{ content: html },
			{ format: 'A4' }
		);
		if (format === 'png') {
			const tempDir = path.resolve('./temp');
			const tempPdfPath = path.join(tempDir, 'certificate.pdf');
			await fs.mkdir(tempDir, { recursive: true });
			await fs.writeFile(tempPdfPath, pdfBuffer);
			console.log({ tempPdfPath });

			const pngArray = await pdfToPng(tempPdfPath, {
				outputType: 'png',
				pages: [1],
				outputFolder: './temp',
			});
			console.log({ pngArray });

			const pngBuffer = await fs.readFile(pngArray[0].path);

			res.setHeader('Content-Type', 'image/png');
			res.setHeader(
				'Content-Disposition',
				'attachment; filename=certificate.png'
			);
			res.send(pngBuffer);
		} else {
			// Generate PDF

			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader(
				'Content-Disposition',
				'attachment; filename=certificate.pdf'
			);
			res.send(pdfBuffer);
		}
	} catch (error) {
		console.error('Error generating certificate:', error);
		res.status(500).json({ message: 'Error generating certificate' });
	}
}
