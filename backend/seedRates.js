import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Rate from './models/Rate.model.js';

dotenv.config();

const seedRates = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        // Clear existing rates if any (optional, but good for a fresh start here since the dropdown is empty anyway)
        await Rate.deleteMany({});

        const rates = [
            {
                name: 'Standard Rate',
                price_per_minute: 1,
                min_charge_minutes: 60,
                is_active: true
            },
            {
                name: 'Premium Rate',
                price_per_minute: 2,
                min_charge_minutes: 60,
                is_active: true
            },
            {
                name: 'VIP Rate',
                price_per_minute: 3,
                min_charge_minutes: 120,
                is_active: true
            }
        ];

        await Rate.insertMany(rates);
        console.log('Successfully inserted 3 rates');
        process.exit(0);
    } catch (err) {
        console.error('Failed to seed rates', err);
        process.exit(1);
    }
};

seedRates();
