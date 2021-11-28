import Head from 'next/head';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';

export default function Home() {
	return (
		<div className='bg-black h-screen overflow-hidden'>
			<Head>
				<title>Turtify</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='flex'>
				<Sidebar />
				<Main />
			</main>
			{/* Player */}
		</div>
	);
}
