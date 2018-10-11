import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
	imports: [ ReactiveFormsModule, FormsModule, NgxChartsModule],
	exports: [ ReactiveFormsModule, FormsModule, NgxChartsModule, LoaderComponent],
	declarations: [ LoaderComponent ]
})

export class SharedModule {}