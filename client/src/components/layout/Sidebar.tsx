import '@coreui/coreui/dist/css/coreui.min.css';
import { CSidebar, CSidebarNav, CNavItem } from '@coreui/react';

import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilCompass,
  cilHome,
  cilSettings,
  cilUser,
} from '@coreui/icons';

export const NarrowSidebar = () => {
  return (
    <CSidebar
      className='border-end bg-theme w-20! top-14! md:top-18! fixed! md:hidden! h-screen'
      narrow
    >
      <CSidebarNav>
        <CNavItem href='#'>
          <CIcon customClassName='nav-icon' icon={cilHome} />
        </CNavItem>
        <CNavItem href='#'>
          <CIcon customClassName='nav-icon' icon={cilCompass} />
        </CNavItem>
        <CNavItem href='#'>
          <CIcon customClassName='nav-icon' icon={cilBell} />
        </CNavItem>
        <CNavItem href='#'>
          <CIcon customClassName='nav-icon' icon={cilUser} />
        </CNavItem>
        <CNavItem href='#'>
          <CIcon customClassName='nav-icon' icon={cilSettings} />
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};
