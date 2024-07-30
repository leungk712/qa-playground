import React, { useState } from 'react';

// ===== Material UI ===== //
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
  Stack,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===== Components ===== //

// ===== Constants ===== //
const USER_LOGIN = {
  user: 'user',
  pw: 'password',
};

const { user, pw } = USER_LOGIN;

// ===== Helpers ===== //

// ===== Interfaces ===== //
type Element = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

// ===== React Router ===== //
import { useNavigate } from 'react-router-dom';

// ===== Styles ===== //

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const disabledLogin = !username || !password;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleForgotPassword = () => {
    alert(
      'Why did you forget your password? Sigh, anyways go speak with an admin to reset it...'
    );
  };

  const handleUsername = (evt: Element) => {
    if (showAlert) {
      handleCloseAlert();
    }

    setUsername(evt.target.value);
  };

  const handlePassword = (evt: Element) => {
    if (showAlert) {
      handleCloseAlert();
    }

    setPassword(evt.target.value);
  };

  const handleLogin = () => {
    if (username.toLowerCase() !== user || password.toLowerCase() !== pw) {
      setShowAlert(true);

      return;
    }

    navigate('/dashboard');
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: 350,
          height: 300,
          border: '1px solid gray',
          borderRadius: '5px',
          p: 3,
        }}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          label="Email or username"
          sx={{ width: '100%' }}
          value={username}
          onChange={(evt) => handleUsername(evt)}
        />

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="password-input">Password</InputLabel>

          <OutlinedInput
            id="password-input"
            label="Password"
            sx={{ width: '100%' }}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(evt) => handlePassword(evt)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Box
          sx={{ display: 'flex', justifyContent: 'start', width: '100%' }}
          onClick={handleForgotPassword}
        >
          <Button>
            <Typography variant="caption">Forgot password?</Typography>
          </Button>
        </Box>

        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          sx={{ width: '100%' }}
          spacing={1}
        >
          <Button
            variant="outlined"
            color="primary"
            disabled={disabledLogin}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>

        {showAlert ? (
          <Alert
            severity="error"
            sx={{ width: '100%' }}
            onClose={() => handleCloseAlert()}
          >
            Username must be user.
            <br />
            Password must be password.
          </Alert>
        ) : null}
      </Stack>
    </Box>
  );
}
