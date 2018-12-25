import React, { Component } from "react";
import FormTextField from "../../components/FormTextField";
import validate from "./form-validations";
import { Subscribe } from 'bey';
import GroupsState from '../../state/groups/';
import { Form, Field } from 'react-final-form';
import { Button } from "@blueprintjs/core";

const styles = {
  formContainer: {
    paddingTop: '16px',
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
              render={({ handleSubmit, pristine, invalid, submitting, form: {reset} }) => (            
              <form style={styles.formContainer} onSubmit={handleSubmit}>            
                <Field
                  name="name"
                  label="Name"
                  placeholder="Name"
                  component={FormTextField}
                />
                <div>
                  <Button 
                    style={{ marginRight: '1rem'}}
                    icon="floppy-disk" 
                    intent="success"
                    type="submit"
                    disabled={pristine || submitting || invalid}
                    text="Save group" />                  
                  <Button 
                    icon="refresh" 
                    intent="danger" 
                    onClick={reset}
                    disabled={pristine || submitting}
                    text="Reset values" />
                </div>
              </form>
            )} />
        )}}
      </Subscribe>              
    );
  }
}


export default CreateOrEditGroupPage;
