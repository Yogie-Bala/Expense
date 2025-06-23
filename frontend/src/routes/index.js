import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRoutes from './authenticationRoutes';
import MainRoutes from './mainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes]);
}
