import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TostService } from 'src/app/services/tost.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-earnings-dashboard',
  templateUrl: './earnings-dashboard.page.html',
  styleUrls: ['./earnings-dashboard.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class EarningsDashboardPage implements OnInit {
  totalEarnings = 0;
  payments : any;
  constructor(private apiService: ApiService, private tostService: TostService) { }

  ngOnInit() {
    this.loadEarnings();
  }
  loadEarnings() {
    const data = this.apiService.getEarnings();
    this.totalEarnings = data.totalEarnings;
    this.payments = data.payments;
  }

  requestWithdrawal() {
    this.apiService.requestWithdrawal();
    this.tostService.presentToast("Withdrawal request submitted successfully!", "success");
  }
}
