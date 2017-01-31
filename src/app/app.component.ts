/*
 * Angular 2 decorators and services
 */
import {
  Component,
  DoCheck,
  Renderer,
  OnInit,
  ViewEncapsulation,
  ViewChild, ElementRef
} from '@angular/core';
import { AppState } from './app.service';
import { VkService } from './services/vk_service/vk.service'
import { Observable } from 'rxjs/Observable'
import { SearchResultComponent } from './search_result/search_result.component'
import { ListPhotoComponent } from './photo/list_photo.component'


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.css' ],
  templateUrl: 'app.component.html',
  providers: [VkService]
})

export class AppComponent implements OnInit {
  @ViewChild(SearchResultComponent)
  private searchPhotoContent: SearchResultComponent;
  // @ViewChild(ListPhotoComponent)
  // private searchPhotoContent: ListPhotoComponent;
  @ViewChild('tabSearchResult')
  private tabSearchResult: ElementRef;

  client_id: number;
  userLogged: boolean;


  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState,
    private renderer: Renderer,
    private vkServ: VkService) {
    this.client_id = 5832573; //this is id of app in vk
  }

  ngDoCheck() {
    console.log(this.vkServ.isLogged)
    this.userLogged = this.vkServ.isLogged;
  }

  public ngOnInit() {
        VK.init({
            apiId: 5832573,
        });
        this.vkServ.checkLoginStatus()
  }

  onStartedSearch(event: string){
    console.log(this.tabSearchResult.nativeElement.click())
    this.tabSearchResult.nativeElement.click()
    
    this.searchPhotoContent.searchPhotoByName(event)
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
// <md-tab-group>
//   <md-tab>
//     <template md-tab-label>
//       The <em>best</em> pasta
//     </template>
//     <about></about>
//   </md-tab>
//   <md-tab>
//     <template md-tab-label>
//       The worst sushi
//     </template>
//     <p>Test</p>
//   </md-tab>
//   <md-tab>
//     <template md-tab-label>
//       The worst sushi
//     </template>
//     <p>Test</p>
//   </md-tab>
// </md-tab-group>
