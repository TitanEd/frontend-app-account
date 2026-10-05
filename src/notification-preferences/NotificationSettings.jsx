import React from 'react';
import { useSelector } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink } from '@openedx/paragon';

import { selectShowPreferences } from './data/selectors';
import messages from './messages';
import NotificationPreferences from './NotificationPreferences';
import { useFeedbackWrapper } from '../hooks';

const NotificationSettings = () => {
  useFeedbackWrapper();
  const intl = useIntl();
  const showPreferences = useSelector(selectShowPreferences());

  return (
    showPreferences && (
      <div className="notification-preferences">
        <h2 className="section-heading h4 mb-3">
          {intl.formatMessage(messages.notificationHeading)}
        </h2>
        <hr className="customHr" />
        <p className="notification-section-description">
          {intl.formatMessage(messages.notificationCadenceDescription, {
            dailyTime: '17:00 UTC', weeklyTime: '17:00 UTC',
          })}
        </p>
        <p className="notification-section-description">
          {intl.formatMessage(messages.notificationPreferenceGuideBody)}
          <Hyperlink
            destination="https://edx.readthedocs.io/projects/open-edx-learner-guide/en/latest/sfd_notifications/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-underline ml-1"
          >
            {intl.formatMessage(messages.notificationPreferenceGuideLink)}
          </Hyperlink>
        </p>
        <NotificationPreferences />
      </div>
    )
  );
};

export default NotificationSettings;
