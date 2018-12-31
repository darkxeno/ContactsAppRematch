import createRouter from 'router5';
import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';
import { routes } from './routes';

function configureRouter() {
  const router = createRouter(routes, {
    defaultRoute: 'home',
    autoCleanup: false,
  });

  // Plugins
  router.usePlugin(
    loggerPlugin,
    browserPlugin({
      useHash: true,
      forceDeactivate: false,
    }),
  );

  return router;
}

const router = configureRouter();
router.start();

export const { navigate } = router;
export default router;
