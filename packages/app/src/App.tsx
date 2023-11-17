import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
} from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';


import {
  lightTheme,
  createTheme,
  genPageTheme,
  shapes,
} from '@backstage/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { IconComponent, githubAuthApiRef,  SignInPageProps, AppComponents } from '@backstage/core-plugin-api';

import {
  PageBreak,
  Catalog,
  Chat,
  Dashboard,
  Document,
  Email,
  LogoGithub,
  Group,
  Help,
  Api,
  Chip,
  Building,
  Location,
  DataCategorical,
  User,
  Warning,
  Portfolio,
  Search,
  TextLongParagraph,
  FolderAdd,
} from '@carbon/icons-react';



const novaTheme = createTheme({
  palette: {
    ...lightTheme.palette,
    primary: { main: '#0f62fe' },
    secondary: { main: '#565a6e' },
    error: { main: '#da1e28' },
    warning: { main: '#f1c21b' },
    info: { main: '#0043ce' },
    success: { main: '#24a148' },
    background: { default: '#f4f4f4', paper: '#f4f4f4' },
    banner: {
      info: '#0043ce',
      error: '#da1e28',
      text: '#ffffff',
      link: '#0f62fe',
    },
    errorBackground: '#da1e28',
    warningBackground: '#f1c21b',
    infoBackground: '#0043ce',
    navigation: {
      background: '#161616',
      indicator: '#f4f4f4',
      color: '#d5d6db',
      selectedColor: '#f4f4f4',
    },
  },
  defaultPageTheme: 'home',
  fontFamily: 'Source Sans 3',
  pageTheme: {
    home: genPageTheme({ colors: ['#000000', '#161616'], shape: shapes.wave }),
    documentation: genPageTheme({
      colors: ['#000000', '#161616'],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({ colors: ['#000000', '#161616'], shape: shapes.round }),
    service: genPageTheme({
      colors: ['#000000', '#161616'],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: ['#000000', '#161616'],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: ['#000000', '#161616'],
      shape: shapes.wave,
    }),
    other: genPageTheme({ colors: ['#000000', '#161616'], shape: shapes.wave }),
    app: genPageTheme({ colors: ['#000000', '#161616'], shape: shapes.wave }),
    apis: genPageTheme({ colors: ['#000000', '#161616'], shape: shapes.wave }),
  },
});

const icons = {
  brokenImage: PageBreak as IconComponent,
  catalog: Catalog as IconComponent,
  scaffolder: FolderAdd as IconComponent,
  techdocs: TextLongParagraph as IconComponent,
  search: Search as IconComponent,
  chat: Chat as IconComponent,
  dashboard: Dashboard as IconComponent,
  docs: Document as IconComponent,
  email: Email as IconComponent,
  github: LogoGithub as IconComponent,
  group: Group as IconComponent,
  help: Help as IconComponent,
  'kind:api': Api as IconComponent,
  'kind:component': Chip as IconComponent,
  'kind:domain': Building as IconComponent,
  'kind:group': Group as IconComponent,
  'kind:location': Location as IconComponent,
  'kind:system': DataCategorical as IconComponent,
  'kind:user': User as IconComponent,
  'kind:resource': Portfolio as IconComponent,
  user: User as IconComponent,
  warning: Warning as IconComponent,
};


const components: Partial<AppComponents> = {
  SignInPage: (props: SignInPageProps) => (
    <SignInPage
      {...props}
      providers={[
        'guest',
        {
          id: 'github-auth-provider',
          title: 'GitHub',
          message: 'Sign in using GitHub',
          apiRef: githubAuthApiRef,
        },
      ]}
    />
  ),
};


const app = createApp({
  components: components,
  apis,
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  themes: [
    {
      id: 'nova',
      title: 'Nova',
      variant: 'light',
      Provider: ({ children }) => (
        <ThemeProvider theme={novaTheme}>
          <CssBaseline>{children}</CssBaseline>
        </ThemeProvider>
      ),
    },
  ],
  icons: icons,
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<Navigate to="catalog" />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
