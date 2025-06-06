import app from './app.js'
import { config } from 'dotenv';
config();

app.listen(3000)
console.log('Server on port', `http://localhost:${3000}`)