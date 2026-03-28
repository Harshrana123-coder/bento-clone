import React, { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import MapLogo from '@/assets/map.png';
import { supabase } from '@/lib/supabase';

const MapboxMap = ({ userId, locationData }) => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const [location, setLocation] = useState(locationData);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  // 🔍 Search places
  useEffect(() => {
    if (!search) return;

    const fetchPlaces = async () => {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${token}`
      );
      const data = await res.json();
      setResults(data.features || []);
    };

    fetchPlaces();
  }, [search]);

  // 📍 Save location
  const saveLocation = async (loc) => {
    setLocation(loc);

    await supabase.from('links').insert([
      {
        user_id: userId,
        title: 'map',
        url: JSON.stringify(loc),
      },
    ]);
  };

  return (
    <>
      {location ? (
        <div className="w-[300px] h-[200px] rounded-[1.5rem] overflow-hidden relative">

          <Map
            mapboxAccessToken={token}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            longitude={location.longitude}
            latitude={location.latitude}
            zoom={location.zoom || 4}
            style={{ width: '100%', height: '100%' }}
          >
            <NavigationControl />

            <Marker longitude={location.longitude} latitude={location.latitude}>
              <FaMapMarkerAlt size={24} className="text-red-500" />
            </Marker>
          </Map>

          {/* Search */}
          <div className="absolute bottom-2 left-2 bg-black p-2 rounded-lg">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="text-white bg-transparent outline-none"
            />

            {results.length > 0 && (
              <div className="bg-black mt-2 max-h-32 overflow-y-auto">
                {results.map((r) => (
                  <div
                    key={r.id}
                    onClick={() =>
                      saveLocation({
                        longitude: r.center[0],
                        latitude: r.center[1],
                        zoom: 4,
                      })
                    }
                    className="p-2 text-white cursor-pointer hover:bg-gray-700"
                  >
                    {r.place_name}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      ) : (
        <div
          onClick={() =>
            saveLocation({
              latitude: 20.5937,
              longitude: 78.9629,
              zoom: 4,
            })
          }
          className="h-[175px] w-[175px] bg-[#f7f7f7] border-2 border-dashed rounded-[1.5rem] flex items-center justify-center cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <Image src={MapLogo} alt="map" width={32} height={32} />
            <p className="mt-2 font-bold text-sm">Add Map</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MapboxMap;