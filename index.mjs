import express from 'express';
import mongoDB from "./config/mongoDB.mjs";
import ShortnerModel from './schemas/ShortnerModel.mjs';
import ShortnerTrackerModel from './schemas/ShortnerTrackerModel.mjs';

const app = express();

app.get("/", (req, res) => {
    res.redirect(301, process.env.BASE_URL);
});

app.get('/:shortUrl', async (req, res) => {
    let {shortUrl} = req.params;
    let data = await ShortnerModel.findOne({shortUrl});
    if(data){
        await ShortnerTrackerModel.create({url_id: data._id});
        res.redirect(301, data.url);
    }else{
        res.redirect(301, `${process.env.BASE_URL}${shortUrl}`);
    }
});

app.listen(process.env.PORT, () => {
  mongoDB.connect();
});