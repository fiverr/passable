const isShorterThan = (value, n) => value.hasOwnProperty('length') && value.length < n;

export default isShorterThan;