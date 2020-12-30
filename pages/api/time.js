import os from 'os'
import axios from 'axios';

export default async function handler(req, res) {

    const response = await axios.get('https://t.me/cellcard', { 
        responseType: 'text',
    });

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    
    res.end(response.data);   
}