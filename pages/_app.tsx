import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import smoothscroll from 'smoothscroll-polyfill';

if (process.browser) {
	smoothscroll.polyfill();
}

import './styles.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}

export default MyApp;
