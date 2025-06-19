import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>AiDent</title>
                <meta name="description" content="AiDent landing page" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <h1>AiDent Landing Page</h1>
                <p>
                    Following paths exist in this project:
                    <br />
                    <span>/comingsoon</span>
                    <br />
                    <span>/home</span>
                    <br />
                    <span>/xray</span>
                    <br />
                    <span>/components-test</span>
                </p>
            </main>
        </>
    );
}
