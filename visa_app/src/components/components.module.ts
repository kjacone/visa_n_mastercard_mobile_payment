import { NgModule } from '@angular/core';
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions';
import { MyCardsComponent } from './my-cards/my-cards';
import { BillerScrollComponent } from './biller-scroll/biller-scroll';
import { MenuFooterComponent } from './menu-footer/menu-footer';
import { SearchListComponent } from './search-list/search-list';
import { MyMenusComponent } from './my-menus/my-menus';
@NgModule({
	declarations: [RecentTransactionsComponent,
    MyCardsComponent,
    BillerScrollComponent,
    MenuFooterComponent,
    SearchListComponent,
    MyMenusComponent],
	imports: [],
	exports: [RecentTransactionsComponent,
    MyCardsComponent,
    BillerScrollComponent,
    MenuFooterComponent,
    SearchListComponent,
    MyMenusComponent]
})
export class ComponentsModule {}
