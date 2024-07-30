// ===== Material UI ===== //
import { Card, Stack, Typography } from '@mui/material';

// ===== Components ===== //

// ===== Constants ===== //
import { routes } from '../../constants/paths';

const filteredRoutes = routes?.filter((route) => route.name !== 'Dashboard');

// ===== Helpers ===== //

// ===== Interfaces ===== //

// ===== React Router ===== //
import { useNavigate } from 'react-router-dom';

// ===== Styles ===== //

export default function Dashboard() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Stack sx={{ mt: 8 }} direction="row" spacing={2}>
      {filteredRoutes?.map((route) => (
        <Card
          key={route.name}
          sx={{
            width: 300,
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#ffa726',
            cursor: 'pointer',
          }}
          onClick={() => handleClick(route.path)}
        >
          <Typography variant="h4">{route.name}</Typography>
        </Card>
      ))}
    </Stack>
  );
}
