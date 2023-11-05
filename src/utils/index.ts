export const meanOfAnArray = (array: []) => {
	if (!array) return 0;
  const sum = array.reduce((a, b) => a + b, 0);
  const avg = sum / array.length || 0;

  return avg;
};

export const randomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
