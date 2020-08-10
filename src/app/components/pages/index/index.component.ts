import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.show = this.authService.getCurrentUserInfo().user.status;
    }
  }
}
