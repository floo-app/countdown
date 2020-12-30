import axios from 'axios';
import * as cheerio from 'cheerio'

export default async function handler(req, res) {

    if (!req.query.name) {
        res.json({message: 'nope'});
        return;
    }

    const {data} = await axios.get('https://t.me/' + req.query.name, { 
        responseType: 'text',
    });

    const $ = cheerio.load(data);
    const bio = $('.tgme_page_description').text();
    
    res.json({ bio });
}

