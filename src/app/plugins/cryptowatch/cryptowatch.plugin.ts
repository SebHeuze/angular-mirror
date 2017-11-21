import { PluginData } from './../../lib/plugin/plugin-data.model';
import { Component, ViewEncapsulation, NgModule, Inject } from '@angular/core';
import { ConfigService } from '../../lib/configloader/config.service';
import { CommonModule } from '@angular/common';
import { CoinmarketcapService } from './coinmarketcap.service';
import { Ticker } from './ticker.model';


@Component({
    selector: 'cryptowatch',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/plugins/cryptowatch/cryptowatch.html',
    styleUrls: ['app/plugins/cryptowatch/cryptowatch.css'],
    providers: [CoinmarketcapService]
})
export class CryptowatchPluginComponent {
    private plugin: any;
    private watchlist: Ticker[];
    constructor(private _config: ConfigService, private coinmarketcapService: CoinmarketcapService,
         @Inject(PluginData) private pluginData: PluginData) {
        this.plugin = this.pluginData.instance;
        this.coinmarketcapService.callTicker().subscribe((result: Ticker[]) => {
            this.watchlist = result.filter(
                ticker =>  this._config.get('cryptowatch').watchlist.indexOf(ticker.symbol) > -1
            );
        });
    }

}

@NgModule({
  imports: [CommonModule],
  declarations: [CryptowatchPluginComponent]
})
export class CryptowatchPluginModule {}
