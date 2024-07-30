// ===== Material UI ===== //
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FolderSpecialOutlinedIcon from '@mui/icons-material/FolderSpecialOutlined';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import RocketOutlinedIcon from '@mui/icons-material/RocketOutlined';

export const PATH = {
  LANDING: '/',
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  POKEMON: '/pokemon',
};

export const sidebar = [
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
    name: 'Movies',
    path: '/movies',
    icon: LocalMoviesOutlinedIcon,
  },
];
