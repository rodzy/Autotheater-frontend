import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from '../../../services/generic.service';
import { NotficationService } from '../../../services/notfication.service';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-likedmovies',
  templateUrl: './likedmovies.component.html',
  styleUrls: ['./likedmovies.component.scss'],
})
export class LikedmoviesComponent implements OnInit {
  data: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private notification: NotficationService
  ) {}

  ngOnInit(): void {
    this.listPopular();
  }

  listPopular() {
    this.gService
      .List('movies/')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.data = data;
        },
        (error: any) => {
          this.notification.message(error.name, error.messge, 'error');
        }
      );
    }
}
