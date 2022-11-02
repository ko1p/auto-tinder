import { useState, MouseEvent } from 'react';
import styles from './style.module.scss';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Wrapper from '../../../../6-shared/components/Wrapper';
import { Link } from 'react-router-dom';
import { links } from './links';
import { useAppDispatch } from '../../../../1-app/store/hooks/redux';
import { fetchUserLogout } from '../../../Auth/API';

function AppBarComponent() {
  const dispatch = useAppDispatch();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Wrapper component='header' xs={12} sm={10} md={8} lg={6} xl={4}>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                size='large'
                aria-label='Меню пользователя'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {links.map(link => (
                  <MenuItem key={link.text} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>
                      {link.action === 'logout' ? (
                        <Typography
                          component='span'
                          onClick={() => dispatch(fetchUserLogout())}
                          className={styles.link}
                        >
                          {link.text}
                        </Typography>
                      ) : (
                        <Link className={styles.link} to={link.path}>
                          {link.text}
                        </Link>
                      )}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              АВТОМЕН
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Wrapper>
  );
}
export default AppBarComponent;
