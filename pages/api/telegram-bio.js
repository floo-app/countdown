import axios from 'axios';
import * as cheerio from 'cheerio'

export default async function handler(req, res) {

    const {data} = await axios.get('https://t.me/cellcard', { 
        responseType: 'text',
    });

    const $ = cheerio.load(data);
    const bio = $('.tgme_page_description').text();

    

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        bio
    }));   
}