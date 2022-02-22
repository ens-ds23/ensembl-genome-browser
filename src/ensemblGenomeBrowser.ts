import {
  ConfigData,
  GenomeBrowserType,
  IncomingActionType,
  OutgoingAction,
  Subscribe,
  SubscribeArgs
} from './types';

import send from './methods/send';
import subscribe from './methods/subscribe';
import handleIncoming from './methods/handleIncoming';

const allSubscriptions = new Map<
  IncomingActionType,
  Set<(action: any) => void>
>();

class EnsemblGenomeBrowser {
  genomeBrowser: GenomeBrowserType | null = null;
  inited = false;
  subscriptions = allSubscriptions;
  send: (action: OutgoingAction) => Promise<void> = async () => undefined;

  subscribe: Subscribe = () => {
    return { unsubscribe: () => undefined };
  };

  handleIncoming: (
    ...action: [type: IncomingActionType | 'error', payload: any]
  ) => void = () => undefined;

  formatIncoming: (actionType: IncomingActionType, payload: any) => any = () =>
    undefined;

  public async init(config: ConfigData = {}) {
    if (!this.inited) {
      const { default: init, GenomeBrowser } = await import(
        './peregrine/peregrine_ensembl.js'
      );
      await init();
      this.genomeBrowser = new GenomeBrowser();
      this.genomeBrowser.go(config);
      this.send = (action: OutgoingAction) =>
        send(this.genomeBrowser as GenomeBrowserType, action);
      this.handleIncoming = (
        ...action: [type: IncomingActionType | 'error', payload: any]
      ) => handleIncoming(this.subscriptions, ...action);
      this.subscribe = (...args: SubscribeArgs) =>
        subscribe(this.subscriptions, ...args);
    }
    this.inited = true;

    if (this.handleIncoming) {
      this.genomeBrowser?.set_message_reporter(this.handleIncoming);
    }
  }
}

export default EnsemblGenomeBrowser;
