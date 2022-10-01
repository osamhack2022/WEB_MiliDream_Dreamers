import Head from "next/head";

export default function Seo({ title }) {
    return (
        <Head>
            <title>MILI-Dream | {title}</title>
        </Head>
    )
}