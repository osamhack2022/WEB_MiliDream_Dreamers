// 게시판 검색 기능

import { useRouter } from "next/router";
import { useRef } from "react";

export default function BoardSearchBar({ placeHolder }) {
	const searchBody = useRef();
	const router = useRouter();
	const onSubmit = async (e) => {
		e.preventDefault();

		router.push(`/board/search?content=${searchBody.current.value}`);
	};
	return (
		<div>
			{/* bootstrap */}
			<nav className="navbar navbar-light">
				<form className="form-inline" onSubmit={onSubmit}>
					<input
						className="form-control mr-sm-2"
						type="search"
						placeholder={placeHolder}
						aria-label="Search"
						ref={searchBody}
					/>
					<button className="btn btn-outline-success my-sm-0" type="submit">
						<i className="fa fa-search"></i>
					</button>
				</form>
			</nav>
			<style jsx>{`
				.form-inline {
					display: flex;
				}
				.form-control.mr-sm-2 {
					border: 1px solid #566270;
					border-right: 0px;
					border-radius: 0px;
					height: 50px;
					/* outline: 1px solid #566270; */
				}
				.form-control.mr-sm-2::placeholder {
					color: #a593e0;
				}
				.btn {
					border: 1px solid #566270;
					border-left: 0px;
					border-radius: 0px;
					color: #a593e0;
				}
				.btn:hover {
					background-color: #a593e045;
				}
				.navbar {
					display: block;
				}
			`}</style>
		</div>
	);
}
