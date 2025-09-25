/* eslint-disable react/prop-types */
import React from 'react';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import CustomAccountSettingsDisplay from './src/account-settings/CustomAccountSettingsDisplay';
import CustomEmailFieldDisplay from './src/account-settings/CustomEmailFieldDisplay';
import CustomEditableSelectField from './src/account-settings/CustomEditableSelectField';
import CustomJumpNav from './src/account-settings/CustomJumpNav';

const getPluginSlots = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('oldUI') === 'true') {
    return {};
  }

  return {
    account_settings_display_fields: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'account_settings_display_fields',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => (
              <CustomAccountSettingsDisplay {...props} />
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
            RenderWidget: (props) => (
              <CustomEmailFieldDisplay {...props} />
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
            RenderWidget: (props) => (
              <CustomEditableSelectField {...props} />
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
            RenderWidget: (props) => (
              <CustomJumpNav {...props} />
            ),
          },
        },
      ],
    },
  };
};

// Load environment variables from .env file
const config = {
  ...process.env,
  get pluginSlots() {
    return getPluginSlots();
  },
};

export default config;
