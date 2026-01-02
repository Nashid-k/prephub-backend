
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function checkDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        
        const pathMapsCount = await mongoose.connection.db.collection('pathmaps').countDocuments();
        console.log('PathMaps Count:', pathMapsCount);
        
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
checkDB();
