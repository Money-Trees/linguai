import {
  StyleConfig,
  ThemeConfig,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
};

const components: Record<string, StyleConfig> = {
  Card: {
    baseStyle: {
      backgroundColor: 'gray.800',
      _dark: {
        backgroundColor: 'white',
      },
    },
  },
  Table: {
    variants: {
      cards: ({ colorMode }) => ({
        table: {
          borderSpacing: '0 var(--chakra-space-4)',
          borderCollapse: 'separate',
        },
        thead: {
          tr: {
            backgroundColor: 'unset',
            _hover: { shadow: 'unset' },
          },
        },
        tr: {
          transitionDuration: '500ms',
          backgroundColor: colorMode === 'dark' ? 'gray.800' : 'white',
          _hover: {
            shadow: 'md',
          },
        },
        th: {
          paddingY: 0,
        },
        td: {
          position: 'relative',
          _after: {
            content: '""',
            backgroundColor: colorMode === 'dark' ? 'gray.800' : 'gray.200',
            position: 'absolute',
            left: '100%',
            top: 2,
            bottom: 2,
            width: '1px',
          },
          _first: {
            borderLeftRadius: 'lg',
          },
          _last: {
            borderRightRadius: 'lg',
          },
        },
      }),
    },
  },
};

const theme = extendTheme(
  {
    config,
    components,
    colors: {
      gray: {
        50: '#fcfcfc',
        100: '#f7f7f7',
        200: '#f0f0f0',
        300: '#e0e0e0',
        400: '#bfbfbf',
        500: '#969696',
        600: '#696969',
        700: '#474747',
        800: '#2b2b2b',
        900: '#242424',
      },
      primary: {
        50: '#ecf3eb',
        100: '#cfe1cd',
        200: '#afcdab',
        300: '#8eb989',
        400: '#76aa70',
        500: '#5e9b57',
        600: '#56934f',
        700: '#4c8946',
        800: '#427f3c',
        900: '#316d2c',
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' })
);

export default theme;
