import { useEffect, useState } from 'react';

// ===== Material UI ===== //
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Stack,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ===== Components ===== //

// ===== Constants ===== //

// ===== Helpers ===== //

// ===== Interfaces ===== //
interface LaunchPad {
  id: string;
  images: {
    large: string[];
  };
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  timezone: string;
  launches: string[];
  status: string;
  details: string;
}

// ===== Redux ===== //

// ===== Styles ===== //

export default function Space() {
  const [rows, setRows] = useState<LaunchPad[]>([]);

  useEffect(() => {
    async function fetchLaunchPads() {
      try {
        const response = await fetch(
          `https://api.spacexdata.com/v4/launchpads`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        setRows(data);
      } catch (err) {
        console.log('err', err);
      }
    }

    fetchLaunchPads();
  }, []);

  return (
    <Box sx={{ mt: 8 }}>
      {rows && rows?.length ? (
        <>
          {rows?.map((row: LaunchPad) => (
            <Accordion key={row.id} sx={{ my: 1, bgcolor: '#B6C4A2' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${row.id}-content`}
                id={`${row.id}-accordion`}
              >
                <Typography variant="h6">
                  {row.full_name} ({row.name})
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Details launchPad={row} />
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      ) : null}
    </Box>
  );
}

function Details({ launchPad }: { launchPad: LaunchPad }) {
  return (
    <Box>
      <Stack>
        <Box
          component="img"
          src={launchPad.images.large[0]}
          sx={{ width: 250, height: 250 }}
        />
      </Stack>

      <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
        <Typography variant="body1">
          <b>Details:</b> {launchPad.details}
        </Typography>

        <Typography variant="body1">
          <b>Locality:</b> {launchPad.locality}
        </Typography>

        <Typography variant="body1">
          <b>Region:</b> {launchPad.region}
        </Typography>

        <Typography variant="body1">
          <b>Latitude:</b> {launchPad.latitude}
        </Typography>

        <Typography variant="body1">
          <b>Longitude:</b> {launchPad.longitude}
        </Typography>

        <Typography variant="body1">
          <b>Timezone:</b> {launchPad.timezone}
        </Typography>

        <Typography variant="body1">
          <b>Status:</b> {launchPad.status}
        </Typography>

        <Typography variant="body1">
          <b>Launch Attempts:</b> {launchPad.launch_attempts}
        </Typography>

        <Typography variant="body1">
          <b>Launch Successes:</b> {launchPad.launch_successes}
        </Typography>
      </Stack>
    </Box>
  );
}
