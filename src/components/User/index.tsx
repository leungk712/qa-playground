import { useCallback, useMemo, useReducer, useState } from 'react';
import debounce from 'debounce';

// ===== Material UI ===== //
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

// ===== Components ===== //

// ===== Constants ===== //

// ===== Dayjs ===== //
import dayjs, { Dayjs } from 'dayjs';

// ===== Helpers ===== //

// ===== Interfaces ===== //
interface User {
  [key: string]: string;
}

// ===== Redux ===== //

// ===== Styles ===== //

export const isOnlyAlphabeticCharacters = (value: string) => {
  return /^[a-zA-Z]+$/.test(value);
};

export const isNumeric = (value: string) => {
  return /^-?\d+$/.test(value);
};

const initialState: User = {
  firstName: '',
  middleName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipcode: '',
  dateOfBirth: '',
  phoneNumber: '',
};

const reducer = (
  state = initialState,
  action: { type: string; field: string; payload: string }
) => {
  const { type, field, payload } = action;

  switch (type) {
    case 'setField':
      return {
        ...state,
        [field]: payload,
      };
    default:
      return;
  }
};

export default function UserProfile() {
  const [user, setUser] = useReducer(reducer, initialState);
  const [userSaved, setUserSaved] = useState<boolean>(false);
  const [isBlurred, setIsBlurred] = useState<string[]>([]);

  const userInfo = useMemo(() => {
    return user;
  }, [user]);

  const isFormValid = useMemo(() => {
    const form = {
      firstName: userInfo?.firstName && userInfo?.firstName?.length > 0,
      lastName: userInfo?.lastName && userInfo?.lastName?.length > 0,
      address1: userInfo?.address1 && userInfo?.address1?.length > 0,
      city: userInfo?.city && userInfo?.city?.length > 0,
      state:
        userInfo?.state &&
        userInfo?.state.length == 2 &&
        isOnlyAlphabeticCharacters(userInfo?.state),
      zipcode:
        userInfo?.zipcode &&
        userInfo?.zipcode.length === 5 &&
        isNumeric(userInfo?.zipcode),
      dateOfBirth: userInfo?.dateOfBirth && userInfo?.dateOfBirth?.length > 0,
      phoneNumber:
        userInfo?.phoneNumber && userInfo?.phoneNumber?.length === 10,
    };

    return Object.values(form)?.every((isValid) => isValid);
  }, [userInfo]);

  const handleInput = useCallback(
    (
      evt:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | Dayjs
        | null,
      field: string
    ) => {
      if (evt && 'target' in evt) {
        const { value } = evt.target;

        setUser({
          type: 'setField',
          field,
          payload: value,
        });

        return;
      } else if (dayjs(evt).isValid()) {
        const date = dayjs(evt).format('MM/DD/YYYY');

        setUser({
          type: 'setField',
          field,
          payload: date,
        });

        return;
      }

      return;
    },
    []
  );

  const debouncedHandleInput = useMemo(() => {
    return debounce(handleInput, 300);
  }, [handleInput]);

  const handleSave = () => {
    setUserSaved(true);
  };

  const handleSetIsBlurred = (value: string) => {
    setIsBlurred((prev) => [...new Set([...prev, value])]);
  };

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
          <TextField
            className="w-100"
            label="First Name"
            required
            defaultValue={userInfo?.firstName}
            InputLabelProps={{ shrink: true }}
            onChange={(evt) => debouncedHandleInput(evt, 'firstName')}
          />

          <TextField
            className="w-100"
            label="Middle Name"
            defaultValue={userInfo?.middleName}
            InputLabelProps={{ shrink: true }}
            onChange={(evt) => debouncedHandleInput(evt, 'middleName')}
          />

          <TextField
            className="w-100"
            label="Last Name"
            required
            defaultValue={userInfo?.lastName}
            InputLabelProps={{ shrink: true }}
            onChange={(evt) => debouncedHandleInput(evt, 'lastName')}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <TextField
            className="w-100"
            label="Address"
            required
            defaultValue={userInfo?.address1}
            InputLabelProps={{ shrink: true }}
            onChange={(evt) => debouncedHandleInput(evt, 'address1')}
          />

          <TextField
            className="w-100"
            label="Address 2"
            helperText="Apt, Unit, Suite"
            defaultValue={userInfo?.address2}
            InputLabelProps={{ shrink: true }}
            onChange={(evt) => debouncedHandleInput(evt, 'address2')}
          />

          <TextField
            className="w-100"
            label="City"
            required
            defaultValue={userInfo?.city}
            InputLabelProps={{ shrink: true }}
            onBlur={() => handleSetIsBlurred('city')}
            onChange={(evt) => debouncedHandleInput(evt, 'city')}
          />

          <TextField
            className="w-100"
            label="State"
            required
            defaultValue={userInfo?.state}
            InputLabelProps={{ shrink: true }}
            helperText="must be 2 characters (CO)"
            error={
              (isBlurred.includes('state') && userInfo?.state?.length !== 2) ||
              (isBlurred.includes('state') &&
                !isOnlyAlphabeticCharacters(userInfo?.state as string))
            }
            onBlur={() => handleSetIsBlurred('state')}
            onChange={(evt) => debouncedHandleInput(evt, 'state')}
          />

          <TextField
            className="w-100"
            label="Zipcode"
            required
            defaultValue={userInfo?.zipcode}
            InputLabelProps={{ shrink: true }}
            helperText="must be 5 digits (ex. 80112)"
            error={
              isBlurred.includes('zipcode') && userInfo?.zipcode?.length !== 5
            }
            onBlur={() => handleSetIsBlurred('zipcode')}
            onChange={(evt) => debouncedHandleInput(evt, 'zipcode')}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2 }}
          justifyContent="space-between"
        >
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Date of Birth"
                defaultValue={dayjs(userInfo?.dateOfBirth) || null}
                required
                slotProps={{
                  textField: {
                    error:
                      isBlurred.includes('dateOfBirth') &&
                      !userInfo?.dateOfBirth,
                    helperText:
                      isBlurred.includes('dateOfBirth') &&
                      !userInfo?.dateOfBirth
                        ? 'date of birth must be set'
                        : '',
                  },
                }}
                onBlur={() => handleSetIsBlurred('dateOfBirth')}
                onChange={(evt) => debouncedHandleInput(evt, 'dateOfBirth')}
              />
            </LocalizationProvider>

            <TextField
              label="Phone Number"
              sx={{ ml: 2 }}
              required
              defaultValue={userInfo?.phoneNumber}
              InputLabelProps={{ shrink: true }}
              helperText="must be 10 digits"
              error={
                isBlurred.includes('phoneNumber') &&
                userInfo?.phoneNumber?.length !== 10
              }
              onBlur={() => handleSetIsBlurred('phoneNumber')}
              onChange={(evt) => debouncedHandleInput(evt, 'phoneNumber')}
            />
          </Box>

          <Button
            variant="contained"
            sx={{ width: 200, height: 50 }}
            disabled={!isFormValid}
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </Stack>
      </Box>

      {user && userSaved ? (
        <Box>
          {Object.keys(user).map((userKey: string) => (
            <li>
              {userKey}: {user[userKey as string]}
            </li>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}
