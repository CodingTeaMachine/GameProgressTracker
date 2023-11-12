const publishersFromFile = await fetch("./publishers.json");
export const publishers = publishersFromFile.json();

export default publishers;
