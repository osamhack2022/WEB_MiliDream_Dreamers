import LoginForm from "./Form";

export default function RegisterModal() {
	return (
		<>
			<div class="modal fade" id="registerloginModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-xl" style={{
					"--bs-modal-width": "830px"
				}}>
					<div class="modal-content">
						<div class="modal-header" style={{ "borderBottom": "none" }}>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<LoginForm></LoginForm>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}