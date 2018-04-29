import { StackNavigator } from 'react-navigation';
import App from './App';
import { APP_PATHNAME } from './models/nav/pathNames';

export default StackNavigator(
  {
    [APP_PATHNAME]: {
      screen: App,
    },
  },
  {
    initialRouteName: APP_PATHNAME,
  }
)
