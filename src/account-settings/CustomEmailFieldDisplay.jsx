/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@openedx/paragon';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomEmailFieldDisplay = ({
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
);

CustomEmailFieldDisplay.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  isEditable: PropTypes.bool,
  handleEdit: PropTypes.func,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  messages: PropTypes.object,
  renderValue: PropTypes.func,
  renderConfirmationMessage: PropTypes.func,
  helpText: PropTypes.node,
};

CustomEmailFieldDisplay.defaultProps = {
  label: undefined,
  isEditable: true,
  handleEdit: () => {},
  messages: {},
  renderValue: () => null,
  renderConfirmationMessage: () => null,
  helpText: undefined,
};

export default CustomEmailFieldDisplay;
