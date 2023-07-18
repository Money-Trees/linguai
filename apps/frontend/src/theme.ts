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
        50: '#d9ffd8',
        100: '#c1ffb9',
        200: '#a5ff9b',
        300: '#82c578',
        400: '#71b469',
        500: '#5e9b57',
        600: '#5e9b55',
        700: '#395d33',
        800: '#294927',
        900: '#0d180d',
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' })
);

export default theme;
