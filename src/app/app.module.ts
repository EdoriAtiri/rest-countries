import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { LoadingAnimationComponent } from './loading-animation/loading-animation.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ThemeService } from './services/theme.service';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    LoadingAnimationComponent,
    ErrorPageComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
