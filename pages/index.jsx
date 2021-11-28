import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'

export default function Home() {
	const [isMobileNavDisplayed, setIsMobileNavDisplayed] = useState(() => false)

	const mobileNavToggle = () => setIsMobileNavDisplayed(curr => !curr)
	const mobileNavClose = e => {
		e.stopPropagation()
		setIsMobileNavDisplayed(curr => curr && false)
	}
	const stopBubbling = e => {
		e.stopPropagation()
	}

	const handleWindowResize = useCallback(() => {
		window.innerWidth > 768 && setIsMobileNavDisplayed(false)
	}, [])

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return () => window.addEventListener('resize', handleWindowResize)
	}, [handleWindowResize])

	return (
		<div className='container flex flex-col min-h-screen mx-auto py-2 px-4 '>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<nav className='flex justify-between mt-4 z-10'>
				<Link href='/'>
					<a>RAFISOE</a>
				</Link>

				<div className='hidden gap-6 md:flex'>
					<Link href='/About'>
						<a>About</a>
					</Link>
					<Link href='/Blog'>
						<a>Blog</a>
					</Link>
					<Link href='/Contact'>
						<a>Contact</a>
					</Link>
				</div>

				<div className='md:hidden cursor-pointer' onClick={mobileNavToggle}>
					BURGER
				</div>
				<div
					className={`${
						isMobileNavDisplayed ? 'block' : 'hidden'
					} flex flex-col items-center justify-center w-full flex-1  text-center absolute bg-gray-700 top-0 left-0 min-h-screen opacity-70 cursor-pointer text-white text-xl`}
					onClick={mobileNavClose}>
					<div
						className='relative flex flex-col items-center justify-center p-14 gap-3 bg-black rounded z-10 pointer-events-auto cursor-default'
						onClick={stopBubbling}>
						<Link href='/About'>
							<a>About</a>
						</Link>
						<Link href='/Blog'>
							<a>Blog</a>
						</Link>
						<Link href='/Contact'>
							<a>Contact</a>
						</Link>
					</div>
				</div>
			</nav>
		</div>
	)
}
