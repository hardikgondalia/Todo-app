import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'todo';

  public showLoader:boolean = true;

  ngOnInit(): void {
    setTimeout(()=>{
      this.showLoader = false;
     },3000)
  }
}
