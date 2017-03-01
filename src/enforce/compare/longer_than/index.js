const longerThan = (value, { testAgainst }) => value.hasOwnProperty('length') && value.length > testAgainst;

export default longerThan;