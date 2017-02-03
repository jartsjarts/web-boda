import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
    <navbar></navbar>

    <router-outlet></router-outlet>

    <!-- Footer -->
    <footer class="text-center">
        <div class="footer-below">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        Copyright &copy; Jordi & Miriam 2017
                    </div>
                </div>
            </div>
        </div>
    </footer>
  `
})

export class AppComponent { 
    constructor(router: Router){
        router.events.subscribe( s=> {
            if(s instanceof NavigationEnd){
                const tree = router.parseUrl(router.url);
                if(tree.fragment){
                    const element = document.querySelector("#" + tree.fragment);
                    if(element){
                        (<any>element).scrollIntoView(element);
                    }
                }
            }
        })
    }
}
