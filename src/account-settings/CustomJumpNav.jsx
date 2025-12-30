/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@openedx/paragon';
import Scrollspy from 'react-scrollspy';
import { Link } from 'react-router-dom';
import { OpenInNew } from '@openedx/paragon/icons';
import classNames from 'classnames';

const CustomJumpNav = ({
  intl,
  stickToTop,
  showPreferences,
  messages,
  getConfig,
}) => {
  const [activeSection, setActiveSection] = React.useState('basic-information');

  const handleButtonClick = (sectionId) => {
    setActiveSection(sectionId);

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);

      if (element) {
        // Find the main content container - this is the actual scrollable element
        const mainContent = document.querySelector('.main-content');

        if (mainContent) {
          // Calculate scroll position within the container
          const currentScrollTop = mainContent.scrollTop;
          const elementTop = element.offsetTop;

          // Calculate the target scroll position
          // For upward scrolling, we need to account for the current scroll position
          let targetScroll;

          if (elementTop < currentScrollTop) {
            // Scrolling UP - element is above current scroll position
            targetScroll = elementTop - 20; // 20px offset for comfort
          } else {
            // Scrolling DOWN - element is below current scroll position
            targetScroll = elementTop - 20; // 20px offset for comfort
          }

          // Scroll the main content container to the target position
          mainContent.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: 'smooth',
          });
        } else {
          // Fallback to window scroll if main content container not found
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: Math.max(0, elementPosition),
            behavior: 'smooth',
          });
        }
      } else {
        // Alternative approach: scroll to approximate position
        const sections = ['basic-information', 'profile-information', 'social-media', 'site-preferences', 'linked-accounts', 'delete-account'];
        const sectionIndex = sections.indexOf(sectionId);
        if (sectionIndex !== -1) {
          const approximatePosition = sectionIndex * 800; // Increased estimate
          window.scrollTo({
            top: Math.max(0, approximatePosition - 120),
            behavior: 'smooth',
          });
        }
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

  return (
    <div className={classNames('jump-nav px-2.25', { 'jump-nav-sm position-sticky pt-3': stickToTop })}>
      <Scrollspy
        items={[
          'basic-information',
          'profile-information',
          'social-media',
          'site-preferences',
          'linked-accounts',
          'delete-account',
        ]}
        className="list-unstyled"
        currentClassName="font-weight-bold"
      >
        <li>
          <Button
            variant={activeSection === 'basic-information' ? 'primary' : 'tertiary'}
            className="w-100 mb-2"
            onClick={() => handleButtonClick('basic-information')}
          >
            {intl.formatMessage(messages['account.settings.section.account.information'])}
          </Button>
        </li>
        <li>
          <Button
            variant={activeSection === 'profile-information' ? 'primary' : 'tertiary'}
            className="w-100 mb-2"
            onClick={() => handleButtonClick('profile-information')}
          >
            {intl.formatMessage(messages['account.settings.section.profile.information'])}
          </Button>
        </li>
        <li>
          <Button
            variant={activeSection === 'social-media' ? 'primary' : 'tertiary'}
            className="w-100 mb-2"
            onClick={() => handleButtonClick('social-media')}
          >
            {intl.formatMessage(messages['account.settings.section.social.media'])}
          </Button>
        </li>
        <li>
          <Button
            variant={activeSection === 'site-preferences' ? 'primary' : 'tertiary'}
            className="w-100 mb-2"
            onClick={() => handleButtonClick('site-preferences')}
          >
            {intl.formatMessage(messages['account.settings.section.site.preferences'])}
          </Button>
        </li>
        <li>
          <Button
            variant={activeSection === 'linked-accounts' ? 'primary' : 'tertiary'}
            className="w-100 mb-2"
            onClick={() => handleButtonClick('linked-accounts')}
          >
            {intl.formatMessage(messages['account.settings.section.linked.accounts'])}
          </Button>
        </li>
        {getConfig().ENABLE_ACCOUNT_DELETION
          && (
          <li>
            <Button
              variant={activeSection === 'delete-account' ? 'primary' : 'tertiary'}
              className="w-100 mb-2"
              onClick={() => handleButtonClick('delete-account')}
            >
              {intl.formatMessage(messages['account.settings.jump.nav.delete.account'])}
            </Button>
          </li>
          )}
      </Scrollspy>
      {showPreferences && (
      <>
        <hr />
        <Scrollspy
          className="list-unstyled"
        >
          <li>
            <Link to="/notifications" target="_blank" rel="noopener noreferrer">
              <span>{intl.formatMessage(messages['notification.preferences.notifications.label'])}</span>
              <Icon className="d-inline-block align-bottom ml-1" src={OpenInNew} />
            </Link>
          </li>
        </Scrollspy>
      </>
      )}
    </div>
  );
};

CustomJumpNav.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  stickToTop: PropTypes.bool.isRequired,
  showPreferences: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    'account.settings.section.account.information': PropTypes.string.isRequired,
    'account.settings.section.profile.information': PropTypes.string.isRequired,
    'account.settings.section.social.media': PropTypes.string.isRequired,
    'account.settings.section.site.preferences': PropTypes.string.isRequired,
    'account.settings.section.linked.accounts': PropTypes.string.isRequired,
    'account.settings.jump.nav.delete.account': PropTypes.string.isRequired,
    'notification.preferences.notifications.label': PropTypes.string.isRequired,
  }).isRequired,
  getConfig: PropTypes.func.isRequired,
};

export default CustomJumpNav;
