import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import { AppWrapper } from '../context/state';
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
