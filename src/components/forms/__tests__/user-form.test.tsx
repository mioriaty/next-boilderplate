// src/components/forms/__tests__/user-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { UserForm } from '../user-form'

describe('UserForm', () => {
	const mockOnSubmit = jest.fn()

	beforeEach(() => {
		mockOnSubmit.mockClear()
	})

	it('renders form fields correctly', () => {
		render(<UserForm onSubmit={mockOnSubmit} />)

		expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
		expect(
			screen.getByPlaceholderText('Enter your password')
		).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
	})

	it('shows validation errors for invalid input', async () => {
		const user = userEvent.setup()
		render(<UserForm onSubmit={mockOnSubmit} />)

		const submitButton = screen.getByRole('button', { name: 'Submit' })
		await user.click(submitButton)

		await waitFor(() => {
			expect(
				screen.getByText('Name must be at least 2 characters')
			).toBeInTheDocument()
			expect(screen.getByText('Invalid email address')).toBeInTheDocument()
			expect(
				screen.getByText('Password must be at least 8 characters')
			).toBeInTheDocument()
		})
	})

	it('calls onSubmit with valid data', async () => {
		const user = userEvent.setup()
		render(<UserForm onSubmit={mockOnSubmit} />)

		await user.type(screen.getByPlaceholderText('Enter your name'), 'John Doe')
		await user.type(
			screen.getByPlaceholderText('Enter your email'),
			'john@example.com'
		)
		await user.type(
			screen.getByPlaceholderText('Enter your password'),
			'password123'
		)

		const submitButton = screen.getByRole('button', { name: 'Submit' })
		await user.click(submitButton)

		await waitFor(() => {
			expect(mockOnSubmit).toHaveBeenCalledWith({
				name: 'John Doe',
				email: 'john@example.com',
				password: 'password123',
			})
		})
	})

	it('disables submit button when loading', () => {
		render(<UserForm onSubmit={mockOnSubmit} isLoading={true} />)

		const submitButton = screen.getByRole('button', { name: 'Submitting...' })
		expect(submitButton).toBeDisabled()
	})
})
