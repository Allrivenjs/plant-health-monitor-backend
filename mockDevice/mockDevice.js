const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const randomNumberArray = (size, max, min) => {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(randomNumber(max, min));
  }
  return array;
};

setInterval(async () => {
  const body = {
    temperatura: randomNumberArray(10, -10, 50),
    humedad: randomNumberArray(10, 0, 100),
    luz: randomNumberArray(10, 0, 100),
  };

  console.log('*** mocking a device call ***');
  try {
    const res = await fetch('http://localhost:4000/api/v1/device/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-mac': '123',
      },
      body: JSON.stringify(body),
    });

    const deviceData = await res.json();

    console.log('device res: ', deviceData);
  } catch (e) {
    console.log('error trying to fetch the api');
  }
}, 5000);
