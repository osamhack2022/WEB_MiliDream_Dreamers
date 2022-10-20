import Image from "next/image";

export default function about() {
    return (
        <div>

            <h1>THIS IS about page</h1>
            <Image
                src="/vercel.svg"
                width="50px"
                height="50px" />
            <img src="/vercel.svg" />

            <div className="abc"></div>

            <style jsx global>{`
            `}</style>
            <style jsx>{`
                h1 {
                    background-color: tomato;
                }
                .abc {
                    color: blue;
                }
            `}</style>
        </div>
    )
}