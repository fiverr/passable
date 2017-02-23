const isOfExactLength = (value, { testAgainst }) => value.hasOwnProperty('length') && value.length === testAgainst;

export default isOfExactLength;