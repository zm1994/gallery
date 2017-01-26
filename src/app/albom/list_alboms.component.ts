import {Component, OnInit} from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'

@Component({
  selector: 'list-alboms',
  templateUrl: 'list_alboms.component.html',
  styleUrls: ['list_alboms.component.css'],
  providers: []
})


export class ListAlbomComponent implements OnInit {
  arrayAlboms: any[];
  constructor(private vkServ: VkService){
    this.arrayAlboms = [];
  }

  ngOnInit(){
    this.getAlboms();
  }

  getAlboms(){
    console.log('search alboms')
    this.vkServ.vkGetAlboms((result) => {

      console.log(result)
      this.arrayAlboms = <any[]> result.response;
    })
  }
}
