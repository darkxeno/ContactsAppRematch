import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm, getFormValues } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import FormTextField from "../../components/FormTextField";
import validate from "./form-validations";
import { makeSelectGroupById } from "../../models/groups/selectors";

const FORM_NAME = "group";
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
      saveGroup
    } = this.props;
    return (
      <form style={styles.formContainer} onSubmit={handleSubmit(saveGroup)}>
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
    );
  }
}

CreateOrEditGroupPage.propTypes = {
  group: PropTypes.object
};

const mapStateToProps = (store, props) => ({
  initialValues: makeSelectGroupById(props.match.params.id)(store),
  formValues: getFormValues(FORM_NAME)
});

const mapDispatchToProps = (dispatch, props) => ({
  initializeView: params => {
    if (params && params.id) {
      dispatch.groups.requestGroup(props.match.params.id);
    }
  },
  saveGroup: group => {
    if (group.id) {
      dispatch.groups.updateGroupRequest(group);
    } else {
      dispatch.groups.createGroup(group);
    }
    props.history.goBack();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    validate
  })(CreateOrEditGroupPage)
);
