import { YMaps, Map, Placemark } from "react-yandex-maps";
import React, { useEffect, useState } from "react";
import styles from "./Heatmap.module.scss";
import { OrderType } from "@src/redux/api/userOrders.api";

export type HeatmapProps = {};

const api = "9e3e1c2e-31ad-4b90-acac-d4717c6626dc";

const testOrders: OrderType[] = [
  {
    id: 1,
    userId: 1,
    statusId: 1,
    status: {
      id: 1,
      title: "Open",
    },
    description: "Accident at street X",
    numberCar: "XYZ123",
    address: "Москва, Красная площадь, 1",
    files: [],
  },
  {
    id: 2,
    userId: 2,
    statusId: 1,
    status: {
      id: 1,
      title: "Open",
    },
    description: "Accident at street Y",
    numberCar: "ABC456",
    address: "Москва, ул. Арбат, 10",
    files: [],
  },
];

const testCoordinates: [number, number][] = [
  [55.753215, 37.622504], // Координаты для Красной площади, Москва
  [55.752023, 37.617499], // Координаты для улицы Арбат, Москва
];

const geocodeAddress = async (address: string): Promise<[number, number]> => {
  const { data } = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${api}&format=json&geocode=${encodeURIComponent(
      address
    )}`
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
  const pos =
    data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
      " "
    );
  return [parseFloat(pos[1]), parseFloat(pos[0])];
};

export const Heatmap = ({}: HeatmapProps) => {
  const [coordinates, setCoordinates] =
    useState<[number, number][]>(testCoordinates);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  // useEffect(() => {
  //   const fetchCoordinates = async () => {
  //     const coords = await Promise.all(
  //       testOrders.map((order) => geocodeAddress(order.address))
  //     );
  //     setCoordinates(coords);
  //   };
  //   fetchCoordinates();
  // }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  return (
    <YMaps>
      <Map
        defaultState={{ center: [55.751244, 37.618423], zoom: 10 }}
        width="100%"
        height="400px"
      >
        {coordinates.map((coord, index) => (
          <Placemark key={index} geometry={coord} />
        ))}
        {userLocation && (
          <Placemark
            geometry={userLocation}
            options={{ preset: "islands#blueDotIcon" }}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default Heatmap;
