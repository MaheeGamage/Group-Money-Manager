import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import NavWithSidebarLayout from '../layouts/navWithSidebarLayout'
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './_app'

const SampleHome: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Group Budget</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex">

              <div className="flex-1">
                <h1 className="card-title text-2xl">Mahee's Budget</h1>
                <p>4 Members</p>
              </div>

              <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button>
              </div>

            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-block">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" stroke="currentColor" fill="currentColor"><path d="M24 30.1 12.7 18.75l1.6-1.6 9.7 9.7 9.7-9.7 1.6 1.65Z"/></svg>
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg> */}
                {/* Buy Now */}
              </button>
            </div>

          </div>
        </div>

      </div>

    </>
  )
}

SampleHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavWithSidebarLayout>
      {page}
    </NavWithSidebarLayout>
  )
}

export default SampleHome
