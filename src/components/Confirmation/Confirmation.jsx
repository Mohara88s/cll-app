import { Button, Modal } from "react-bootstrap";
import { confirmable, createConfirmation } from "react-confirm";

const Confirmation = ({
	okLabel = "OK",
	cancelLabel = "Cancel",
	title = "Confirmation",
	confirmation,
	show,
	proceed,
	enableEscape = true,
}) => {
	return (
		<div className="static-modal">
			<Modal
				animation={false}
				show={show}
				onHide={() => proceed(false)}
				backdrop={enableEscape ? true : "static"}
				keyboard={enableEscape}
			>
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{confirmation}</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => proceed(false)}>{cancelLabel}</Button>
					<Button
						className="button-l"
						variant="primary"
						onClick={() => proceed(true)}
					>
						{okLabel}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export function confirm(
	confirmation,
	proceedLabel = "OK",
	cancelLabel = "cancel",
	options = {}
) {
	return createConfirmation(confirmable(Confirmation))({
		confirmation,
		proceedLabel,
		cancelLabel,
		...options,
	});
}
