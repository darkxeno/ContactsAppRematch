import React, { Component } from 'react';
import FormTextField from '../../components/FormTextField';
import validate from './form-validations';
import { Subscribe } from 'bey';
import GroupsState from '../../state/groups/';
import { Form, Field } from 'react-final-form';
import { Button, Card, Elevation } from '@blueprintjs/core';

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
    const id = this.props.route.params.id;
    if (id) {
      GroupsState.actions.loadData(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.route.params.id !== nextProps.route.params.id) {
      GroupsState.actions.loadData(nextProps.route.params.id);
    }
  }
  render() {
    return (
      <Subscribe to={GroupsState.state}>
        {(contacts) => (
          <Form
            onSubmit={GroupsState.actions.saveGroup}
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

export default CreateOrEditGroupPage;
