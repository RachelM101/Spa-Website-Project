import fs from 'fs';
import path from 'path';

export default async (req, res) => {
    const filePath = path.join(process.cwd(), 'API/Database/appointments.json');

    if (req.method === 'GET') {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            const appointments = JSON.parse(fileData);
            return res.status(200).json(appointments);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to fetch appointments.' });
        }
    }

    res.status(405).json({ error: 'Method not allowed.' });
};
