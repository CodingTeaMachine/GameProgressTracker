
const developersFromFile = await fetch("./developers.json");

export const developers = developersFromFile.json();

export default developers;
