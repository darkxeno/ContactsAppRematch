import React, { Component } from 'react';
import { Subscribe } from 'bey';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Form, Field, FormSpy } from 'react-final-form';
import { Button, Alert, Card, Elevation } from '@blueprintjs/core';
import FormTextField from '../../components/FormTextField';
import FormMultiSelectField from '../../components/FormMultiSelectField';
import validate from './form-validations';
import { actions, selectors, state } from '../../state/contacts/';
import { ROUTES } from '../../router/routes';

const styles = {
  formCard: {
    width: '300px',
    margin: '0.5em 1em',
    padding: '1em',
  },
  formContainer: {
    paddingTop: '16px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class CreateOrEditContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = { alertIsOpen: false };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.route.params;
    if (id) {
      actions.loadData(id);
    }
    if (this.props.router) {
      // eslint-disable-next-line no-unused-vars
      const canDeactivate = (router) => (toState, fromState) => {
        const isContactModified = state.get().modified;
        if (isContactModified) {
          return new Promise((resolve, reject) => {
            this.setState({ alertIsOpen: true, continue: reject, cancel: resolve });
          });
        }
        return true;
      };
      this.props.router.canDeactivate(ROUTES.ADD_CONTACT, canDeactivate);
      this.props.router.canDeactivate(ROUTES.EDIT_CONTACT, canDeactivate);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.route.params.id !== nextProps.route.params.id) {
      actions.loadData(nextProps.route.params.id);
    }
  }
  handleCancel() {
    this.state.continue();
    this.setState({ alertIsOpen: false });
  }
  handleContinue() {
    this.state.cancel();
    this.setState({ alertIsOpen: false });
  }
  render() {
    const { alertIsOpen } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Alert
          cancelButtonText="Cancel"
          confirmButtonText="Continue"
          icon="trash"
          intent="danger"
          isOpen={alertIsOpen}
          onCancel={this.handleCancel}
          onConfirm={this.handleContinue}
        >
          <p>Are you sure you want leave? Your changes will be lost.</p>
        </Alert>
        <Subscribe to={state} on={selectors.contactList}>
          {(contacts) => (
            <Form
              onSubmit={actions.saveContact}
              validate={validate}
              initialValues={this.props.route.params.id ? contacts.current : {}}
              render={({
                handleSubmit, pristine, invalid, submitting, reset,
              }) => (
                <Card
                  interactive
                  elevation={Elevation.TWO}
                  className={classes.formCard}
                >
                  <form className={classes.formContainer} onSubmit={handleSubmit}>
                    <FormSpy
                      onChange={({ dirty }) => {
                        actions.setModified(dirty && !submitting);
                      }}
                    />
                    <Field
                      name="name"
                      label="Name"
                      placeholder="Name"
                      component={FormTextField}
                    />
                    <Field
                      name="email"
                      label="Email"
                      placeholder="Email"
                      component={FormTextField}
                    />
                    <Field
                      name="phoneNumber"
                      label="Phone number"
                      placeholder="Phone number"
                      component={FormTextField}
                    />
                    <Field
                      name="imgUrl"
                      label="Profile image url"
                      placeholder="Profile image url"
                      component={FormTextField}
                    />
                    <Field
                      name="groups"
                      component={FormMultiSelectField}
                      label="Groups"
                      options={Object.values(contacts.groups).map((group) => ({
                        value: group.id,
                        text: group.name,
                      }))}
                    />
                    <div className={classes.buttonsContainer}>
                      <Button
                        text="Save contact"
                        icon="floppy-disk"
                        intent="success"
                        type="submit"
                        disabled={pristine || submitting || invalid}
                      />
                      <Button
                        text="Reset values"
                        disabled={pristine || submitting}
                        icon="refresh"
                        intent="danger"
                        onClick={reset}
                      />
                    </div>
                  </form>
                </Card>
              )}
            />
          )}
        </Subscribe>
      </div>
    );
  }
}

CreateOrEditContactPage.propTypes = {
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(CreateOrEditContactPage);
