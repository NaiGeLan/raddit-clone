import { extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';

import { Button } from './button';
// 2. Extend the theme to include custom colors, fonts, etc
export const theme = extendTheme({
  brand: {
    100: '#cd5418',
  },
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: 'gray.200',
      },
    }),
  },
  components: {
    Button,
  },
});

// export default extendTheme({ colors })
