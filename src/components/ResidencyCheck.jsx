import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';

const ResidencyCheck = () => {
  const router = useRouter();
  const [residencyStatus, setResidencyStatus] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!residencyStatus) {
      setError('Please select your US residency status');
      return;
    }

    // Route to appropriate form based on residency status
    if (residencyStatus === 'us_resident') {
      router.push('/certification/w9-form');
    } else {
      router.push('/certification/w8-form');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>US Residency Status</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Please confirm your US tax residency status:</h3>
              
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <p className="text-sm text-blue-800">
                  You are generally considered a U.S. resident for tax purposes if you:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-blue-800">
                  <li>Are a U.S. citizen or green card holder</li>
                  <li>Meet the substantial presence test</li>
                  <li>Choose to be treated as a U.S. resident</li>
                </ul>
              </div>

              <RadioGroup
                value={residencyStatus}
                onValueChange={setResidencyStatus}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="us_resident" id="us_resident" />
                  <Label htmlFor="us_resident">
                    Yes, I am a U.S. resident for tax purposes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non_us_resident" id="non_us_resident" />
                  <Label htmlFor="non_us_resident">
                    No, I am not a U.S. resident for tax purposes
                  </Label>
                </div>
              </RadioGroup>

              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button type="submit">
                Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidencyCheck;