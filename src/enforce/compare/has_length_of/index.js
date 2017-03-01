const hasLengthOf = (value, { testAgainst }) => value.hasOwnProperty('length') && value.length === testAgainst;

export default hasLengthOf;