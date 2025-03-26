export function extractErrorMessage(error) {
  if (!error.response) {
    return 'An unexpected error occurred. Please try again.'
  }

  if (error.response.status === 422) {
    return error.response.data.message || 'Validation failed. Please check your input.'
  }

  const messages = {
    401: 'Unauthorized. Please log in.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    500: 'Server error. Please try again later.',
  }

  return messages[error.response.status] || 'An unexpected error occurred. Please try again.'
}
