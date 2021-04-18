const getGeolocation = () => {
  return new Promise((resolve) => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      resolve(pos);
    });
  });
};
