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
      src: 'assets/images/tran-mau-tri-tam--81lVsfM4gQ-unsplash.jpg',
      author: 'Tran Mau Tri Tam',
      profile:
        'https://unsplash.com/@tranmautritam?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
      link:
        'https://unsplash.com/s/photos/pets?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
      heading: 'We are a pet friendly auto cinema',
    },
    {
      src: 'assets/images/jeremy-yap-J39X2xX_8CQ-unsplash.jpg',
      author: 'Jeremy Yap',
      profile:
        'https://unsplash.com/@jeremyyappy?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
      link:
        'https://unsplash.com/s/photos/cinema?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
      heading: 'The latest movies in premiere every week',
    },
    {
      src: 'assets/images/jona-8KLIipGfYo4-unsplash.jpg',
      author: 'Jona',
      profile:
        'https://unsplash.com/@jona_schm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
      link:
        'https://unsplash.com/s/photos/auto-cinema?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
      heading: 'Come visit us and have a great time',
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
