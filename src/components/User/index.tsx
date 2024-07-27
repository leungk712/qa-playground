import { useState } from 'react';

// ===== Material UI ===== //
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

// ===== Components ===== //

// ===== Constants ===== //

// ===== Helpers ===== //

// ===== Interfaces ===== //

// ===== Redux ===== //

// ===== Styles ===== //

export default function UserProfile() {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4">User Profile</Typography>

      <Box
        sx={{
          width: '100%',
          border: '1px solid gray',
          borderRadius: '5px',
          mt: 5,
          p: 2,
        }}
      >
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <TextField className="w-100" label="First Name" />

          <TextField className="w-100" label="Middle Name" />

          <TextField className="w-100" label="Last Name" />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <TextField className="w-100" label="Address" />

          <TextField
            className="w-100"
            label="Address 2"
            helperText="Apt, Unit, Suite"
          />

          <TextField className="w-100" label="City" />

          <TextField className="w-100" label="State" />

          <TextField className="w-100" label="Zipcode" />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2 }}
          justifyContent="space-between"
        >
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField label="Date of Birth" />
            </LocalizationProvider>

            <TextField label="Phone Number" sx={{ ml: 2 }} />
          </Box>

          <Button variant="outlined" sx={{ width: 125 }}>
            Save
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
