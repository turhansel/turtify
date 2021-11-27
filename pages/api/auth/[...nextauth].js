import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

async function refreshAccessToken(token) {
	try {
		spotifyApi.setAccessToken(token.accessToken);
		spotifyApi.setRefreshToken(token.refreshToken);

		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("refreshedToken:::", refreshedToken)

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() * refreshedToken.expires_in * 1000, // 1 hour as 3600 returns from spotifyAPI
            refreshedToken: refreshedToken.refresh_token ?? token.refreshedToken

        }

	} catch (error) {
		console.log(error);

		return {
			...token,
			error: 'refreshAccessTokenError',
		};
	}
}

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			authorizationUrl: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		// https://next-auth.js.org/tutorials/refresh-token-rotation
		async jwt({ token, account, user }) {
			// init sign in
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000,
				};
			}

			// Return previous token if the access token has not expires yet
			if (Date.now() < token.accessTokenExpires) {
				console.log('existing access token is valid');
				return token;
			}

			console.log('access token has expired, refreshing...');
			return await refreshAccessToken(token);
		},
        async session({session,token}){
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }
	},
});
