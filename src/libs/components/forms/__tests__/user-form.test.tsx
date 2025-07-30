import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserForm } from '../user-form';

// Mock the use case factory
jest.mock('@/libs/factories/use-case-factory', () => ({
  createUserUseCaseFactory: jest.fn(() => jest.fn())
}));

describe('UserForm', () => {
  const mockOnSubmit = jest.fn();
  const mockCreateUser = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockCreateUser.mockClear();
    // Mock the factory to return our mock function
    jest.requireMock('@/libs/factories/use-case-factory').createUserUseCaseFactory.mockReturnValue(mockCreateUser);
  });

  it('renders form fields correctly', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create User' })).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: 'Create User' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('calls onSubmit with valid data', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByPlaceholderText('Enter your name'), 'John Doe');
    await user.type(screen.getByPlaceholderText('Enter your email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123');

    const submitButton = screen.getByRole('button', { name: 'Create User' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
    });
  });

  it('disables submit button when submitting', async () => {
    // Mock the createUser to return a delayed promise
    mockCreateUser.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);

    // Fill form and submit to trigger loading state
    await user.type(screen.getByPlaceholderText('Enter your name'), 'John Doe');
    await user.type(screen.getByPlaceholderText('Enter your email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123');

    const submitButton = screen.getByRole('button', { name: 'Create User' });
    await user.click(submitButton);

    // Wait for button to be disabled and show loading text
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Creating...' })).toBeDisabled();
    });
  });
});
