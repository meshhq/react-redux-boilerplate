let mockResponses = {}

export function __setMockResponses(newMockResponse: any) {
	mockResponses = newMockResponse
}

export function GET(path: string, params: any) {
	let rejectRequest = false
	const response = mockResponses as any

	rejectRequest = (response && response.error)

	return new Promise((resolve, reject) => {
		if (rejectRequest) {
			return reject(response)
		}
		return resolve(response)
	})
}

export function POST(path: string, params: any) {
	let rejectRequest = false
	const response = mockResponses as any

	rejectRequest = (response && response.error)

	return new Promise((resolve, reject) => {
		if (rejectRequest) {
			return reject(response)
		}
		return resolve(response)
	})
}
