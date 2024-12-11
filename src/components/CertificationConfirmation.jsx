import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { useCertification } from '@/context/CertificationContext';

const CertificationConfirmation = () => {
  const router = useRouter();
  const { certificationData } = useCertification();
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-center">Certification Complete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center text-gray-600">
              <p>Your tax certification has been successfully submitted and recorded.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm text-gray-500">Submission Date:</p>
                <p className="text-sm font-medium">
                  {formatDate(certificationData.lastCertificationDate)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm text-gray-500">Valid Until:</p>
                <p className="text-sm font-medium">
                  {formatDate(certificationData.expirationDate)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm text-gray-500">Certification Type:</p>
                <p className="text-sm font-medium">
                  {certificationData.isUSResident ? 'W-9' : 'W-8BEN & CRS'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm text-gray-500">Status:</p>
                <p className="text-sm font-medium text-green-600">
                  Valid
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">Important Information</h3>
              <ul className="list-disc pl-5 text-sm text-blue-800 space-y-1">
                <li>Your certification is valid for 3 years from the submission date</li>
                <li>You must recertify if your circumstances change</li>
                <li>We will notify you when recertification is required</li>
                <li>You can view your certification status anytime from the dashboard</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.push('/certification/dashboard')}
                className="w-full"
              >
                Return to Dashboard
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  // Here you would typically implement the download functionality
                  // This could be a PDF generation of the submitted forms
                  alert('Download functionality would be implemented here');
                }}
                className="w-full"
              >
                Download Certification
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificationConfirmation;