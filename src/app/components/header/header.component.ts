import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public role = '';
  constructor(private auth: AuthService) { }

  ngOnInit() {
    const tokenPayload = this.auth.getDecodedToken();
    console.log(tokenPayload);
    this.role = tokenPayload.role;
  }

}
