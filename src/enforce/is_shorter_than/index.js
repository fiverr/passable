const isShorterThan = (value, {testAgainst}) => value.hasOwnProperty('length') && value.length < testAgainst;

export default isShorterThan;