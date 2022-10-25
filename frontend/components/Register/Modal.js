import LoginForm from "./Form";

export default function RegisterModal() {
	return (
		<>
			<div className="modal fade" id="registerloginModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-xl" style={{
					"--bs-modal-width": "830px"
				}}>
					<div className="modal-content">
						<div className="modal-header" style={{ "borderBottom": "none" }}>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<LoginForm></LoginForm>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}