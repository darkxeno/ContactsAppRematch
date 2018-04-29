import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm, getFormValues } from "redux-form";
import { select } from "@rematch/select";
import RaisedButton from "material-ui/RaisedButton";
import FormTextField from "../../components/FormTextField";
import validate from "./form-validations";

const FORM_NAME = "contact";
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
    this.props.initializeView(this.props.match.params);
  }
  componentWillReceiveProps(nextProps) {
    const {
      match: { params }
    } = this.props;
    if (params.id !== nextProps.match.params.id) {
      nextProps.initializeView(nextProps.match.params);
    }
  }
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      reset,
      saveContact
    } = this.props;
    return (
      <form style={styles.formContainer} onSubmit={handleSubmit(saveContact)}>
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
    );
  }
}

CreateOrEditContactPage.propTypes = {
  contact: PropTypes.object
};

const mapStateToProps = (store, props) => ({
  initialValues: select.contacts.makeSelectContact(store)(
    props.match.params.id
  ),
  formValues: getFormValues(FORM_NAME)
});

const mapDispatchToProps = (dispatch, props) => ({
  initializeView: params => {
    if (params && params.id) {
      dispatch.contacts.requestContact(props.match.params.id);
    }
  },
  saveContact: contact => {
    if (contact.id) {
      dispatch.contacts.updateContactRequest(contact);
    } else {
      dispatch.contacts.createContact(contact);
    }
    props.history.goBack();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    validate
  })(CreateOrEditContactPage)
);
