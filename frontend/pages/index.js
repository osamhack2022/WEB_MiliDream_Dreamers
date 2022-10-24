// 기본 라우팅 경로입니다. (/) 으로 접속했을 때 보여지는 페이지

import Image from 'next/image'


export default function Home() {
    return (
        <div>

            <h1>hELLOO THIS IS HOME</h1>
            <Image
                src="/vercel.svg"
                width="50px"
                height="50px" />
            <img src="/vercel.svg" />
            <style jsx global>{`

            `}</style>
        </div>
    )
}

/*SSR을 위한 함수. 여기 작성하는 코드들은 서버에서 동작한다. (==클라이언트에서 보이지 않음) 
* 함수 이름을 변경하면 안됨.
* object를 return 하며, 이 안에는 props라는 key가 있으며, 이 안에 원하는 데이터를 넣을 수 있음.
*/
/*
export async function getServerSideProps() {
    const { results } = await (await fetch(``)).json();
    return {
        props: {
            results,
        }
    }
}
*/