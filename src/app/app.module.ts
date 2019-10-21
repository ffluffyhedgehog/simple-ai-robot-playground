import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapCellComponent } from './map/map-cell/map-cell.component';
import { MapAgentSelectorComponent } from './map/map-agent-selector/map-agent-selector.component';
import { FormsModule } from '@angular/forms';
import { ResultsTableComponent } from './experiment-results/results-table/results-table.component';
import { ExperimentResultsComponent } from './experiment-results/experiment-results.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapCellComponent,
    MapAgentSelectorComponent,
    ResultsTableComponent,
    ExperimentResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
