export const videoList = (pageNo) => {
    return new Promise((resolve, reject) => {
      fetch('https://impactmindz.in/client/boub/back_end/api/product')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          reject(err);
        });
    });
  };
  