// ===== Material UI ===== //
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FolderSpecialOutlinedIcon from '@mui/icons-material/FolderSpecialOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import RocketOutlinedIcon from '@mui/icons-material/RocketOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

export const PATH = {
  LANDING: '/',
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  POKEMON: '/pokemon',
  USER: '/user',
  SPACE: '/space',
  SUNRISE_SUNSET: '/sunrise-sunset',
};

export const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: DashboardOutlinedIcon,
  },
  {
    name: 'Pokemon',
    path: '/pokemon',
    icon: FolderSpecialOutlinedIcon,
  },
  {
    name: 'Users',
    path: '/user',
    icon: PersonOutlinedIcon,
  },
  {
    name: 'Space',
    path: '/space',
    icon: RocketOutlinedIcon,
  },
  {
    name: 'Sunrise - Sunset',
    path: '/sunrise-sunset',
    icon: WbSunnyOutlinedIcon,
  },
];
