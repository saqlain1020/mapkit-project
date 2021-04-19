const shapeAnnotations = (mapAnnotations) => {
  let arr = [];
  mapAnnotations.forEach((item) => {
    let obj = {};
    obj.location = {
        latitude: item.coordinate.latitude,
        longitude: item.coordinate.longitude,
    }
    obj.title = item.title;
    obj.subtitle = item.subtitle;
    obj.glyphText = item.glyphText;
    obj.color = item.color;
    obj.draggable = false;
    obj.selected = false;
    obj.id = item.data.id;
    arr.push(obj);
  });
  return arr;
};

export default shapeAnnotations;
