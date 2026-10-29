import { useEffect, useState } from "react";
import storeImage from "../../assets/storeImage.svg";
import { storeData } from "../data/StoreData.js";

const LOCATION_KEY = "starbucks.selectedLocation";
const SEARCH_RADIUS_KM = 10;

const getDistance = (lat1, lon1, lat2, lon2) => {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDifference = radians(lat2 - lat1);
  const longitudeDifference = radians(lon2 - lon1);
  const value =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(radians(lat1)) *
      Math.cos(radians(lat2)) *
      Math.sin(longitudeDifference / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
};

const findNearbyStores = (latitude, longitude) =>
  storeData
    .map((store) => ({
      ...store,
      calculatedDistance: getDistance(latitude, longitude, store.lat, store.lng),
    }))
    .filter((store) => store.calculatedDistance <= SEARCH_RADIUS_KM)
    .sort((first, second) => first.calculatedDistance - second.calculatedDistance);

function Store() {
  const [location, setLocation] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedLocation = localStorage.getItem(LOCATION_KEY);
      if (!savedLocation) {
        return;
      }

      const parsedLocation = JSON.parse(savedLocation);
      if (
        typeof parsedLocation.label !== "string" ||
        !Number.isFinite(parsedLocation.latitude) ||
        !Number.isFinite(parsedLocation.longitude)
      ) {
        throw new Error("Saved location data is invalid.");
      }

      setLocation(parsedLocation);
      setNearbyStores(findNearbyStores(parsedLocation.latitude, parsedLocation.longitude));
    } catch {
      setErrorMessage("Your saved location couldn't be loaded. Please select or detect your location again.");
    }
  }, []);

  const saveLocation = (newLocation) => {
    setLocation(newLocation);
    setNearbyStores(findNearbyStores(newLocation.latitude, newLocation.longitude));
    setSearchResults([]);
    setErrorMessage("");

    try {
      localStorage.setItem(LOCATION_KEY, JSON.stringify(newLocation));
    } catch {
      setErrorMessage("Location selected, but it couldn't be saved in this browser.");
    }
  };

  const enableLocation = () => {
    setErrorMessage("");
    if (!navigator.geolocation) {
      setErrorMessage("This browser doesn't support location detection. Search for a city or neighborhood to choose a store manually.");
      return;
    }

    setIsLoading(true);
    try {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          saveLocation({
            label: `Detected location (${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)})`,
            latitude: coords.latitude,
            longitude: coords.longitude,
            source: "detected",
          });
          setIsLoading(false);
        },
        (error) => {
          if (error.code === 1) {
            setErrorMessage("Location permission was denied. Allow location access in your browser settings, or search and select a store manually.");
          } else if (error.code === 2) {
            setErrorMessage("Your location is currently unavailable. Try again or select a store manually.");
          } else if (error.code === 3) {
            setErrorMessage("Location detection took too long. Try again or select a store manually.");
          } else {
            setErrorMessage("We couldn't detect your location. Try again or select a store manually.");
          }
          setIsLoading(false);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
      );
    } catch {
      setErrorMessage("Your browser couldn't start location detection. Check your connection settings or select a store manually.");
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) {
      setErrorMessage("Enter a city, neighborhood, or store name to search.");
      setSearchResults([]);
      return;
    }

    const matchingStores = storeData.filter((store) =>
      store.name.toLowerCase().includes(query)
    );
    setSearchResults(matchingStores);
    setErrorMessage(
      matchingStores.length
        ? ""
        : "No listed Starbucks locations match that search. Try another city, neighborhood, or store name."
    );
  };

  const selectStore = (store) => {
    saveLocation({
      label: store.name,
      latitude: store.lat,
      longitude: store.lng,
      source: "manual",
    });
    setSearchInput(store.name);
  };

  const displayedStores = searchResults.length ? searchResults : nearbyStores;

  return (
    <section className="min-h-[65vh] bg-gray-50 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto grid min-w-0 max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <section className="w-full min-w-0 rounded-xl bg-white p-5 shadow-sm sm:p-8" aria-labelledby="store-finder-title">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-800">Find your Starbucks</p>
          <h1 id="store-finder-title" className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">Find a store near you</h1>
          <p className="mt-2 text-gray-600">Use your current location or search for a city, neighborhood, or store.</p>

          <form onSubmit={handleSearch} className="mt-6 flex w-full min-w-0 gap-2">
            <label htmlFor="store-search" className="sr-only">Search by city, neighborhood, or store</label>
            <input
              id="store-search"
              type="search"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
                setSearchResults([]);
                setErrorMessage("");
              }}
              placeholder="Try Delhi, Bandra, or Connaught Place"
              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <button type="submit" className="shrink-0 rounded-lg bg-green-800 px-5 py-3 font-medium text-white hover:bg-green-900">
              Search
            </button>
          </form>

          <button
            type="button"
            onClick={enableLocation}
            disabled={isLoading}
            className="mt-3 w-full rounded-lg border border-green-800 px-4 py-3 font-medium text-green-900 hover:bg-green-50 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? "Detecting your location..." : "Use my current location"}
          </button>

          {isLoading && (
            <p role="status" className="mt-3 text-sm text-gray-600">Waiting for your browser’s location permission...</p>
          )}
          {errorMessage && (
            <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{errorMessage}</p>
          )}

          {location && (
            <div className="mt-6 rounded-lg bg-green-50 p-4" aria-live="polite">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-800">Selected location</p>
              <p className="mt-1 font-medium text-gray-900">{location.label}</p>
              <p className="mt-1 text-sm text-gray-600">
                {location.source === "detected" ? "Detected with browser location" : "Selected manually"}
              </p>
            </div>
          )}

          <div className="mt-7">
            <h2 className="text-lg font-semibold text-gray-900">
              {searchResults.length ? "Choose a matching location" : "Nearby stores"}
            </h2>
            {displayedStores.length > 0 ? (
              <ul className="mt-3 space-y-3">
                {displayedStores.map((store) => (
                  <li key={store.id} className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4">
                    <div>
                      <p className="font-medium text-gray-900">{store.name}</p>
                      {!searchResults.length && location && (
                        <p className="mt-1 text-sm text-gray-600">{store.calculatedDistance.toFixed(1)} km away</p>
                      )}
                    </div>
                    {searchResults.length > 0 && (
                      <button type="button" onClick={() => selectStore(store)} className="shrink-0 rounded-full bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900">
                        Select
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-gray-600">
                {location ? "No listed stores are within 10 km of this location." : "Detect your location or search to get started."}
              </p>
            )}
          </div>
        </section>

        <aside className="flex min-w-0 flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
          <img src={storeImage} alt="" className="h-40 w-40 object-contain sm:h-48 sm:w-48" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Your next coffee is closer</h2>
          <p className="mt-2 max-w-sm text-gray-600">
            Choose a location to see nearby stores. Your selection is saved in this browser for your next visit.
          </p>
          {location && (
            <p className="mt-5 break-words rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700">
              Current selection: <span className="font-medium">{location.label}</span>
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

export default Store;
