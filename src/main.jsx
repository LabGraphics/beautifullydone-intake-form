import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './styles/global.css';

import Step1_EventDetails from './sections/Step1_EventDetails';
import Step2_Location from './sections/Step2_Location';
import Step3_Services from './sections/Step3_Services';
import Step4_Rentals from './sections/Step4_Rentals';
import Step5_Vendors from './sections/Step5_Vendors';
import Step6_Budget from './sections/Step6_Budget';
import Step7_ContactInfo from './sections/Step7_ContactInfo';
import Step8_FinalNotes from './sections/Step8_FinalNotes';
import SummaryScreen from './sections/SummaryScreen';
import ConfirmationScreen from './sections/ConfirmationScreen';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/step1" replace />} />
          <Route path="step1" element={<Step1_EventDetails />} />
          <Route path="step2" element={<Step2_Location />} />
          <Route path="step3" element={<Step3_Services />} />
          <Route path="step4" element={<Step4_Rentals />} />
          <Route path="step5" element={<Step5_Vendors />} />
          <Route path="step6" element={<Step6_Budget />} />
          <Route path="step7" element={<Step7_ContactInfo />} />
          <Route path="step8" element={<Step8_FinalNotes />} />
          <Route path="summary" element={<SummaryScreen />} />
          <Route path="confirmation" element={<ConfirmationScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
