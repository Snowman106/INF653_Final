const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data }
}

const contigState = (req, res, next) => {
    const contig = req.query.contig;
    if(contig === 'true') {
        const states = data.states.filter(state => state.code !== 'AK' && state.code !== 'HI');
        res.states = states;
    } else if(contig === 'false') {
        const states = data.states.filter(state => state.code === 'AK' || state.code === 'HI');
        res.states = states;
    } else {
        res.states = data.states;
    }
    next();
}

module.exports = contigState
