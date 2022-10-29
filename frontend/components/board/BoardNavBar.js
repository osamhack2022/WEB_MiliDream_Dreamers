//board 전용 네비게이션 바 / 좌측바 - 네이버 카페 처럼.

import Link from "next/link";
import { GlobalState } from "../../states/GlobalState";


export default function BoardNavBar() {
	const categoryList = GlobalState(state => state.categoryList);
	return (
		<div>
			<div className="flex-shrink-0 p-3 bg-white">
				<a href="/board" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
					<span className="fs-5 fw-semibold">MILI-DREAM community</span>
				</a>
				<ul className="list-unstyled ps-0">
					{/* <li className="mb-1">
						<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
							{
								categoryList?.map(category => (<li key={category.categoryKey}><Link href={`/board/${category.categoryKey}`}><a className="link-dark d-inline-flex text-decoration-none rounded">{category.categoryName}</a></Link></li>))
							}
						</ul>
					</li>
					<li className="border-top my-3"></li> */}
					<li className="mb-1">
						<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
							<li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">공지사항</a></li>
							<li><a href="/board/1" className="link-dark d-inline-flex text-decoration-none rounded">공모전&대회 리스트</a></li>
							<li><a href="/board/2" className="link-dark d-inline-flex text-decoration-none rounded">자유 게시판</a></li>
							<li><a href="/board/7" className="link-dark d-inline-flex text-decoration-none rounded">자유 게시판</a></li>
						</ul>
					</li>
					<li className="border-top my-3"></li>
					<li className="mb-1">
						<button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
							복무지 별 커뮤니티
						</button>
						<div className="collapse show" id="home-collapse">
							<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
								<li><a href="/board/4" className="link-dark d-inline-flex text-decoration-none rounded">육군</a></li>
								<li><a href="/board/5" className="link-dark d-inline-flex text-decoration-none rounded">해군</a></li>
								<li><a href="/board/6" className="link-dark d-inline-flex text-decoration-none rounded">공군</a></li>
								{/* <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">게시판4</a></li> */}
							</ul>
						</div>
					</li>
					<li className="mb-1">
						<button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true">
							관심사 별 커뮤니티
						</button>
						<div className="collapse show" id="dashboard-collapse">
							<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
								<li><a href="/board/3" className="link-dark d-inline-flex text-decoration-none rounded">코딩</a></li>
								<li><a href="/board/8" className="link-dark d-inline-flex text-decoration-none rounded">운동게시판</a></li>
								<li><a href="/board/10" className="link-dark d-inline-flex text-decoration-none rounded">독서게시판</a></li>
								<li><a href="/board/9" className="link-dark d-inline-flex text-decoration-none rounded">게임게시판</a></li>
							</ul>
						</div>
					</li>
					<li className="border-top my-3"></li>
					<li className="mb-1">
						<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
							<li><a href="https://github.com/osamhack2022-v2/WEB_MiliDream_Dreamers/issues" className="link-dark d-inline-flex text-decoration-none rounded">버그 신고하기</a></li>
							<li><a href="https://github.com/osamhack2022-v2/WEB_MiliDream_Dreamers/discussions" className="link-dark d-inline-flex text-decoration-none rounded">건의사항</a></li>
						</ul>
					</li>
				</ul>
			</div>
			<style jsx>{` /*bootstrap에서 제공해준 기본 css*/
      body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
      }
      html {
        height: -webkit-fill-available;
      }
      main {
        height: 100vh;
        height: -webkit-fill-available;
        max-height: 100vh;
        overflow-x: auto;
        overflow-y: hidden;
      }
      .dropdown-toggle { outline: 0; }
      .btn-toggle {
        padding: .25rem .5rem;
        font-weight: 600;
        color: rgba(0, 0, 0, .65);
        background-color: transparent;
      }
      .btn-toggle:hover, .btn-toggle:focus {
        color: rgba(0, 0, 0, .85);
        background-color: #a593e045;
      }
      .btn-toggle::before {
        width: 1.25em;
        line-height: 0;
        content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
        transition: transform .35s ease;
        transform-origin: .5em 50%;
      }
      .btn-toggle[aria-expanded="true"] {
        color: rgba(0, 0, 0, .85);
      }
      .btn-toggle[aria-expanded="true"]::before {
        transform: rotate(90deg);
      }
      .btn-toggle-nav a {
        padding: .1875rem .5rem;
        margin-top: .125rem;
        margin-left: 1.25rem;
      }
      .btn-toggle-nav a:hover, .btn-toggle-nav a:focus {
        background-color: #a593e045;
      }
      .scrollarea {
        overflow-y: auto;
      }
      `}</style>
			<style jsx>{` /* 추가적으로 작성하는 css */
        .flex-shrink-0.p-3.bg-white {
          /*outline: 1px solid #566270;#a593e045*/
        }
        `}</style>
		</div>
	)
}