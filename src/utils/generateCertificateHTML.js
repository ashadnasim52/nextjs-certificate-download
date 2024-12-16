export function generateCertificateHTML(name, course) {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Certificate of Completion</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f0f0;
        }
        .certificate {
          background-color: white;
          border: 2px solid #gold;
          padding: 40px;
          text-align: center;
        }
        h1 {
          color: #333;
        }
        p {
          color: #666;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <h1>Certificate of Completion</h1>
        <p>This is to certify that</p>
        <h2>${name}</h2>
        <p>has successfully completed the course</p>
        <h3>${course}</h3>
        <p>Date: ${new Date().toLocaleDateString()}</p>
      </div>
    </body>
    </html>
  `;
}
