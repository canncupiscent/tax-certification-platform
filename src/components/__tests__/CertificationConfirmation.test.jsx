import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { CertificationProvider } from '@/context/CertificationContext';
import CertificationConfirmation from '../CertificationConfirmation';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

describe('CertificationConfirmation', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCertificationData = {
    lastCertificationDate: new Date('2024-01-01'),
    expirationDate: new Date('2027-01-01'),
    isUSResident: true,
    status: 'VALID'
  };

  it('renders without crashing', () => {
    render(
      <CertificationProvider initialData={mockCertificationData}>
        <CertificationConfirmation />
      </CertificationProvider>
    );
    expect(screen.getByText('Certification Complete')).toBeInTheDocument();
  });

  it('displays correct certification dates', () => {
    render(
      <CertificationProvider initialData={mockCertificationData}>
        <CertificationConfirmation />
      </CertificationProvider>
    );
    
    expect(screen.getByText('January 1, 2024')).toBeInTheDocument(); // Submission date
    expect(screen.getByText('January 1, 2027')).toBeInTheDocument(); // Expiration date
  });

  it('shows correct certification type for US resident', () => {
    render(
      <CertificationProvider initialData={mockCertificationData}>
        <CertificationConfirmation />
      </CertificationProvider>
    );
    
    expect(screen.getByText('W-9')).toBeInTheDocument();
  });

  it('shows correct certification type for non-US resident', () => {
    const nonUSData = { ...mockCertificationData, isUSResident: false };
    render(
      <CertificationProvider initialData={nonUSData}>
        <CertificationConfirmation />
      </CertificationProvider>
    );
    
    expect(screen.getByText('W-8BEN & CRS')).toBeInTheDocument();
  });

  it('navigates to dashboard when return button is clicked', () => {
    render(
      <CertificationProvider initialData={mockCertificationData}>
        <CertificationConfirmation />
      </CertificationProvider>
    );
    
    fireEvent.click(screen.getByText('Return to Dashboard'));
    expect(mockRouter.push).toHaveBeenCalledWith('/certification/dashboard');
  });

  it('displays important information section', () => {
    render(
      <CertificationProvider initialData={mockCertificationData}>
        <CertificationConfirmation />
      </CertificationProvider>
    );
    
    expect(screen.getByText('Important Information')).toBeInTheDocument();
    expect(screen.getByText('Your certification is valid for 3 years from the submission date')).toBeInTheDocument();
    expect(screen.getByText('You must recertify if your circumstances change')).toBeInTheDocument();
    expect(screen.getByText('We will notify you when recertification is required')).toBeInTheDocument();
    expect(screen.getByText('You can view your certification status anytime from the dashboard')).toBeInTheDocument();
  });

  it('shows download button', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <CertificationProvider initialData={mockCertificationData}>
        <CertificationConfirmation />
      </CertificationProvider>
    );
    
    fireEvent.click(screen.getByText('Download Certification'));
    expect(mockAlert).toHaveBeenCalledWith('Download functionality would be implemented here');
    
    mockAlert.mockRestore();
  });
});
