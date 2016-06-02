import {StreamAdapter} from '@cycle/base';
import {makeHistoryDriver} from '@cycle/history';
import {History} from '@cycle/history/lib/interfaces';
import RouterDriverOptions from './RouterDriverOptions';
import {RouterSource} from './RouterSource';

/**
 * Instantiates an new router driver function using the same arguments required
 * by @cycle/history.
 * @public
 * @method makeRouterDriver
 * @return {routerDriver} The router driver function
 */
function makeRouterDriver(history: History, options?: RouterDriverOptions) {
  const historyDriver = makeHistoryDriver(history, options);
  /**
   * The actual router driver.
   * @public
   * @typedef {routerDriver}
   * @name routerDriver
   * @method routerDriver
   * @param  {Stream<string|Location>} sink$ - This is the same input that the
   * history driver would expect.
   * @return {routerAPI}
   */
  return function routerDriver(sink$: any, runSA: StreamAdapter) {
    const history$ = historyDriver(sink$, runSA);
    return new RouterSource(history$, [], history$.createHref, options);
  };
}

export {makeRouterDriver}
