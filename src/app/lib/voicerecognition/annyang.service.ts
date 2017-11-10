import annyang from 'annyang';

export default class AnnyangService {
  start() {
    annyang.addCommands(this.commands);
    annyang.debug(true);
    annyang.start();
  }

  commands = {};
}