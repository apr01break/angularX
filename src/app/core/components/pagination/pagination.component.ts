import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() numberRecords: number;
  @Input() currentPage: number;
  @Input() pageSize: number;
  @Output() paginationEmitter: EventEmitter<{ currentPage: number, pageSize: number }> = new EventEmitter();

  totalPages: number;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPages = Math.ceil(this.numberRecords / this.pageSize);
  }

  next() {
    this.currentPage++;
    this.goToPage();
  }

  previous() {
    this.currentPage--;
    this.goToPage();
  }

  changePageSize() {
    this.currentPage = 1;
    this.goToPage();
  }

  goToPage() {
    this.paginationEmitter.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
  }
}
