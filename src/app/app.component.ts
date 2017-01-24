/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { VkService } from './services/vk_service/vk.service'


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: 'app.component.html',
  providers: [VkService]
})
export class AppComponent implements OnInit {
   searchWord: string = '';
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState,
    private vkServ: VkService
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  Login(){
    this.vkServ.vkLogin();
  }
  onStartedSearch(event: string){
    this.searchWord = event;
    console.log(this.searchWord);
  }

  vkLogin() {
        console.log('login')
        VK.init({
            apiId: 5832573,
        });
        VK.Auth.getLoginStatus(this.getVkStatus);
        
        VK.Auth.login(this.getVkStatus, 4);
    };

    getVkStatus = (response) => {
        if (response.session) {
            //this.isLogged = true;
            localStorage.setItem("sid", response.session.sid);
            localStorage.setItem("mid", response.session.mid);
            console.log(VK)
        } else {
          console.log(VK)
            //this.isLogged = false;
        }
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