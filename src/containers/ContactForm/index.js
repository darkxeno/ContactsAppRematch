import React, { useCallback } from 'react';
import { Subscribe } from 'bey';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Form, Field, FormSpy } from 'react-final-form';
import {
  Button, Card, Elevation,
} from '@blueprintjs/core';
import FormTextField from '../../components/FormTextField';
import FormMultiSelectField from '../../components/FormMultiSelectField';
import ModifiedCheckAlert from '../../components/ModifiedCheckAlert';
import validate from './form-validations';
import { actions as ContactsActions, selectors, state as ContactsState } from '../../state/contacts';
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

function CreateOrEditContactPage({
  classes, route,
}) {
  const isContactModified = useCallback(() => ContactsState.get().modified);

  return (
    <ModifiedCheckAlert
      isModified={isContactModified}
      routesToBlock={[ROUTES.ADD_CONTACT, ROUTES.EDIT_CONTACT]}
    >
      <Subscribe to={ContactsState} on={selectors.contactForm}>
        {(contacts) => (
          <Form
            onSubmit={ContactsActions.saveContact}
            validate={validate}
            initialValues={route.params.id ? contacts.current : {}}
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
                      ContactsActions.setModified(dirty && !submitting);
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
    </ModifiedCheckAlert>
  );
}

CreateOrEditContactPage.propTypes = {
  route: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(CreateOrEditContactPage);
