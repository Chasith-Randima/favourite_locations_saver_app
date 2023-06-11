const Mapbox_Api_Token =
  "pk.eyJ1IjoicmFuZGltYSIsImEiOiJjbGlwZXUxZXgwN3ZmM2ZvNW0yYm5pejl6In0.PLWxO3XKcXPepVifIDam4A";

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-l+000(${lng})/${lat},14/400x200?access_token=${Mapbox_Api_Token}`;

  return imagePreviewUrl;
};

export const getAddress = async (lat, lng) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${Mapbox_Api_Token}`;
  //   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoicmFuZGltYSIsImEiOiJja2JobDEzM2owNGJxMnN0ZGZwazkwYzVrIn0.odQRCv821tcj9XI_yO6BKQ`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed fetch address!");
  }

  const data = await response.json();

  return data.features[0].place_name;

//   console.log(data.features[0].place_name);
};

// #FF0000
