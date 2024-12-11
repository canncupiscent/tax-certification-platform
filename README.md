# Tax Certification Platform

A comprehensive web application for managing FATCA and CRS tax certifications, built with Next.js, React, and Tailwind CSS.

## Features

- Dynamic form routing based on US residency status
- Support for W-9 (US residents) and W-8BEN (non-US residents) forms
- CRS (Common Reporting Standard) certification
- Multi-step form process with validation
- Real-time form validation
- Certification status tracking
- Mobile-responsive design
- Accessible UI components

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/tax-certification-platform.git
cd tax-certification-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Testing

The project includes comprehensive test coverage using Jest and React Testing Library.

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate test coverage report:
```bash
npm run test:coverage
```

## Project Structure

```
src/
├── components/         # React components
│   ├── StatusDashboard.jsx
│   ├── ResidencyCheck.jsx
│   ├── W9Form.jsx
│   ├── W8BenForm.jsx
│   ├── CRSForm.jsx
│   └── CertificationConfirmation.jsx
├── context/           # React Context for state management
│   └── CertificationContext.jsx
├── pages/            # Next.js pages
│   └── certification/
│       ├── dashboard.js
│       ├── residency-check.js
│       ├── w9-form.js
│       ├── w8-form.js
│       ├── crs-form.js
│       └── confirmation.js
└── styles/           # Global styles
    └── globals.css
```

## Component Flow

1. **Status Dashboard**
   - Entry point for users
   - Displays current certification status
   - Initiates certification process

2. **Residency Check**
   - Determines US tax residency status
   - Routes to appropriate form (W-9 or W-8BEN)

3. **W-9 Form** (US Residents)
   - Collects US taxpayer information
   - Includes tax classification selection
   - TIN/SSN validation

4. **W-8BEN Form** (Non-US Residents)
   - Collects foreign taxpayer information
   - Tax treaty information
   - Foreign TIN collection

5. **CRS Form** (Non-US Residents)
   - Tax residency information
   - Multiple tax residency support
   - Additional declarations

6. **Certification Confirmation**
   - Confirmation of submission
   - Certification details
   - Download options

## State Management

The application uses React Context for state management through `CertificationContext`. This maintains:

- Current certification status
- Form data across steps
- User residency status
- Certification dates

## Testing Strategy

- Unit tests for all components
- Context provider testing
- Form validation testing
- User interaction testing
- Routing logic testing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.