import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]' // *appHasRole
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, 
      private accoutService: AccountService) {
        this.accoutService.currentUser$.pipe(take(1)).subscribe(user => {
          this.user = user;
        })
      }

  ngOnInit(): void {
    // clear the view if user has no roles
    if(!this.user?.roles || this.user.roles == null) {
      this.viewContainerRef.clear();
      return;
    }

    if(this.user?.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
