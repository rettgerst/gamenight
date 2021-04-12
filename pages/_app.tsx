import { AppProps } from 'next/dist/next-server/lib/router/router';
import { QueryClient, QueryClientProvider } from 'react-query';

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
