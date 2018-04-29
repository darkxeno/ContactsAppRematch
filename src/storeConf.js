import { reducer as formReducer } from "redux-form";
import { init } from "@rematch/core";
import selectorsPlugin from "@rematch/select";
import createLoadingPlugin from "@rematch/loading";
import models from "./models";

const loading = createLoadingPlugin({});
const select = selectorsPlugin();

const store = init({
  models,
  plugins: [select, loading],
  redux: {
    reducers: {
      form: formReducer
    }
  }
});

export default store;
