import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../chakra/theme';
import Layout from '../components/Layout/Layout';
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
} : AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
