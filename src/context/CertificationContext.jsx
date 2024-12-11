import React, { createContext, useContext, useState } from 'react';

const CertificationContext = createContext(undefined);

export function CertificationProvider({ children }) {
  const [certificationData, setCertificationData] = useState({
    // User Status
    status: 'NONE', // 'NONE', 'VALID', 'EXPIRED'
    lastCertificationDate: null,
    expirationDate: null,
    
    // Residency Information
    isUSResident: null,
    
    // W9 Form Data
    w9Data: {
      name: '',
      businessName: '',
      taxClassification: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      tin: '',
      tinType: 'ssn',
    },
    
    // W8-BEN Form Data
    w8BenData: {
      name: '',
      countryOfCitizenship: '',
      permanentAddress: '',
      city: '',
      country: '',
      mailingAddress: '',
      mailingCity: '',
      mailingCountry: '',
      foreignTaxId: '',
      dateOfBirth: '',
      taxTreatyCountry: '',
      taxTreatyArticle: '',
      taxTreatyRate: '',
      incomeType: '',
      certificationDate: '',
    },
    
    // CRS Data
    crsData: {
      title: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      placeOfBirth: '',
      currentResidenceAddress: '',
      city: '',
      country: '',
      postalCode: '',
      taxResidencyCountries: [],
      tinNumbers: {},
      noTinReasons: {},
      occupation: '',
      sourceOfWealth: [],
      isControllingPerson: false,
      isPEP: false,
      hasUSGreenCard: false,
    },
  });

  const updateW9Data = (data) => {
    setCertificationData(prev => ({
      ...prev,
      w9Data: {
        ...prev.w9Data,
        ...data
      }
    }));
  };

  const updateW8BenData = (data) => {
    setCertificationData(prev => ({
      ...prev,
      w8BenData: {
        ...prev.w8BenData,
        ...data
      }
    }));
  };

  const updateCRSData = (data) => {
    setCertificationData(prev => ({
      ...prev,
      crsData: {
        ...prev.crsData,
        ...data
      }
    }));
  };

  const setResidencyStatus = (isUSResident) => {
    setCertificationData(prev => ({
      ...prev,
      isUSResident
    }));
  };

  const completeCertification = () => {
    const currentDate = new Date();
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 3);

    setCertificationData(prev => ({
      ...prev,
      status: 'VALID',
      lastCertificationDate: currentDate,
      expirationDate
    }));
  };

  const resetCertification = () => {
    setCertificationData({
      status: 'NONE',
      lastCertificationDate: null,
      expirationDate: null,
      isUSResident: null,
      w9Data: {
        name: '',
        businessName: '',
        taxClassification: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        tin: '',
        tinType: 'ssn',
      },
      w8BenData: {
        name: '',
        countryOfCitizenship: '',
        permanentAddress: '',
        city: '',
        country: '',
        mailingAddress: '',
        mailingCity: '',
        mailingCountry: '',
        foreignTaxId: '',
        dateOfBirth: '',
        taxTreatyCountry: '',
        taxTreatyArticle: '',
        taxTreatyRate: '',
        incomeType: '',
        certificationDate: '',
      },
      crsData: {
        title: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        currentResidenceAddress: '',
        city: '',
        country: '',
        postalCode: '',
        taxResidencyCountries: [],
        tinNumbers: {},
        noTinReasons: {},
        occupation: '',
        sourceOfWealth: [],
        isControllingPerson: false,
        isPEP: false,
        hasUSGreenCard: false,
      },
    });
  };

  return (
    <CertificationContext.Provider
      value={{
        certificationData,
        updateW9Data,
        updateW8BenData,
        updateCRSData,
        setResidencyStatus,
        completeCertification,
        resetCertification
      }}
    >
      {children}
    </CertificationContext.Provider>
  );
}

export function useCertification() {
  const context = useContext(CertificationContext);
  if (context === undefined) {
    throw new Error('useCertification must be used within a CertificationProvider');
  }
  return context;
}