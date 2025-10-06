/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, StatefulButton } from '@openedx/paragon';

const CustomEmailFieldBtns = ({
  saveState,
  handleCancel,
  intl,
  messages,
}) => (
  <p>
    <StatefulButton
      type="submit"
      className="mr-2"
      state={saveState}
      size="sm"
      labels={{
        default: intl.formatMessage(messages['account.settings.editable.field.action.save']),
      }}
      onClick={(e) => {
        // Swallow clicks if the state is pending.
        // We do this instead of disabling the button to prevent
        // it from losing focus (disabled elements cannot have focus).
        // Disabling it would causes upstream issues in focus management.
        // Swallowing the onSubmit event on the form would be better, but
        // we would have to add that logic for every field given our
        // current structure of the application.
        if (saveState === 'pending') { e.preventDefault(); }
      }}
      disabledStates={[]}
    />
    <Button
      variant="outline-primary"
      onClick={handleCancel}
      size="sm"
    >
      {intl.formatMessage(messages['account.settings.editable.field.action.cancel'])}
    </Button>
  </p>
);

CustomEmailFieldBtns.propTypes = {
  saveState: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  messages: PropTypes.object.isRequired,
};

export default CustomEmailFieldBtns;
