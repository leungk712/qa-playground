// ===== Material UI ===== //
import { Box, Card, Stack, Typography } from '@mui/material';

// ===== Components ===== //

// ===== Constants ===== //
const actionItems = [
  {
    title: 'Pokemon',
    path: '/pokemon',
  },
];

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
      {actionItems?.map((action) => (
        <Card
          key={action.title}
          sx={{
            width: 250,
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#ffa726',
            cursor: 'pointer',
          }}
          onClick={() => handleClick(action.path)}
        >
          <Typography variant="h4">{action.title}</Typography>
        </Card>
      ))}
    </Stack>
  );
}
