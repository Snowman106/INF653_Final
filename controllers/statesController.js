const States = require('../model/States');

const getAllStates = async (req, res) => {
    const states = await res.states;
    const mongoStates = await States.find({}).exec();
    let merged = [];
    states.forEach(state => {
        stateExists = mongoStates.find(st => st.stateCode === state.code);
        if(stateExists) {
            const funfacts = stateExists.funfacts;
            merged.push({...state, funfacts});
        } else {
            merged.push(state);
        }
    });
    res.json(merged);
}

const getOneState = async (req, res) => {
    const state = await res.state;
    const mongoState = await States.findOne({'stateCode' : state.code}).exec();
    if(mongoState) {
        const funfacts = mongoState.funfacts;
        res.json({...state, funfacts });
    }else {
        res.json(state);
    }
};

const getCapital = async (req, res) => {
    const state = await res.state.state;
    const capital = await res.state.capital_city;
    res.json({ state, capital });
};

const getNickname = async (req, res) => {
    const state = await res.state.state;
    const nickname = await res.state.nickname;
    res.json({ state, nickname });
};

const getPopulation = async (req, res) => {
    const state = await res.state.state;
    let population = await res.state.population;
    population = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    res.json({ state, population});
};

const getAdmission = async (req, res) => {
    const state = await res.state.state;
    const admitted = await res.state.admission_date;
    res.json({ state, admitted });
};




module.exports = {
    getAllStates,
    getOneState,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission
}