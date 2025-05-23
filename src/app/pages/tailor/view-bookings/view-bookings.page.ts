import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { TostService } from 'src/app/services/tost.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.page.html',
  styleUrls: ['./view-bookings.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ViewBookingsPage implements OnInit {
  bookings:any;

  constructor( private tostService: TostService,
      private apiService: ApiService,) { }
  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    const data = this.apiService.getBookings();
    this.bookings = data.bookings;
  }

  markAsCompleted(bookingId: number) {
    // this.bookingService.updateBookingStatus(bookingId, 'Completed').subscribe(() => {
      this.bookings = this.bookings.map((booking:any)=>{  
        return booking.id === bookingId ? { ...booking, status: 'Completed' } : booking
      });
      this.tostService.presentToast('Booking marked as completed!', 'success');
    // });
  }

  cancelBooking(bookingId: number) {
    // this.bookingService.updateBookingStatus(bookingId, 'Cancelled').subscribe(() => {
      this.bookings = this.bookings.map((booking:any) =>{ 
        return booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
      });
      this.tostService.presentToast('Booking has been cancelled.', 'danger');
    // });
  }

}
