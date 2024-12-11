 => {
                                const newNoTinReasons = { ...formData.noTinReasons };
                                newNoTinReasons[country] = value;
                                handleInputChange({
                                  target: {
                                    name: 'noTinReasons',
                                    value: newNoTinReasons
                                  }
                                });
                              }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select reason" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="reasonA">Country does not issue TINs</SelectItem>
                                  <SelectItem value="reasonB">Unable to obtain TIN</SelectItem>
                                  <SelectItem value="reasonC">No TIN required</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleTaxResidencyRemove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      {errors[`tin_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`tin_${index}`]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Occupation Information</Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="Current Occupation"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Source of Wealth</Label>
                  <Select
                    name="sourceOfWealth"
                    value={formData.sourceOfWealth}
                    onValueChange={(value) => handleInputChange({
                      target: { name: 'sourceOfWealth', value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary source of wealth" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employment">Employment Income</SelectItem>
                      <SelectItem value="business">Business Income</SelectItem>
                      <SelectItem value="investment">Investment Income</SelectItem>
                      <SelectItem value="inheritance">Inheritance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Additional Declarations</h3>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="isControllingPerson"
                      checked={formData.isControllingPerson}
                      onCheckedChange={() => handleCheckboxChange('isControllingPerson')}
                    />
                    <Label htmlFor="isControllingPerson" className="leading-tight">
                      I am a Controlling Person of an Entity
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="isPEP"
                      checked={formData.isPEP}
                      onCheckedChange={() => handleCheckboxChange('isPEP')}
                    />
                    <Label htmlFor="isPEP" className="leading-tight">
                      I am a Politically Exposed Person (PEP) or related to a PEP
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="hasUSGreenCard"
                      checked={formData.hasUSGreenCard}
                      onCheckedChange={() => handleCheckboxChange('hasUSGreenCard')}
                    />
                    <Label htmlFor="hasUSGreenCard" className="leading-tight">
                      I hold a U.S. Green Card
                    </Label>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Declaration and Signature</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    I declare that all statements made in this declaration are, to the best of my knowledge and belief, correct and complete.
                    I undertake to advise the financial institution within 30 days of any change in circumstances which affects the tax residency status
                    of the individual identified in this form or causes the information contained herein to become incorrect or incomplete,
                    and to provide the financial institution with a suitably updated self-certification and declaration within 90 days of such change
                    in circumstances.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit">
                  Submit Certification
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CRSForm;