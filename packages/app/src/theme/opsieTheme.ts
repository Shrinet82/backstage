import {
  createBaseThemeOptions,
  createUnifiedTheme,
  genPageTheme,
  palettes,
  shapes,
} from '@backstage/theme';

const OPSIE_PRIMARY = '#8B7FFB';
const OPSIE_TEAL = '#00C9A7';

export const opsieLightTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      primary: {
        main: OPSIE_PRIMARY,
      },
      secondary: {
        main: OPSIE_TEAL,
      },
      paper: '#FFFFFF',
      background: {
        default: '#F8FAFC', // Slate 50 (Opsie Off-White)
        paper: '#FFFFFF',
      },
      navigation: {
        background: '#F1F5F9', // Sidebar Grey
        indicator: OPSIE_PRIMARY,
        color: '#1e293b',
        selectedColor: OPSIE_PRIMARY,
      },
    },
  }),
  defaultPageTheme: 'home',
  pageTheme: {
    home: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.wave }),
    app: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.wave }),
    apis: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.wave }),
    documentation: genPageTheme({
      colors: [OPSIE_PRIMARY, OPSIE_TEAL],
      shape: shapes.wave,
    }),
    tool: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.round }),
    other: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.wave }),
  },
});

export const opsieDarkTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.dark,
      primary: {
        main: OPSIE_PRIMARY,
      },
      secondary: {
        main: OPSIE_TEAL,
      },
      paper: '#1E293B', // Slate 800 (Softer than black)
      background: {
        default: '#0F172A', // Slate 900 (Deep Blue-Grey)
        paper: '#1E293B',
      },
      navigation: {
        background: '#0F172A',
        indicator: OPSIE_PRIMARY,
        color: '#E2E8F0',
        selectedColor: OPSIE_PRIMARY,
      },
    },
  }),
  defaultPageTheme: 'home',
  pageTheme: {
    home: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.wave }),
    app: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.wave }),
    apis: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.wave }),
    documentation: genPageTheme({
      colors: [OPSIE_PRIMARY, OPSIE_TEAL],
      shape: shapes.wave,
    }),
    tool: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.round }),
    other: genPageTheme({ colors: [OPSIE_PRIMARY, OPSIE_TEAL], shape: shapes.wave }),
  },
});
