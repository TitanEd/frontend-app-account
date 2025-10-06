/* eslint-disable react/prop-types */
import React from 'react';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import CustomAccountSettingsDisplay from './src/account-settings/CustomAccountSettingsDisplay';
import CustomEmailFieldDisplay from './src/account-settings/CustomEmailFieldDisplay';
import CustomEmailFieldBtns from './src/account-settings/CustomEmailFieldBtns';
import CustomEditableSelectField from './src/account-settings/CustomEditableSelectField';
import CustomEditableSelectFieldBtns from './src/account-settings/CustomEditableSelectFieldBtns';
import CustomEditableFieldBtns from './src/account-settings/CustomEditableFieldBtns';
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
    email_field_buttons: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'email_field_buttons',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => (
              <CustomEmailFieldBtns {...props} />
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
    editable_select_field_buttons: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'editable_select_field_buttons',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => (
              <CustomEditableSelectFieldBtns {...props} />
            ),
          },
        },
      ],
    },
    editable_field_buttons: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'editable_field_buttons',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => (
              <CustomEditableFieldBtns {...props} />
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
