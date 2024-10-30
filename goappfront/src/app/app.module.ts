import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';
import { HeaderUserPanelComponent } from './header-user-panel/header-user-panel.component';
import { CoinComponent } from './coin/coin.component';
import { LadderTableComponent } from './ladder-table/ladder-table.component';
import { PlayComponent } from './play/play.component';
import { ChatComponent } from './chat/chat.component';
import { BetSettingsComponent } from './bet-settings/bet-settings.component';
import { UserSettingsModalComponent } from './user-settings-modal/user-settings-modal.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { EmailInputComponent } from './email-input/email-input.component';
import { AvatarInputComponent } from './avatar-input/avatar-input.component';
import { WalletMenuComponent } from './wallet-menu/wallet-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CarouselComponent,
    SidenavComponent,
    RecaptchaComponent,
    HeaderUserPanelComponent,
    CoinComponent,
    LadderTableComponent,
    PlayComponent,
    ChatComponent,
    BetSettingsComponent,
    UserSettingsModalComponent,
    PasswordInputComponent,
    EmailInputComponent,
    AvatarInputComponent,
    WalletMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
