import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
} from '@backstage/core-components';

import {
  Home,
  Api,
  Document,
  AddAlt,
  Radar,
  Settings,
  Search,
  Menu,
} from '@carbon/icons-react';
import { IconComponent } from '@backstage/core-plugin-api';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<Search />} to="/search">
        <SidebarSearchModal icon={Search as IconComponent} />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<Menu />}>
        {/* Global nav, not org-specific */}
        <SidebarItem icon={Home as IconComponent} to="catalog" text="Home" />
        <SidebarItem icon={Api as IconComponent} to="api-docs" text="APIs" />
        <SidebarItem icon={Document as IconComponent} to="docs" text="Docs" />
        <SidebarItem icon={AddAlt as IconComponent} to="create" text="Create..." />
        {/* End global nav */}
        <SidebarDivider />
        <SidebarScrollWrapper>
          <SidebarItem icon={Radar as IconComponent} to="tech-radar" text="Tech Radar" />
        </SidebarScrollWrapper>
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={Settings}
        to="/settings"
      >
        <SidebarSettings icon={Settings as IconComponent} />
      </SidebarGroup>
    </Sidebar>
    {children}
  </SidebarPage>
);
