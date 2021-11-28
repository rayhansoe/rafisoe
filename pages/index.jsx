import { useState, useEffect, useCallback } from 'react'

import heroImage from '../public/images/284466.jpg'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

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
				<title>RAFISOE 👋🏿</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<nav className='flex justify-between mt-4 z-10 text-white text-xl'>
				<Link href='/'>
					<a>RAFISOE</a>
				</Link>

				<div className='hidden gap-6 md:flex'>
					<Link href='#'>
						<a className='hover:underline'>About</a>
					</Link>
					<Link href='#'>
						<a className='hover:underline'>Blog</a>
					</Link>
					<Link href='#'>
						<a className='hover:underline'>Contact</a>
					</Link>
				</div>

				<div className='md:hidden cursor-pointer' onClick={mobileNavToggle}>
					BURGER
				</div>
				<div
					className={`${
						isMobileNavDisplayed ? 'block' : 'hidden'
					} flex flex-col items-center justify-center w-full flex-1  text-center absolute bg-gray-900 bg-opacity-90 top-0 left-0 min-h-screen  cursor-pointer text-white text-xl`}
					onClick={mobileNavClose}>
					<div
						className='relative flex flex-col items-center justify-center p-24 gap-8 bg-green-900 rounded pointer-events-auto cursor-default z-20'
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
			<div>
				<div className='absolute top-0 left-0 flex flex-col items-center justify-center flex-1 text-center object-cover'>
					<div className='relative w-screen h-screen'>
						<Image
							src={heroImage}
							layout='fill'
							alt='Hero Image'
							placeholder='blur'
							objectFit='cover'
						/>
					</div>
					<div className='absolute top-0 left-0 bg-gray-900 bg-opacity-30 w-screen h-screen'></div>
					<div className='absolute flex flex-col mt-8 mx-auto my-auto gap-14 text-center items-center text-white'>
						<h1 className='text-5xl mx-4'>Find Your Next Unique Stay</h1>
						<button className='bg-green-800 px-9 py-5 rounded hover:bg-opacity-80'>
							<Link href='#'>
								<a>Watch Now</a>
							</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
