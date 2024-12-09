const SuccessModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg text-center">
				<div className="text-green-500 text-3xl mb-4">✔</div>
				<h2 className="text-xl font-bold mb-4">Bid submitted successfully!</h2>
				<button
					onClick={onClose}
					className="bg-blue-500 text-white px-4 py-2 rounded">
					Close
				</button>
			</div>
		</div>
	)
}

export default SuccessModal
