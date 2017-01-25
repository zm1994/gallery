export class ScrollListener  {
    bottom: boolean;
    constructor() {
        this.bottom = false;
    }

    publishScrollToBottom(callbackMethod){
        window.onscroll = () => {
            let status = "not reached";
            let windowHeight = "innerHeight" in window ? window.innerHeight: document.documentElement.offsetHeight;
            let body = document.body, html = document.documentElement;
            let docHeight = Math.max(body.scrollHeight,body.offsetHeight, html.clientHeight,
                                     html.scrollHeight, html.offsetHeight);
            let windowBottom = windowHeight + window.pageYOffset;
            this.bottom = windowBottom >= docHeight;
            callbackMethod(this.bottom);
         };
    }
}