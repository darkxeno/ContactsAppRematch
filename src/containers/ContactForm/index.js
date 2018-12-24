import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import FormTextField from "../../components/FormTextField";
import FormMultiSelectField from "../../components/FormMultiSelectField";
import validate from "./form-validations";
import { Subscribe } from 'bey';
import ContactsState from '../../state/contacts/';
import { Form, Field } from 'react-final-form';

const styles = {
  formContainer: {
    display: "flex",
    flex: "0 0 auto",
    alignItems: "center",
    flexDirection: "column"
  },
  buttonStyle: {
    margin: "2em 0 0 1em"
  }
};

class CreateOrEditContactPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if(id){
      ContactsState.actions.loadData(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      match: { params }
    } = this.props;
    if (params.id !== nextProps.match.params.id) {
      ContactsState.actions.loadData(nextProps.match.params.id);
    }
  }
  render() {
    return (
      <Subscribe to={ContactsState.state}>
        {contacts => {          
          return (
            <Form
              onSubmit={ContactsState.actions.saveContact}
              validate={validate}
              initialValues={ this.props.match.params.id ? contacts.current : {} }
              render={({ handleSubmit, pristine, invalid, submitting, reset }) => (            
              <form style={styles.formContainer} onSubmit={handleSubmit}>
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
                  options={
                    Object.values(contacts.groups).map(
                      group => ({ value:group.id, text:group.name })
                    )
                  }
                />
                <div>
                  <RaisedButton
                    style={styles.buttonStyle}
                    label="Save contact"
                    primary
                    type="submit"
                    disabled={pristine || submitting || invalid}
                  />
                  <RaisedButton
                    style={styles.buttonStyle}
                    label="Reset values"
                    secondary
                    disabled={pristine || submitting}
                    onClick={reset}
                  />
                </div>
              </form>
            )} />
        )}}
      </Subscribe>
    );
  }
}

export default CreateOrEditContactPage;
