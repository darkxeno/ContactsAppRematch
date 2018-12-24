import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import FormTextField from "../../components/FormTextField";
import validate from "./form-validations";
import { Subscribe } from 'bey';
import GroupsState from '../../state/groups/';
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

class CreateOrEditGroupPage extends Component {
  componentDidMount() {    
    const id = this.props.match.params.id;
    if(id){
      GroupsState.actions.loadData(id);
    }    
  }
  componentWillReceiveProps(nextProps) {
    const { match: { params } } = this.props;
    if (params.id !== nextProps.match.params.id) {
      GroupsState.actions.loadData(nextProps.match.params.id);
    }
  }
  render() {
    return (
      <Subscribe to={GroupsState.state}>
        {contacts => {
          return (
            <Form
              onSubmit={GroupsState.actions.saveGroup}
              validate={validate}
              initialValues={contacts.current}
              render={({ handleSubmit, pristine, invalid, submitting, reset }) => (            
              <form style={styles.formContainer} onSubmit={handleSubmit}>            
                <Field
                  name="name"
                  label="Name"
                  placeholder="Name"
                  component={FormTextField}
                />
                <div>
                  <RaisedButton
                    style={styles.buttonStyle}
                    label="Save group"
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


export default CreateOrEditGroupPage;
