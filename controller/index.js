const UrlId = require('../model/index');
const shortid = require('shortid');

async function handleNewUrl (req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is requied'});
    const shortID = shortid.generate();

    await UrlId.create({
        shortid: shortID,
        redirectURL: body.url,
        numOfVisits: [],
        createdBy: req.user._id,
    });

    return res.render("home", {id: shortID})
}
 
async function handleUrl(req, res){

    const shortid = req.params.shortid;

    const result = await UrlId.findOneAndUpdate({
        shortid: shortid,
    }, {
        $push :{
            numOfVisits: {
                timestamp: Date.now()
            }
        }
    },
    { new: true }
);

    res.redirect(result.redirectURL);
}

async function handleAnalyticsUrl (req, res){
    const shortID = req.params.shortID;
    const result = await UrlId.findOneAndUpdate({ shortID });
    return res.json({ totalclicks: result.numOfVisits.length, analytics:  result.numOfVisits})
}


module.exports = {
    handleNewUrl,
    handleUrl,
    handleAnalyticsUrl,
  
}