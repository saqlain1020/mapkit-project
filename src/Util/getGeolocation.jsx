import store from "./../Redux/store";

const onErr = (resolve) => {
  let allPins = store.getState().pins.allPins;
  if (allPins.length > 0) {
    resolve(allPins[0].location);
  } else {
    resolve({
      latitude: 37.3327,
      longitude: -122.0053,
    });
  }
};

const getGeolocation = () => {
  return new Promise((resolve) => {
    try {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(pos);
        },
        (err) => {
          onErr(resolve);
        }
      );
    } catch (error) {
      onErr(resolve);
    }
  });
};

export default getGeolocation;
