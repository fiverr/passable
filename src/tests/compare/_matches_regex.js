const matchesRegex = (value, regex) => typeof value === "string" && !!value.match(regex);

export default matchesRegex;