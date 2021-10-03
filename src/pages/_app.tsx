import { ChakraProvider } from "@chakra-ui/react";
import { createClient, defaultExchanges, Provider } from "urql";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { devtoolsExchange } from "@urql/devtools";
import { DefaultSeo } from "next-seo";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";

const queryClient = new QueryClient();

export const client = createClient({
  url: "https://graphql-pokemon2.vercel.app",
  exchanges: [devtoolsExchange, ...defaultExchanges],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS>
          <ReactQueryDevtools position="bottom-right" />
          <DefaultSeo />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
