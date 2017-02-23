const matchesRegex = (value, { testAgainst }) => typeof value === "string" && !!value.match(testAgainst);

export default matchesRegex;