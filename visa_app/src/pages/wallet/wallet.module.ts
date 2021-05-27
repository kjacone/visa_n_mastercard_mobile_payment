import { NgModule } from '@angular/core';
import { IonicPageModule,IonicModule } from 'ionic-angular';
import { WalletPage } from './wallet';
import { RecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions';
import { MyCardsComponent } from '../../components/my-cards/my-cards';
import { BillerScrollComponent } from '../../components/biller-scroll/biller-scroll';
import { MenuFooterComponent } from '../../components/menu-footer/menu-footer';

@NgModule({
imports: [

    IonicModule,
    IonicPageModule.forChild( WalletPage)
  ],
  entryComponents: [RecentTransactionsComponent],
  declarations: [WalletPage, RecentTransactionsComponent,MyCardsComponent,BillerScrollComponent,MenuFooterComponent]
})



export class WalletPageModule {}
