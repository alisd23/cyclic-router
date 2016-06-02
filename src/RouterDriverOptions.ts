import {HistoryDriverOptions} from '@cycle/history/lib/interfaces';

interface RoutingDriverOptions extends HistoryDriverOptions {
  matchHandler?: (path: string, routes: any) => { path: string, value: any };
}

export default RoutingDriverOptions;
