import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Restaurant } from '../interfaces/order-payment';
import axios from 'axios';
interface TraceMapProps {
  lat: number;
  lng: number;
  deliveryAddress: string;
  restaurant: Restaurant;
}
mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluZmxvcmVzMjgiLCJhIjoiY2xuNm1qNDE5MDRzMjJqcHdtcnh5azEybyJ9.zpPc85TthA2FvNJhHBREBQ';

const TraceMap = ({ lat, lng, deliveryAddress, restaurant }: TraceMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapBoxRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Mapbox
      const mapBox = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 12,
      });

      // Add controls
      mapBox.addControl(new mapboxgl.NavigationControl());

      // Element
      const elementoStart = document.createElement('div');
      elementoStart.className = 'w-[30px] h-[30px] flex items-center justify-center rounded-full bg-green-500 text-white';
      elementoStart.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-truck" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
        </svg>
      `;

      const elementoEnd = document.createElement('div');
      elementoEnd.className = 'w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#db2777] text-white';
      elementoEnd.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
        </svg>
      `;

      // Add marker  Start
      new mapboxgl.Marker({
        element: elementoStart,
      })
        .setLngLat([restaurant.longitude, restaurant.latitude])
        .addTo(mapBox);

      // Add marker End
      new mapboxgl.Marker({
        element: elementoEnd,
      })
        .setLngLat([lng, lat])
        .addTo(mapBox);

      // Generar una linea entre los dos puntos

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${restaurant.longitude},${restaurant.latitude};${lng},${lat}?alternatives=false&geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`;

      const obtenerRuta = async () => {
        try {
          const { data } = await axios.get(url);
          const {
            routes: [route],
          } = data;

          const {
            geometry: { coordinates },
          } = route;

          mapBox.addSource('route', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates,
                  },
                },
              ],
            },
          });

          mapBox.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-cap': 'round',
              'line-join': 'round',
            },
            paint: {
              'line-color': '#df448a',
              'line-width': 3,
            },
          });
        } catch (error) {
          console.log(error);
        }
      };

      // Wait for the map style to finish loading
      mapBox.on('style.load', () => {
        obtenerRuta();
      });

      // Add Mapbox instance to ref
      mapBoxRef.current = mapBox;
    }

    return () => {
      if (!mapBoxRef.current) return;
      // Remove map on unmount
      mapBoxRef.current.remove();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-4 animate-fade-in w-full">
      <div className="mb-4 flex items-center justify-between gap-4 rounded-md bg-zinc-800 bg-opacity-80 border border-zinc-700 border-opacity-50 p-4">
        <div>
          <p className="text-sm text-zinc-400">Dirección de entrega</p>
          <p className="text-base text-zinc-200">{deliveryAddress}</p>
        </div>
      </div>

      <div ref={mapRef} className="w-full h-[400px]"></div>

      <div className="flex gap-4 items-center flex-wrap justify-end mt-4">
        <button
          type="button"
          className="py-3 px-8 bg-zinc-700 hover:bg-opacity-60 bg-opacity-50 text-zinc-200 rounded-full text-base font-semibold transition-colors duration-300"
          onClick={() => {
            mapBoxRef.current?.flyTo({ center: [restaurant.longitude, restaurant.latitude], zoom: 17 });
          }}
        >
          Ubicación del restaurante
        </button>

        <button
          type="button"
          className="py-3 px-8 bg-zinc-700 hover:bg-opacity-60 bg-opacity-50 text-zinc-200 rounded-full text-base font-semibold transition-colors duration-300"
          onClick={() => {
            mapBoxRef.current?.flyTo({ center: [lng, lat], zoom: 17 });
          }}
        >
          Ubicación de entrega
        </button>
      </div>
    </div>
  );
};

export default TraceMap;
