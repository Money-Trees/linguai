export const shuffleArray = (tokens: unknown[]): void => {
  for (let i = tokens.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = tokens[i];
    tokens[i] = tokens[j];
    tokens[j] = temp;
  }
};
