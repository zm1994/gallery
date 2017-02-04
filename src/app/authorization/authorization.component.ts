import { Component, Output, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import { VkService } from '../services/vk_service/vk.service'

@Component({
    selector: 'authorization',
    templateUrl: 'authorization.component.html',
    styleUrls: ['authorization.component.css'],
    providers: [VkService]
})

export class AuthorizationComponent implements OnInit, AfterViewInit {
    userLogged: boolean;
    constructor(private vkServ: VkService) { }



    ngOnInit() {
        this.userLogged = !!this.vkServ.sessionId && !!this.vkServ.userId
    }

    ngAfterViewInit() {
        this.userLogged = !!this.vkServ.sessionId && !!this.vkServ.userId
    }

    login() {
        this.vkServ.vkLogin();
    }
}