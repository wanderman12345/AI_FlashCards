// pages/api/process-pdf.js
import pdf from 'pdf-parse';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;

    try {
      // Fetch the PDF from the URL
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();

      // Convert the PDF to text
      const data = await pdf(buffer);

      res.status(200).json({ text: data.text });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process the PDF' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
