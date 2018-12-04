const convertData = (data) => {
  const results = [];

  const totalPrice = data.reduce((acc, curr) => {
    return acc + Number(curr.price);
  }, 0);

  const average = (totalPrice / data.length).toFixed(2);
  // set initial values
  let high = Number(data[0].price);
  let low = Number(data[0].price);
  // declare objects to hold high and low prices
  let highObj = data[0];
  let lowObj = data[0];

  for (let i = 0; i < data.length; i += 1) {
    const currentPrice = Number(data[i].price);
    if (currentPrice >= high) {
      high = currentPrice.toFixed(2);
      highObj = data[i];
    } else if (currentPrice <= low) {
      low = currentPrice.toFixed(2);
      lowObj = data[i];
    }
  }

  results.push(average, highObj, lowObj);
  return results;
};

const helpers = {
  convertData,
};

export default helpers;
