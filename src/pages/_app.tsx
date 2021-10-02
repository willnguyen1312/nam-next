import { ChakraProvider } from "@chakra-ui/react";
import { createClient, defaultExchanges, Provider } from "urql";
import { AppProps } from "next/app";
import { devtoolsExchange } from "@urql/devtools";

export const client = createClient({
  url: "https://graphql-pokemon2.vercel.app",
  exchanges: [devtoolsExchange, ...defaultExchanges],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
