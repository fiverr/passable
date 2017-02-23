const isLongerThan = (value, { testAgainst }) => value.hasOwnProperty('length') && value.length > testAgainst;

export default isLongerThan;