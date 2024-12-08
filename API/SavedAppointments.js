import fs from 'fs';
import path from 'path';

export default async (req, res) => {
    const filePath = path.join(process.cwd(), '/API/Database/appointments.json');

    if (req.method === 'POST') {
        const { name, treatment, date } = req.body;

        if (!name || !treatment || !date) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            const appointments = JSON.parse(fileData);

            const newAppointment = {
                id: Date.now(),
                name,
                treatment,
                date,
            };

            appointments.push(newAppointment);

            fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2), 'utf8');
            return res.status(200).json({ message: 'Appointment saved!', newAppointment });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to save appointment.' });
        }
    }

    res.status(405).json({ error: 'Method not allowed.' });
};
