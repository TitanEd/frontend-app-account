/* eslint-disable no-console */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'formdata-polyfill';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import {
  subscribe, initialize, APP_INIT_ERROR, APP_READY, mergeConfig, getConfig,
} from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, Outlet } from 'react-router-dom';

import Header from '@edx/frontend-component-header';
import FooterSlot from '@openedx/frontend-slot-footer';

import { getMessages, IntlProvider } from '@edx/frontend-platform/i18n';
import configureStore from './data/configureStore';
import AccountSettingsPage, { NotFoundPage } from './account-settings';
import IdVerificationPageSlot from './plugin-slots/IdVerificationPageSlot';
import messages from './i18n';

import './index.scss';
// import 'titaned-lib/dist/index.css';
import Head from './head/Head';
import NotificationCourses from './notification-preferences/NotificationCourses';
import NotificationPreferences from './notification-preferences/NotificationPreferences';
import Layout from './Layout';
import { applyTheme } from './styles/themeLoader';
import { setUIPreference } from './services/uiPreferenceService';

// import './styles/styles-overrides.scss';

// Load styles only for new UI
const loadStylesForNewUI = (isOldUI) => {
  console.log('loadStylesForNewUI called with isOldUI:', isOldUI);
  document.body.className = isOldUI ? 'old-ui' : 'new-ui';
  document.documentElement.className = isOldUI ? 'old-ui' : 'new-ui';
  console.log('Body className set to:', document.body.className);
  console.log('Html className set to:', document.documentElement.className);

  if (!isOldUI) {
    console.log('Loading titaned-lib styles...');
    import('titaned-lib/dist/index.css');
    import('./styles/styles-overrides.scss');
  } else {
    console.log('Skipping titaned-lib styles for old UI');
    import('./styles/old-ui.scss');
  }
};

// Main App component with state management
const App = () => {
  const [oldUI, setOldUI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuConfig, setMenuConfig] = useState(null);
  console.log('oldUI in Index', oldUI);

  // Load UI preference and menu config in one API call to avoid race conditions
  useEffect(() => {
    const loadUIPreferenceAndMenuConfig = async () => {
      try {
        // First, load from localStorage for immediate display
        const localStorageValue = localStorage.getItem('oldUI') || 'false';
        console.log('Initial localStorage oldUI:', localStorageValue);
        setOldUI(localStorageValue);
        setLoading(false);

        // Then, fetch both UI preference and menu config in one API call
        console.log('Fetching menu config and UI preference...');
        const response = await getAuthenticatedHttpClient().get(`${getConfig().LMS_BASE_URL}/titaned/api/v1/menu-config/`);

        if (response.status === 200 && response.data) {
          console.log('Menu config:', response.data);
          setMenuConfig(response.data);

          // Extract UI preference from the same response
          const useNewUI = response.data.use_new_ui === true;
          const apiOldUIValue = !useNewUI ? 'true' : 'false';
          console.log('API returned use_new_ui:', useNewUI, 'API oldUI:', apiOldUIValue);

          // Check if API response matches localStorage
          if (localStorageValue !== apiOldUIValue) {
            console.log('Mismatch detected! localStorage:', localStorageValue, 'API:', apiOldUIValue);
            console.log('Updating localStorage and reloading page...');
            localStorage.setItem('oldUI', apiOldUIValue);
            // Reload page to re-run build-time config with correct localStorage
            window.location.reload();
            return;
          }

          console.log('localStorage and API are in sync, no reload needed');
        } else {
          console.warn('API failed, using localStorage value and default menu config');
          setMenuConfig({}); // Set empty object as fallback
        }
      } catch (error) {
        console.error('API call failed, using localStorage value and default menu config:', error);
        setMenuConfig({}); // Set empty object as fallback
      }
    };

    loadUIPreferenceAndMenuConfig();
  }, []);

  // Apply theme from JSON
  useEffect(() => {
    if (oldUI === 'false') {
      applyTheme(); // Load default theme from /theme.json
    }
  }, [oldUI]);

  useEffect(() => {
    // Only load styles after we know the UI preference
    if (oldUI !== null) {
      loadStylesForNewUI(oldUI === 'true');
    }
  }, [oldUI]);

  // Show loading screen while UI preference is being fetched
  if (loading || menuConfig === null) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        <div>Loading... Please wait...</div>
      </div>
    );
  }

  return (
    <AppProvider store={configureStore()}>
      <Head />
      <Routes>
        <Route element={oldUI === 'false' ? (
          <Layout />
        ) : (
          <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Header />
            <button
              type="button"
              onClick={async () => {
                try {
                  console.log('Switching to new UI...');
                  const success = await setUIPreference(true);
                  if (success) {
                    console.log('Successfully switched to new UI, reloading page...');
                    window.location.reload();
                  } else {
                    console.error('Failed to switch to new UI');
                  }
                } catch (error) {
                  console.error('Error switching to new UI:', error);
                }
              }}
              style={{
                position: 'absolute',
                top: '0.4rem',
                borderRadius: '6px',
                right: '20rem',
                zIndex: 9999,
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '10px',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                width: 'fit-content',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Switch to New UI
            </button>
            <main className="flex-grow-1" id="main">
              <Outlet />
            </main>
            <FooterSlot />
          </div>
        )}
        >
          <Route path="/notifications/:courseId" element={<NotificationPreferences />} />
          <Route path="/notifications" element={<NotificationCourses />} />
          <Route
            path="/id-verification/*"
            element={<IdVerificationPageSlot />}
          />
          <Route path="/" element={<AccountSettingsPage />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

subscribe(APP_READY, () => {
  ReactDOM.render(
    <IntlProvider locale={getConfig().language || 'en'} messages={getMessages()}>
      <App />
    </IntlProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        SUPPORT_URL: process.env.SUPPORT_URL,
        SHOW_EMAIL_CHANNEL: process.env.SHOW_EMAIL_CHANNEL || 'false',
        ENABLE_COPPA_COMPLIANCE: (process.env.ENABLE_COPPA_COMPLIANCE || false),
        ENABLE_ACCOUNT_DELETION: (process.env.ENABLE_ACCOUNT_DELETION !== 'false'),
        ENABLE_DOB_UPDATE: (process.env.ENABLE_DOB_UPDATE || false),
        MARKETING_EMAILS_OPT_IN: (process.env.MARKETING_EMAILS_OPT_IN || false),
        PASSWORD_RESET_SUPPORT_LINK: process.env.PASSWORD_RESET_SUPPORT_LINK,
        LEARNER_FEEDBACK_URL: process.env.LEARNER_FEEDBACK_URL,
      }, 'App loadConfig override handler');
    },
  },
});
