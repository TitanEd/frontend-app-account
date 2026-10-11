import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getConfig as getPlatformConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, breakpoints, useWindowSize } from '@openedx/paragon';
import Scrollspy from 'react-scrollspy';
import classNames from 'classnames';

import { selectShowPreferences } from '../notification-preferences/data/selectors';
import accountSettingsMessages from './AccountSettingsPage.messages';

export const CustomJumpNav = ({
  intl,
  stickToTop,
  showPreferences,
  messages,
  getConfig,
}) => {
  const [activeSection, setActiveSection] = React.useState('basic-information');

  const focusSectionHeading = (sectionEl) => {
    const heading = sectionEl.querySelector('h2, h3, [role="heading"]') || sectionEl;
    if (!heading.hasAttribute('tabindex')) {
      heading.setAttribute('tabindex', '-1');
    }
    heading.focus({ preventScroll: true });
  };

  const handleButtonClick = (sectionId) => {
    setActiveSection(sectionId);

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);

      if (element) {
        // Find the main content container - this is the actual scrollable element
        const mainContent = document.querySelector('.main-content');
        const scrollOffset = 20;

        if (mainContent) {
          const targetScroll = element.offsetTop - scrollOffset;
          mainContent.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: 'smooth',
          });
        } else {
          // Fallback to window scroll if main content container not found
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight - scrollOffset;

          window.scrollTo({
            top: Math.max(0, elementPosition),
            behavior: 'smooth',
          });
        }
        focusSectionHeading(element);
      }
    });
  };

  // Update active section based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'basic-information',
        'profile-information',
        'social-media',
        'notifications',
        'site-preferences',
        'linked-accounts',
        'delete-account',
      ];

      // Get the main content container for scroll detection
      const mainContent = document.querySelector('.main-content');
      if (!mainContent) { return; }

      const scrollPosition = mainContent.scrollTop + 50; // Additional offset for better detection

      // Find the section that's currently in view
      let currentSection = 'basic-information';
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = sections[i];
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Initial call to set the correct active section
    handleScroll();

    // Listen to scroll events on the main content container
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }

    // Return empty cleanup function if no main content found
    return () => {};
  }, []);

  const sectionButton = (sectionId, messageKey) => {
    const isActive = activeSection === sectionId;
    return (
      <li key={sectionId}>
        <Button
          variant={isActive ? 'primary' : 'tertiary'}
          className="w-100 mb-2"
          onClick={() => handleButtonClick(sectionId)}
          aria-current={isActive ? 'true' : undefined}
        >
          {intl.formatMessage(messages[messageKey])}
        </Button>
      </li>
    );
  };

  return (
    <nav
      className={classNames('jump-nav px-2.25', { 'jump-nav-sm position-sticky pt-3': stickToTop })}
      aria-label={intl.formatMessage(messages['account.settings.jump.nav.aria.label'])}
    >
      <Scrollspy
        items={[
          'basic-information',
          'profile-information',
          'social-media',
          ...(showPreferences ? ['notifications'] : []),
          'site-preferences',
          'linked-accounts',
          'delete-account',
        ]}
        className="list-unstyled"
        currentClassName="font-weight-bold"
      >
        {sectionButton('basic-information', 'account.settings.section.account.information')}
        {sectionButton('profile-information', 'account.settings.section.profile.information')}
        {sectionButton('social-media', 'account.settings.section.social.media')}
        {showPreferences && sectionButton('notifications', 'notification.preferences.notifications.label')}
        {sectionButton('site-preferences', 'account.settings.section.site.preferences')}
        {sectionButton('linked-accounts', 'account.settings.section.linked.accounts')}
        {getConfig().ENABLE_ACCOUNT_DELETION
          && sectionButton('delete-account', 'account.settings.jump.nav.delete.account')}
      </Scrollspy>
    </nav>
  );
};

CustomJumpNav.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  stickToTop: PropTypes.bool.isRequired,
  showPreferences: PropTypes.bool.isRequired,
  messages: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  getConfig: PropTypes.func.isRequired,
};

/**
 * Jump navigation of the custom account settings page: gathers the same data
 * as the stock <JumpNav /> and renders <CustomJumpNav />.
 */
const CustomJumpNavContainer = () => {
  const intl = useIntl();
  const stickToTop = useWindowSize().width > breakpoints.small.minWidth;
  const showPreferences = useSelector(selectShowPreferences());

  return (
    <CustomJumpNav
      intl={intl}
      stickToTop={stickToTop}
      showPreferences={showPreferences}
      messages={accountSettingsMessages}
      getConfig={getPlatformConfig}
    />
  );
};

export default CustomJumpNavContainer;
