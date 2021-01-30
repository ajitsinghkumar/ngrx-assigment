import { getPosts } from './posts/state/posts.selector';
import { Post } from '././models/posts.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private store: Store<AppState>){}
  ngOnInit(){
    this.posts = this.store.select(getPosts);
    console.log(this.posts);
  }
}
