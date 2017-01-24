import { Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})

export class SearchComponent {
    @Output() startSearch: EventEmitter<string>;
    keyword: string = '';

    constructor(){
        this.startSearch = new EventEmitter<string>()
    }

    onEnterInput(){
        if(this.keyword.length > 0)
            this.startSearch.emit(this.keyword);
    }
}