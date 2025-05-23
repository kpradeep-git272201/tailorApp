import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdashboardPage } from './cdashboard/cdashboard.page';
import { ExploreTailorsPage } from './explore-tailors/explore-tailors.page';
import { TailorProfilePage } from './tailor-profile/tailor-profile.page';
import { BookTailorPage } from './book-tailor/book-tailor.page';
import { WithfabricPage } from './withfabric/withfabric.page';
import { WithoutfabricPage } from './withoutfabric/withoutfabric.page';
import { ArticlePage } from './article/article.page';
import { ArticleDetailPage } from './article-detail/article-detail.page';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: CdashboardPage },
  { path: 'tailors', component: ExploreTailorsPage },
  { path: 'tailor-profile/:id', component: TailorProfilePage },
  { path: 'book-tailor', component: BookTailorPage },
  { path: 'with-fabric', component: WithfabricPage },
  { path: 'with-out-fabric', component: WithoutfabricPage },
  { path: 'with-fabric/:article', component: ArticlePage },
  { path: 'with-fabric/:article/:articleId', component: ArticleDetailPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
