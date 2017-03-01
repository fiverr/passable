const shorterThan = (value, {testAgainst}) => value.hasOwnProperty('length') && value.length < testAgainst;

export default shorterThan;