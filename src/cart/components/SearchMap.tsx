import { useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { SearchIcon, X } from 'lucide-react';
import mapboxgl, { Popup } from 'mapbox-gl';
import { twMerge } from 'tailwind-merge';
import { useDebouncedCallback } from 'use-debounce';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluZmxvcmVzMjgiLCJhIjoiY2xuNm1qNDE5MDRzMjJqcHdtcnh5azEybyJ9.zpPc85TthA2FvNJhHBREBQ';

interface SearchMapProps {
  DEFAULT_CENTER_MAP: [number, number];
  address: string;
  setAddress: (address: string) => void;
  search: string;
  setSearch: (search: string) => void;
  lngLatRef: React.MutableRefObject<[number, number]>;
  mapRef: React.MutableRefObject<HTMLDivElement | null>;
  mapBoxRef: React.MutableRefObject<mapboxgl.Map | null>;
  marketRef: React.MutableRefObject<mapboxgl.Marker | null>;
  onNext: () => void;
}

function SearchMap({ onNext, address, DEFAULT_CENTER_MAP, setAddress, search, setSearch, lngLatRef, mapBoxRef, mapRef, marketRef }: SearchMapProps) {
  const getUserLocation = (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const lngLat: [number, number] = [coords.longitude, coords.latitude];
          lngLatRef.current = lngLat;
          resolve(lngLat);
        },
        (err) => {
          toast.error('Permiso denegado');
          reject(err);
        },
      );
    });
  };

  const getAddresFromLngLat = async (lngLat: [number, number]): Promise<string> => {
    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat[0]},${lngLat[1]}.json?access_token=${mapboxgl.accessToken}`);

    const address = data.features[0].place_name;
    setAddress(address);
    return address;
  };

  const addMarker = async (lngLat: [number, number]) => {
    if (!mapBoxRef.current) return;

    if (marketRef.current) return toast.error('Ya has seleccionado una dirección');

    // Get address
    const address = await getAddresFromLngLat(lngLat);

    const popup = new Popup().setHTML(
      `<div class="flex flex-col gap-2">
        <p class="text-base font-semibold text-zinc-800">${address}</p>
        <button type="button" class="bg-pink-800 text-zinc-200 rounded-full text-base font-semibold transition-colors duration-300 py-2 px-4">Confirmar dirección</button>
       </div>
      `,
    );

    console.log({ lngLat });

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: '#F472B6',
    })
      .setLngLat(lngLat)
      .setPopup(popup)
      .addTo(mapBoxRef.current);

    newMarker.on('dragend', async (e) => {
      if (!mapBoxRef.current) return;

      const event = e as mapboxgl.MapMouseEvent;
      const target = event.target as unknown as mapboxgl.Marker;
      const lngLat = target.getLngLat();

      // Get address
      const address = await getAddresFromLngLat([lngLat.lng, lngLat.lat]);

      // Actualizar popup
      const popup = new Popup().setHTML(
        `<div class="flex flex-col gap-2">
          <p class="text-base font-semibold text-zinc-800">${address}</p>
          <button type="button" class="bg-pink-800 text-zinc-200 rounded-full text-base font-semibold transition-colors duration-300 py-2 px-4">Confirmar dirección</button>
         </div>
        `,
      );

      target.setPopup(popup);

      // Actualizar la hubicación del marker
      target.setLngLat(lngLat);

      // Actualizar centro del mapa
      mapBoxRef.current.flyTo({ center: lngLat });

      // Actualizar referencia
      lngLatRef.current = [lngLat.lng, lngLat.lat];
    });

    marketRef.current = newMarker;

    // Actualizar centro del mapa
    mapBoxRef.current.flyTo({ center: lngLat, zoom: 12 });

    // Actualizar referencia
    lngLatRef.current = lngLat;
  };

  useEffect(() => {
    if (mapRef.current) {
      // Mapbox
      const mapBox = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: lngLatRef.current || DEFAULT_CENTER_MAP,
        zoom: 9,
      });

      // Add controls
      mapBox.addControl(new mapboxgl.NavigationControl());

      // Add marker on click
      mapBox.on('click', (e) => {
        // Si ya hay un marker
        if (marketRef.current) {
          marketRef.current.remove();
          marketRef.current = null;
        }
        addMarker([e.lngLat.lng, e.lngLat.lat]);
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

  const debouncedSearch = useDebouncedCallback(async (search) => {
    if (search) {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${mapboxgl.accessToken}`);
      const data = await res.json();
      const [lng, lat] = data.features[0].center;
      if (!mapBoxRef.current) return;
      mapBoxRef.current.setCenter([lng, lat]);
      console.log({ lng, lat });

      mapBoxRef.current.setZoom(12);
    }
  }, 1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch('');
    lngLatRef.current = DEFAULT_CENTER_MAP;
    // Centrar mapa
    if (!mapBoxRef.current) return;
    mapBoxRef.current.setCenter(DEFAULT_CENTER_MAP);
  };

  const removeMarker = () => {
    if (marketRef.current) {
      marketRef.current.remove();
      marketRef.current = null;
      setAddress('');
      // Centrar mapa
      if (!mapBoxRef.current) return;
      mapBoxRef.current.setCenter(DEFAULT_CENTER_MAP);
    }
  };

  return (
    <div className="px-4 py-3 animate-fade-in w-full">
      <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">Hubicate en el mapa</h2>

      <div className="mb-4 relative w-full">
        <SearchIcon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-200 z-10" />
        <input type="text" className={twMerge('w-full border pl-11 border-zinc-700 backdrop-blur-lg border-opacity-50 rounded-full py-4 text-base text-zinc-200 bg-zinc-800 hover:bg-opacity-60 bg-opacity-50 outline-none focus:border-opacity-90 transition-colors duration-300 placeholder:text-zinc-400', search.length <= 0 ? 'pr-4' : 'pr-11')} autoFocus value={search} onChange={handleSearch} placeholder="Ingresa la dirección de entrega" />
        {search && (
          <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-200 hover:text-white transition-all duration-300" onClick={clearSearch}>
            <X size={20} />
          </button>
        )}
      </div>

      {address && (
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">Dirección de entrega</p>
            <p className="text-base text-zinc-200">{address}</p>
          </div>
          <button type="button" className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold" onClick={removeMarker}>
            Remover
          </button>
        </div>
      )}

      <div ref={mapRef} className="w-full h-[400px]"></div>

      <div className="flex gap-4 items-center mt-4">
        <button
          type="button"
          className="w-full py-4 bg-zinc-700 hover:bg-opacity-60 bg-opacity-50 text-zinc-200 rounded-full text-base font-semibold transition-colors duration-300"
          onClick={() => {
            getUserLocation().then((lngLat) => {
              if (!mapBoxRef.current) return;
              mapBoxRef.current.setCenter(lngLat);
              mapBoxRef.current.setZoom(12);
            });
          }}
        >
          Usar mi ubicación
        </button>

        <button
          type="button"
          className="w-full py-4 disabled:cursor-not-allowed disabled:bg-pink-700 disabled:bg-opacity-50 bg-pink-600 hover:bg-pink-700  text-zinc-200 rounded-full text-base font-semibold transition-colors duration-300"
          disabled={!address || !lngLatRef.current}
          onClick={() => {
            if (!lngLatRef.current) return;
            onNext();
          }}
        >
          Confirmar dirección
        </button>
      </div>
    </div>
  );
}

export default SearchMap;
