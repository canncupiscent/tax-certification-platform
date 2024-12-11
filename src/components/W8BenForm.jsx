 of a trade or business in the United States</li>
                    <li>The beneficial owner is a resident of the treaty country listed above</li>
                    <li>The beneficial owner meets all provisions of the treaty that are necessary to claim a reduced rate of withholding</li>
                  </ul>
                </div>

                <div>
                  <Label htmlFor="certificationDate">Date of Certification</Label>
                  <Input
                    id="certificationDate"
                    name="certificationDate"
                    type="date"
                    value={formData.certificationDate}
                    onChange={handleInputChange}
                    className={errors.certificationDate ? 'border-red-500' : ''}
                  />
                  {errors.certificationDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.certificationDate}</p>
                  )}
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
                  Submit and Continue to CRS
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default W8BenForm;