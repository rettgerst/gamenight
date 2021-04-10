import { AppProps } from "next/dist/next-server/lib/router/router";

import "./styles.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
