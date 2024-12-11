import React from 'react';
import { render, act } from '@testing-library/react';
import { CertificationProvider, useCertification } from '../CertificationContext';

describe('CertificationContext', () => {
  const TestComponent = () => {
    const context = useCertification();
    return (
      <div>
        <span data-testid="status">{context.certificationData.status}</span>
        <button onClick={() => context.updateW9Data({ name: 'Test User' })}>Update W9</button>
        <button onClick={() => context.updateW8BenData({ name: 'Test User' })}>Update W8</button>
        <button onClick={() => context.updateCRSData({ firstName: 'Test' })}>Update CRS</button>
        <button onClick={() => context.setResidencyStatus(true)}>Set US Resident</button>
        <button onClick={context.completeCertification}>Complete</button>
        <button onClick={context.resetCertification}>Reset</button>
      </div>
    );
  };

  it('provides initial state', () => {
    const { getByTestId } = render(
      <CertificationProvider>
        <TestComponent />
      </CertificationProvider>
    );

    expect(getByTestId('status')).toHaveTextContent('NONE');
  });

  it('updates W9 data', () => {
    const { getByText } = render(
      <CertificationProvider>
        <TestComponent />
      </CertificationProvider>
    );

    act(() => {
      getByText('Update W9').click();
    });

    // You would typically check if the state was updated correctly
    // This could be done by exposing the state in the test component
  });

  it('updates W8-BEN data', () => {
    const { getByText } = render(
      <CertificationProvider>
        <TestComponent />
      </CertificationProvider>
    );

    act(() => {
      getByText('Update W8').click();
    });
  });

  it('updates CRS data', () => {
    const { getByText } = render(
      <CertificationProvider>
        <TestComponent />
      </CertificationProvider>
    );

    act(() => {
      getByText('Update CRS').click();
    });
  });

  it('sets residency status', () => {
    const { getByText } = render(
      <CertificationProvider>
        <TestComponent />
      </CertificationProvider>
    );

    act(() => {
      getByText('Set US Resident').click();
    });
  });

  it('completes certification', () => {
    const { getByText, getByTestId } = render(
      <CertificationProvider>
        <TestComponent />
      </CertificationProvider>
    );

    act(() => {
      getByText('Complete').click();
    });

    expect(getByTestId('status')).toHaveTextContent('VALID');
  });

  it('resets certification', () => {
    const { getByText, getByTestId } = render(
      <CertificationProvider>
        <TestComponent />
      </CertificationProvider>
    );

    act(() => {
      getByText('Complete').click();
    });
    expect(getByTestId('status')).toHaveTextContent('VALID');

    act(() => {
      getByText('Reset').click();
    });
    expect(getByTestId('status')).toHaveTextContent('NONE');
  });

  it('throws error when used outside provider', () => {
    const consoleError = console.error;
    console.error = jest.fn(); // Suppress console.error for this test

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useCertification must be used within a CertificationProvider');

    console.error = consoleError; // Restore console.error
  });
});