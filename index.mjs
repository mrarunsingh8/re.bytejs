import express from 'express';
/* import ShortnerTrackerModel from './schemas/ShortnerTrackerModel.mjs'; */
import fetch from 'node-fetch';

const app = express();

app.get("/", (req, res) => {
    res.redirect(301, process.env.BASE_URL);
});

app.get('/:shortUrl', async (req, res) => {
    let {shortUrl} = req.params;
    try{
        let data = await fetch(`${process.env.API_URL}shortner/${shortUrl}`).then(res => res.json());
        if(data.url){
            res.redirect(301, data.url);
        }else{
            res.redirect(301, `${process.env.BASE_URL}${shortUrl}`);
        }
    }catch(e){
        res.redirect(301, `${process.env.BASE_URL}${shortUrl}`);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});