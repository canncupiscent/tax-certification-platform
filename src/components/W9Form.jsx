import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/router';

const W9Form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    taxClassification: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    tin: '',
    tinType: 'ssn',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    if (!formData.tin.trim()) {
      newErrors.tin = 'Tax Identification Number is required';
    } else if (formData.tinType === 'ssn' && !/^\d{3}-?\d{2}-?\d{4}$/.test(formData.tin)) {
      newErrors.tin = 'Invalid SSN format';
    } else if (formData.tinType === 'ein' && !/^\d{2}-?\d{7}$/.test(formData.tin)) {
      newErrors.tin = 'Invalid EIN format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      router.push('/certification/confirmation');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit form. Please try again.'
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Form W-9: Request for Taxpayer Identification Number</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <Alert variant="destructive">
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name (as shown on your tax return)</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="businessName">Business name (if different)</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Tax Classification</Label>
                <RadioGroup
                  value={formData.taxClassification}
                  onValueChange={(value) => handleInputChange({
                    target: { name: 'taxClassification', value }
                  })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual/Sole proprietor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ccorp" id="ccorp" />
                    <Label htmlFor="ccorp">C Corporation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scorp" id="scorp" />
                    <Label htmlFor="scorp">S Corporation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partnership" id="partnership" />
                    <Label htmlFor="partnership">Partnership</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trust" id="trust" />
                    <Label htmlFor="trust">Trust/Estate</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'border-red-500' : ''}
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Taxpayer Identification Number Type</Label>
                <RadioGroup
                  value={formData.tinType}
                  onValueChange={(value) => handleInputChange({
                    target: { name: 'tinType', value }
                  })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ssn" id="ssn" />
                    <Label htmlFor="ssn">Social Security Number (SSN)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ein" id="ein" />
                    <Label htmlFor="ein">Employer Identification Number (EIN)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="tin">
                  {formData.tinType === 'ssn' ? 'Social Security Number' : 'Employer Identification Number'}
                </Label>
                <Input
                  id="tin"
                  name="tin"
                  value={formData.tin}
                  onChange={handleInputChange}
                  placeholder={formData.tinType === 'ssn' ? '123-45-6789' : '12-3456789'}
                  className={errors.tin ? 'border-red-500' : ''}
                />
                {errors.tin && <p className="text-red-500 text-sm mt-1">{errors.tin}</p>}
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button type="submit">
                Submit Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default W9Form;