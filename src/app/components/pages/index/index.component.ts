import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NotficationService } from '../../../services/notfication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  show = null;
  public slides = [
    {
      src:
        'https://images.unsplash.com/photo-1563603357963-439f524bd662?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
    },
    {
      src:
        'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',
    },
    {
      src:
        'https://images.unsplash.com/photo-1543536448-1e76fc2795bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1324&q=80',
    },
  ];

  constructor(
    private authService: AuthService,
    private notification: NotficationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.show = this.authService.getCurrentUserInfo().user.status;
    }
    this.messages();
  }

  messages() {
    let registered = false;
    let auth = false;
    let role = false;
    let log = false;
    this.route.queryParams.subscribe((params) => {
      registered = params.registered || false;
      auth = params.auth || false;
      role = params.role || false;
      log = params.log || false;
    });
    if (auth) {
      this.notification.message(
        'Hey, user!🤖',
        `You're not authorized to perform such action please create an account or log in to continue`,
        'warning'
      );
    }
    if (role) {
      this.notification.message(
        'Unauthorized!',
        `👮‍♀️ You're not authorized to look at this page 👮‍♂️`,
        'info'
      );
    }
    if (registered) {
      this.notification.message(
        'Success, thank you for sign on AutoTheater ✅',
        `Please specify your account credentials to start enjoying all of AutoTheater benefits 😄`,
        'success'
      );
    }
    if (log) {
      this.notification.message(
        'Success, we hope to have you soon ✅',
        `Successfully logged out of AutoTheater come back whenever you like 😄`,
        'success'
      );
    }
  }
}
