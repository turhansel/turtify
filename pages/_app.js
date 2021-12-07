import '../styles/global.css';
import { SessionProvider } from 'next-auth/react';
import { AppWrapper } from '../context/store';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</SessionProvider>
	);
}

export default MyApp;
