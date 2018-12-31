import React, { Component } from 'react';
import { Subscribe } from 'bey';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Button, Card, Elevation } from '@blueprintjs/core';
import FormTextField from '../../components/FormTextField';
import validate from './form-validations';
import { actions as GroupActions, state as GroupState } from '../../state/groups/';


const styles = {
  formContainer: {
    paddingTop: '16px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class CreateOrEditGroupPage extends Component {
  componentDidMount() {
    const { id } = this.props.route.params;
    if (id) {
      GroupActions.loadData(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.route.params.id !== nextProps.route.params.id) {
      GroupActions.loadData(nextProps.route.params.id);
    }
  }
  render() {
    return (
      <Subscribe to={GroupState}>
        {(contacts) => (
          <Form
            onSubmit={GroupActions.saveGroup}
            validate={validate}
            initialValues={contacts.current}
            render={({
              handleSubmit, pristine, invalid, submitting, form: { reset },
            }) => (
              <Card
                interactive
                elevation={Elevation.TWO}
                style={{ width: '300px', margin: '0.5em 1em', padding: '1em' }}
              >
                <form style={styles.formContainer} onSubmit={handleSubmit}>
                  <Field name="name" label="Name" placeholder="Name" component={FormTextField} />
                  <div style={styles.buttonsContainer}>
                    <Button
                      icon="floppy-disk"
                      intent="success"
                      type="submit"
                      disabled={pristine || submitting || invalid}
                      text="Save group"
                    />
                    <Button
                      icon="refresh"
                      intent="danger"
                      onClick={reset}
                      disabled={pristine || submitting}
                      text="Reset values"
                    />
                  </div>
                </form>
              </Card>
            )}
          />
        )}
      </Subscribe>
    );
  }
}

CreateOrEditGroupPage.propTypes = {
  route: PropTypes.object.isRequired,
};

export default CreateOrEditGroupPage;
