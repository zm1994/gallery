import { Component, Output, Input } from '@angular/core';
import { Router } from '@angular/router'
import { VkService } from '../services/vk_service/vk.service'

@Component({
    selector: 'authorization',
    templateUrl: 'authorization.component.html',
    styleUrls: ['authorization.component.css'],
    providers: [VkService]
})

export class AuthorizationComponent {
   constructor(
       private vkServ: VkService,
       private router: Router
   ){}

    login() {
        this.vkServ.vkLogin();
    }
}