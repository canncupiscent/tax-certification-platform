import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/router';

const StatusDashboard = ({ certificationStatus }) => {
  const router = useRouter();

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'EXPIRED':
        return {
          title: 'Recertification Required',
          description: 'Your tax certification has expired. Please complete the recertification process.',
          action: 'Start Recertification',
          alertVariant: 'destructive'
        };
      case 'NONE':
        return {
          title: 'Certification Required',
          description: 'Please complete your initial tax certification.',
          action: 'Start Certification',
          alertVariant: 'warning'
        };
      case 'VALID':
        return {
          title: 'Certification Valid',
          description: 'Your tax certification is current and valid.',
          action: 'View Details',
          alertVariant: 'success'
        };
      default:
        return {
          title: 'Status Unknown',
          description: 'Unable to determine certification status.',
          action: 'Contact Support',
          alertVariant: 'default'
        };
    }
  };

  const handleAction = () => {
    if (certificationStatus !== 'VALID') {
      router.push('/certification/residency-check');
    } else {
      router.push('/certification/details');
    }
  };

  const status = getStatusDisplay(certificationStatus);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Tax Certification Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant={status.alertVariant} className="mb-6">
            <AlertTitle>{status.title}</AlertTitle>
            <AlertDescription>{status.description}</AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold">Current Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">FATCA Status</p>
                  <p className="font-medium">{certificationStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">CRS Status</p>
                  <p className="font-medium">{certificationStatus}</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleAction}
              className="w-full"
              variant={certificationStatus === 'VALID' ? 'outline' : 'default'}
            >
              {status.action}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusDashboard;