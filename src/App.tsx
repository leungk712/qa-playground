import { useState } from 'react';

// ===== Material UI ===== //
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Typography,
  Toolbar,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// ===== Components ===== //
import Dashboard from './pages/Dashboard';
import Pokemon from './pages/Pokemon';
import Login from './pages/Login';
import User from './pages/User';

// ===== Constants ===== //
import { PATH, sidebar } from './constants/paths';
const { LANDING, LOGIN } = PATH;

// ===== Interfaces ===== //
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// ===== React Router ===== //
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// ===== Styles ===== //
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(6),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: '50px',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function App() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  const handleDrawer = (status: boolean) => {
    setOpen(status);
  };

  const handleSidebarClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {location.pathname !== LANDING && location.pathname !== LOGIN ? (
        <Box sx={{ display: 'flex' }}>
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              bgcolor: '#00897b',
            }}
            open={open}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{
                  mr: 2,
                  color: 'white',
                  ...(open && { display: 'none' }),
                }}
                onClick={() => handleDrawer(!open)}
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" component="div">
                QA Playground
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} sx={{ width: drawerWidth }}>
            <DrawerHeader sx={{ bgcolor: '#00897b' }}>
              <IconButton onClick={() => handleDrawer(false)}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon sx={{ color: 'white' }} />
                ) : (
                  <ChevronLeftIcon sx={{ color: 'white' }} />
                )}
              </IconButton>
            </DrawerHeader>

            <Divider />

            <List>
              {sidebar?.map((sidebarItem, index) => (
                <ListItem key={sidebarItem.name} disablePadding sx={{ my: 1 }}>
                  <Tooltip title={sidebarItem.name}>
                    <ListItemButton
                      onClick={() => handleSidebarClick(sidebarItem.path)}
                    >
                      <ListItemIcon>
                        <sidebarItem.icon />
                      </ListItemIcon>
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
      ) : null}

      <Main open={open} sx={{ height: '100vh' }}>
        <Routes key={location.pathname} location={location}>
          <Route index={true} element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
