const States = require('../model/States');

const createFunFact = async (req, res) => {
    if (!req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'State fun facts value required'});
    } else if (!Array.isArray(req.body.funfacts)) {
        return res.status(400).json({ 'message': 'State fun facts value must be an array' });
    } else 
    try{
        
        const result = await States.findOneAndUpdate(
            {stateCode: res.state.code},
            {$push: { funfacts: req.body.funfacts }},
            {upsert: true, new: true }
        );
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const deleteFunFact = async (req, res) => {
    if(!req?.body?.index) {
        return res.status(400).json({ 'message': 'State fun fact index value required' });
    }

    try{
        const index = req.body.index - 1;
        const facts = await States.findOne({stateCode: res.state.code}, 'funfacts').exec();    

        if(facts === null) {
            return res.status(404).json({ 'message': `No Fun Facts found for ${res.state.state}` });
        }

        const setFact = await States.updateOne(
            {stateCode: res.state.code,
            [`funfacts.${index}`]: {$exists: true}},
            {$set: {[`funfacts.${index}`]: null}},
        );

        const result = await States.findOneAndUpdate(
            {stateCode: res.state.code,
            [`funfacts.${index}`]: {$exists: true}},
            {$pull: {'funfacts': null}},
            {new: true}
        ); 

        if(result === null) {
            return res.status(404).json({ 'message': `No Fun Fact found at that index for ${res.state.state}` })
        } else {
            res.status(201).json(result);
        }

    } catch (err) {
            console.error(err);
    }
}

const updateFunFact = async (req, res) => {
    if(!req?.body?.index) {
        return res.status(400).json({ 'message': 'State fun fact index value required' });
    }

    if(!req?.body?.funfact) {
        return res.status(400).json({ 'message': 'State fun fact value required' });
    }

    try {
        const index = req.body.index - 1;
        const facts = await States.findOne({stateCode: res.state.code}, 'funfacts').exec();
    
        if(facts === null) {
            return res.status(404).json({ 'message': `No Fun Facts found for ${res.state.state}` });
        }

        const result = await States.findOneAndUpdate(
            {stateCode: res.state.code,
            [`funfacts.${index}`]: {$exists: true}},
            {$set: {[`funfacts.${index}`]: req.body.funfact.toString()}},
            {new: true}  
        );

        if(result === null) {
            return res.status(404).json({ 'message': `No Fun Fact found at that index for ${res.state.state}` });
        } else {
            res.status(201).json(result);
        }
    } catch (err) {
        console.error(err);
    }
}

const getRandomFunFact = async (req, res) => {
    const result = await States.findOne({stateCode: res.state.code}, 'funfacts').exec();
    if(!result) {
        return res.status(404).json({ "message": `No Fun Facts found for ${res.state.state}` });
    }
    const funFactArray = result.funfacts;
    const funfact = funFactArray[Math.floor(Math.random()*funFactArray.length)]
    res.json({funfact});
}

module.exports = {
    createFunFact,
    deleteFunFact,
    updateFunFact,
    getRandomFunFact
} 