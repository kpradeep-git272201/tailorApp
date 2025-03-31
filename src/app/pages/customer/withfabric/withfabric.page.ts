import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { WithfabricService } from 'src/app/services/withfabric.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withfabric',
  templateUrl: './withfabric.page.html',
  styleUrls: ['./withfabric.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class WithfabricPage implements OnInit {
	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;
  displayedFabricsByMat: any = [];
  displayedFabricsByTex: any = [];
  displayedColors: any = [];
  showAllFabric = false;

  allFabricsLoadedByMat = false;
  allFabricsLoadedByTex = false;
  allColorLoaded = false;
  fabricMaster: any = [];
 

  
  initDisplayCountFabByMat=6;
  initialDisplayCountByTex = 6;
  initialDisplayCountColor = 6;
  loadMoreCountFabByMat = 20;
  loadMoreCountByTex = 20;
  loadMoreCountColor = 20;


	@ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;

  slides = [
    { image: 'assets/images/slide1.jpg', title: 'First Slide', description: 'This is the first slide.' },
    { image: 'assets/images/slide2.jpg', title: 'Second Slide', description: 'This is the second slide.' },
    { image: 'assets/images/slide3.jpg', title: 'Third Slide', description: 'This is the third slide.' },
  ];
  categories = [
    { name: 'Shirts', image: 'assets/images/Alteration.jpg' },
    { name: 'Jeans', image: 'assets/images/Alteration.jpg' },
    { name: 'T-Shirts', image: 'assets/images/Alteration.jpg' },
    { name: 'Casual Shoes', image: 'assets/images/Alteration.jpg' }
  ];
  searchQueryAuto: string = 'Search for ';
  items: any[] = [
    { name: 'Shirts' },
    { name: 'Jeans' },
    { name: 'T-Shirts' },
    { name: 'Casual Shoes' },
    { name: 'Sports Shoes' },
    { name: 'Kurta Sets' },
    { name: 'Tops' },
    { name: 'Hydrating Serum' }
  ];
  filteredItems: any[] = [];
  autoSearchTexts: string[] = ['Shirts', 'Jeans', 'T-Shirts', 'Casual Shoes'];
  searchIndex: number = 0;
  interval: any;
  masterBrandData: any[] | any;
  masterMenu: any[] | any;
  isTyping: boolean = false;
  colorMaster:any=[];
  constructor(private commonService: CommonService, 
    private wfService: WithfabricService,
    private router: Router) {
   
   
  }

  ngOnInit() {
    this.startAutoTyping();
    this.masterBrandData=this.commonService.getMasterBrand();
    this.masterMenu=this.wfService.getMasterMenu();
    this.fabricMaster = this.wfService.getFabricMasterData();
    this.colorMaster = this.wfService.colorClassificationMaster();
    this.filteredItems = this.masterMenu;

    this.updateDisplayedFabricsByMaterail();
    this.updateDisplayedFabricsByTex();
    this.updateDisplayedColors();

  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  stopAutoTyping() {
    this.isTyping = true;
    clearInterval(this.interval);
  }

  restartAutoTyping() {
    if (!this.searchQueryAuto) {
      this.isTyping = false;
      this.startAutoTyping();
    }
  }


  startAutoTyping() {
    this.interval = setInterval(() => {
      this.typeText("Search for "+this.autoSearchTexts[this.searchIndex]);
      this.searchIndex = (this.searchIndex + 1) % this.autoSearchTexts.length;
    }, 5000);
  }

  typeText(text: string) {
    let index = 0;
    this.searchQueryAuto = '';
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        this.searchQueryAuto += text.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
        this.filterItems({ target: { value: this.searchQueryAuto } });
      }
    }, 200);
  }

  filterItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredItems = this.masterMenu.filter((item:any) =>
        item.articleName.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredItems = this.masterMenu;
    }
  }

  togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}

  goToArticle(article:any){
    this.router.navigate(['/tabs/customer/with-fabric', article.articleName],{
      queryParams: {
        article: JSON.stringify(article)
      }
    });
  }

  loadMoreFabrics() {
    this.updateDisplayedFabricsByMaterail();
  }

  updateDisplayedFabricsByMaterail() {
    const currentDisplayCountColor = this.displayedFabricsByMat.length;
    const nextDisplayCount = currentDisplayCountColor + (currentDisplayCountColor === 0 ? this.initDisplayCountFabByMat : this.loadMoreCountFabByMat);
    this.displayedFabricsByMat = this.fabricMaster.slice(0, nextDisplayCount);
    this.allFabricsLoadedByMat = this.displayedFabricsByMat.length >= this.fabricMaster.length;
  }

  loadMoreFabricsByTex() {
    this.updateDisplayedFabricsByTex();
  }

  updateDisplayedFabricsByTex() {
    const currentDisplayCountColor = this.displayedFabricsByTex.length;
    const nextDisplayCount = currentDisplayCountColor + (currentDisplayCountColor === 0 ? this.initialDisplayCountByTex : this.loadMoreCountByTex);
    this.displayedFabricsByTex = this.fabricMaster.slice(0, nextDisplayCount);
    this.allFabricsLoadedByTex = this.displayedFabricsByTex.length >= this.fabricMaster.length;
  }

  loadMoreColors() {
    this.updateDisplayedColors();
  }

  updateDisplayedColors() {
    const currentDisplayCount = this.displayedColors.length;
    const nextDisplayCount = currentDisplayCount + (currentDisplayCount === 0 ? this.initialDisplayCountColor : this.loadMoreCountColor);
    this.displayedColors = this.colorMaster.slice(0, nextDisplayCount);
    this.allColorLoaded = this.displayedColors.length >= this.colorMaster.length;
  }
}
