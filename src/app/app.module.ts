import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import 'hammerjs';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { AlertComponent } from './alert/alert.component'
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search_result/search_result.component'
import { VkService } from './services/vk_service/vk.service'
import { ScrollListener } from './shared/scroll.listener'
import { ListAlbumComponent } from  './album/list_albums.component'
import { PhotoComponent } from './photo/photo.component'
import { JsonpModule } from '@angular/http';
import { AuthorizationComponent } from './authorization/authorization.component'
import { TabsModule } from 'ng2-bootstrap';
import { ListPhotoComponent } from './photo/list_photo.component';
import { ImageUploaderComponent } from './uploader/image_uploader.component'
//import { Ng2UploaderModule } from 'ng2-uploader';
import { FileSelectDirective } from 'ng2-file-upload';
import {MomentModule} from 'angular2-moment';
import { TooltipModule } from 'ng2-bootstrap';
import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    AlertComponent,
    AuthorizationComponent,
    FileSelectDirective,
    ImageUploaderComponent,
    ListAlbumComponent,
    ListPhotoComponent,
    HomeComponent,
    NoContentComponent,
    PhotoComponent,
    SearchComponent,
    SearchResultComponent,
    XLargeDirective
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    JsonpModule,
    HttpModule,
    MomentModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    VkService,
    ScrollListener
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
