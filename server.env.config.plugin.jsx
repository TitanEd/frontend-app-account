from tutor import hooks
from tutormfe.hooks import PLUGIN_SLOTS


hooks.Filters.ENV_PATCHES.add_item(
     (
         "mfe-env-config-runtime-definitions-account",
         """
        // This file contains configuration for plugins and environment variables.
const { React } = await import('react');
const { PLUGIN_OPERATIONS, DIRECT_PLUGIN } = await import('@openedx/frontend-plugin-framework');
const { default: CustomAccountSettingsDisplay} = await import('./src/account-settings/CustomAccountSettingsDisplay');
const { default: CustomEmailFieldDisplay} = await import('./src/account-settings/CustomEmailFieldDisplay');
const { default: CustomEmailFieldBtns} = await import('./src/account-settings/CustomEmailFieldBtns');
const { default: CustomEditableSelectField} = await import('./src/account-settings/CustomEditableSelectField');
const { default: CustomEditableSelectFieldBtns} = await import('./src/account-settings/CustomEditableSelectFieldBtns');
const { default: CustomEditableFieldBtns} = await import('./src/account-settings/CustomEditableFieldBtns');
const { default: CustomJumpNav} = await import('./src/account-settings/CustomJumpNav');

{% raw %}

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
              RenderWidget: (props) => <CustomAccountSettingsDisplay {...props} />,
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
              RenderWidget: (props) => <CustomEmailFieldDisplay {...props} />,
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
              RenderWidget: (props) => <CustomEditableSelectField {...props} />,
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
              RenderWidget: (props) => <CustomJumpNav {...props} />,
            },
          },
        ],
    },
  };
};

// Load environment variables from .env file
config.pluginSlots = getPluginSlots();

{% endraw %}
"""
     ))

