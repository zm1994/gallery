import { Component, Output, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Photo } from '../models/photo.model'
import { ActivatedRoute, Router } from '@angular/router'
import { VkService } from '../services/vk_service/vk.service'
import {ANGULAR_TABS_DIRECTIVES, TabInterface} from "angular2-tabs/core";

@Component({
    selector: 'photo',
    templateUrl: 'photo.component.html',
    styleUrls: ['photo.component.css'],
    providers: [VkService]
})

export class ListPhotoComponent {

   arrPhoto: Photo[]

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vkServ: VkService
        ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        let albom = params['albom'];
        this.getPhotoFromAlbom(albom)
      });
  }

  getPhotoFromAlbom(albomId : string) {


  }

}
