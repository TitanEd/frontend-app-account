/* eslint-disable react/prop-types */
import React from 'react';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { Button } from '@openedx/paragon';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

const config = {
  ...process.env,
  pluginSlots: {
    account_settings_display_fields: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'account_settings_display_fields',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: ({
              label,
              isEditable,
              handleEdit,
              intl,
              messages,
              value,
              isGrayedOut,
              renderValue,
              renderConfirmationMessage,
              helpText,
            }) => (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex">
                    <h6 aria-level="3" className="form-group-label">{label}</h6>
                  </div>
                  <p data-hj-suppress className={`form-group-value ${classNames('text-truncate', { 'grayed-out': isGrayedOut })}`}>
                    {renderValue(value)}
                  </p>
                  <p className="small text-muted mt-n2">
                    {renderConfirmationMessage() || helpText}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  {isEditable ? (
                    <Button variant="outline-primary" size="sm" onClick={handleEdit} className="ml-3">
                      <FontAwesomeIcon className="mr-1" icon={faPencilAlt} />
                      {intl.formatMessage(messages['account.settings.editable.field.action.edit'])}
                    </Button>
                  ) : null}
                </div>
              </div>
            ),
          },
        },
      ],
    },
    email_field_display: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'email_field_display',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: ({
              label,
              isEditable,
              handleEdit,
              intl,
              messages,
              renderValue,
              renderConfirmationMessage,
              helpText,
            }) => (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex">
                    <h6 aria-level="3" className="form-group-label">{label}</h6>
                  </div>
                  <p data-hj-suppress className="form-group-value">
                    {renderValue()}
                  </p>
                  {renderConfirmationMessage() || <p className="small text-muted mt-n2">{helpText}</p>}
                </div>
                <div className="d-flex align-items-center">
                  {isEditable ? (
                    <Button variant="outline-primary" size="sm" onClick={handleEdit} className="ml-3">
                      <FontAwesomeIcon className="mr-1" icon={faPencilAlt} />
                      {intl.formatMessage(messages['account.settings.editable.field.action.edit'])}
                    </Button>
                  ) : null}
                </div>
              </div>
            ),
          },
        },
      ],
    },
    editable_select_field_display: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'editable_select_field_display',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: ({
              label,
              isEditable,
              handleEdit,
              intl,
              messages,
              value,
              isGrayedOut,
              renderValue,
              renderConfirmationMessage,
              helpText,
            }) => (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex">
                    <h6 aria-level="3" className="form-group-label">{label}</h6>
                  </div>
                  <p data-hj-suppress className={`form-group-value ${classNames('text-truncate', { 'grayed-out': isGrayedOut })}`}>
                    {renderValue(value)}
                  </p>
                  <p className="small text-muted mt-n2">
                    {renderConfirmationMessage() || helpText}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  {isEditable ? (
                    <Button variant="outline-primary" size="sm" onClick={handleEdit} className="ml-3">
                      <FontAwesomeIcon className="mr-1" icon={faPencilAlt} />
                      {intl.formatMessage(messages['account.settings.editable.field.action.edit'])}
                    </Button>
                  ) : null}
                </div>
              </div>
            ),
          },
        },
      ],
    },
    jump_nav_display: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'jump_nav_display',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: ({
              intl,
              stickToTop,
              showPreferences,
              messages,
              getConfig,
            }) => {
              const CustomJumpNav = React.lazy(() => import('./src/account-settings/CustomJumpNav'));
              return (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <CustomJumpNav
                    intl={intl}
                    stickToTop={stickToTop}
                    showPreferences={showPreferences}
                    messages={messages}
                    getConfig={getConfig}
                  />
                </React.Suspense>
              );
            },
          },
        },
      ],
    },
  },
};

export default config;
