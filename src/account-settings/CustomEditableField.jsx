// Copy of EditableField.jsx for the custom UI: renders the custom display and Save / Cancel buttons.
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Form } from '@openedx/paragon';

import SwitchContent from './SwitchContent';
import messages from './AccountSettingsPage.messages';

import {
  openForm,
  closeForm,
} from './data/actions';
import { editableFieldSelector } from './data/selectors';
import CertificatePreference from './certificate-preference/CertificatePreference';
import CustomEditableFieldBtns from './CustomEditableFieldBtns';
import CustomAccountSettingsDisplay from './CustomAccountSettingsDisplay';

const CustomEditableField = (props) => {
  const {
    name,
    label,
    emptyLabel,
    type,
    value,
    userSuppliedValue,
    saveState,
    error,
    confirmationMessageDefinition,
    confirmationValue,
    helpText,
    onEdit,
    onCancel,
    onSubmit,
    onChange,
    isEditing,
    isEditable,
    isGrayedOut,
    ...others
  } = props;
  const id = `field-${name}`;
  const intl = useIntl();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, new FormData(e.target).get(name));
  };

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleEdit = () => {
    onEdit(name);
  };

  const handleCancel = () => {
    onCancel(name);
  };

  const renderEmptyLabel = () => {
    if (isEditable) {
      return <Button variant="link" onClick={handleEdit} className="p-0">{emptyLabel}</Button>;
    }
    return <span className="text-muted">{emptyLabel}</span>;
  };

  const renderValue = (rawValue) => {
    if (!rawValue) {
      return renderEmptyLabel();
    }
    let finalValue = rawValue;

    if (userSuppliedValue) {
      finalValue += `: ${userSuppliedValue}`;
    }

    return finalValue;
  };

  const renderConfirmationMessage = () => {
    if (!confirmationMessageDefinition || !confirmationValue) {
      return null;
    }
    return (
      <span data-testid="editable-field-confirmation">
        {intl.formatMessage(confirmationMessageDefinition, {
          value: confirmationValue,
        })}
      </span>
    );
  };

  return (
    <SwitchContent
      expression={isEditing ? 'editing' : 'default'}
      cases={{
        editing: (
          <div className="editable-field-form-group">
            <form onSubmit={handleSubmit} data-testid="editable-field-form">
              <Form.Group
                controlId={id}
                isInvalid={error != null}
              >
                <Form.Label size="sm" className="h6 d-block" htmlFor={id}>{label}</Form.Label>
                <Form.Control
                  data-hj-suppress
                  name={name}
                  id={id}
                  type={type}
                  value={value}
                  onChange={handleChange}
                  data-testid="editable-field-textbox"
                  {...others}
                />
                {!!helpText && <Form.Text>{helpText}</Form.Text>}
                {error != null && <Form.Control.Feedback hasIcon={false} data-testid="editable-field-error">{error}</Form.Control.Feedback>}
                {others.children}
              </Form.Group>
              <CustomEditableFieldBtns
                saveState={saveState}
                handleCancel={handleCancel}
                intl={intl}
                messages={messages}
              />
            </form>
            {['name', 'verified_name'].includes(name) && (
              <CertificatePreference fieldName={name} data-testid="editable-field-certificate-preference" />
            )}
          </div>
        ),
        default: (
          <div className="form-group">
            <CustomAccountSettingsDisplay
              label={label}
              isEditable={isEditable}
              handleEdit={handleEdit}
              intl={intl}
              messages={messages}
              value={value}
              isGrayedOut={isGrayedOut}
              renderValue={renderValue}
              renderConfirmationMessage={renderConfirmationMessage}
              helpText={helpText}
            />
          </div>
        ),
      }}
    />
  );
};

CustomEditableField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  emptyLabel: PropTypes.node,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userSuppliedValue: PropTypes.string,
  saveState: PropTypes.oneOf(['default', 'pending', 'complete', 'error']),
  error: PropTypes.string,
  confirmationMessageDefinition: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  confirmationValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  helpText: PropTypes.node,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  isEditable: PropTypes.bool,
  isGrayedOut: PropTypes.bool,
};

CustomEditableField.defaultProps = {
  value: undefined,
  saveState: undefined,
  label: undefined,
  emptyLabel: undefined,
  error: undefined,
  confirmationMessageDefinition: undefined,
  confirmationValue: undefined,
  helpText: undefined,
  isEditing: false,
  isEditable: true,
  isGrayedOut: false,
  userSuppliedValue: undefined,
};

export default connect(editableFieldSelector, {
  onEdit: openForm,
  onCancel: closeForm,
})(CustomEditableField);
