import { ConfigService } from './../configloader/config.service';
import { Injectable } from '@angular/core';

interface IWindow extends Window {
  annyang:any;
}

const { annyang }: IWindow = <IWindow>window;


@Injectable()
export default class AnnyangService {

  constructor(private configService: ConfigService) {

  }
  start() {
    annyang.setLanguage(this.configService.get("speech").language);
    annyang.addCommands(this.commands);
    annyang.debug(true);
    annyang.start();
  }

  addCommand(phrase: string, callback: any) {
    console.log("command " + phrase + " added")
    this.commands[phrase] = callback;
    annyang.addCommands(this.commands);
  }
  commands = {};
}