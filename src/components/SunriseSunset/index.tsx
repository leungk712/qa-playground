import { useState } from 'react';

// ===== Material UI ===== //
import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';

// ===== Components ===== //

// ===== Constants ===== //
import { sunriseSunset } from './sunrise-sunset';
import { cities } from './cities';

// ===== Helpers ===== //

// ===== Interfaces ===== //
interface City {
  latitude: number;
  longitude: number;
  name: string;
}

// ===== Redux ===== //

// ===== Styles ===== //

const compare = (a: City, b: City) => {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const sortedCities: City[] = cities.sort(compare);

export default function SunriseSunset() {
  const [selectedCity, setSelectedCity] = useState<City>({} as City);
  const [sunriseSunsetInfo, setSunriseSunsetInfo] = useState<any>({});

  console.log(sunriseSunsetInfo);

  const fetchSunriseSunset = async (city: City) => {
    const { latitude, longitude, name } = city;

    console.log('latitude', latitude);
    console.log('longitude', longitude);

    setSunriseSunsetInfo(sunriseSunset[`${name}`]);
  };

  const handleSelectedCity = (city: City | null) => {
    if (!city) {
      return;
    }

    setSunriseSunsetInfo({});

    setSelectedCity(city);

    fetchSunriseSunset(city);
  };

  return (
    <Box sx={{ mt: 8, pb: 5, height: '100%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Sunrise/Sunset
      </Typography>

      <Autocomplete
        options={sortedCities}
        getOptionLabel={(option: City) => `${option?.name}`}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        sx={{ width: 300 }}
        onChange={(_event, value: City | null) => handleSelectedCity(value)}
        renderInput={(params) => (
          <TextField
            data-cy="city-textfield"
            {...params}
            label="Select City"
            value={selectedCity}
          />
        )}
      />

      {Object.values(sunriseSunsetInfo)?.length > 0 ? (
        <Details result={sunriseSunsetInfo} />
      ) : null}
    </Box>
  );
}

function Details({ result }: { result: any }) {
  return (
    <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
      <Typography variant="body1">
        <b>Date:</b> {result.date}
      </Typography>

      <Typography variant="body1">
        <b>Sunrise:</b> {result.sunrise}
      </Typography>

      <Typography variant="body1">
        <b>Sunset:</b> {result.sunset}
      </Typography>

      <Typography variant="body1">
        <b>First Light:</b> {result.first_light}
      </Typography>

      <Typography variant="body1">
        <b>Last Light:</b> {result.last_light}
      </Typography>

      <Typography variant="body1">
        <b>Dawn:</b> {result.dawn}
      </Typography>

      <Typography variant="body1">
        <b>Dusk:</b> {result.dusk}
      </Typography>

      <Typography variant="body1">
        <b>Solar Noon:</b> {result.solar_noon}
      </Typography>

      <Typography variant="body1">
        <b>Golden Hour:</b> {result.golden_hour}
      </Typography>

      <Typography variant="body1">
        <b>Day Length:</b> {result.day_length}
      </Typography>
    </Stack>
  );
}
