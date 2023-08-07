import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProductComponent } from './create-edit-product.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product.model';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

export class ProductTestingService {

  createProduct(product: Product) {
    return of({
      id: 'PM22', name: 'Tarjeta XYS', description: 'XYS description test', logo: 'https://img.freepik.com/vector-gratis/ilustracion-vector-banner-sello-circulo_53876-27183.jpg', date_release: new Date('2023-10-08'), date_revision: new Date('2024-10-08')
    });
  }

  updateProduct(product: Product) {
    return of({
      id: 'PM22', name: 'Tarjeta XYS', description: 'XYS description test', logo: 'https://img.freepik.com/vector-gratis/ilustracion-vector-banner-sello-circulo_53876-27183.jpg', date_release: new Date('2023-10-08'), date_revision: new Date('2024-10-08')
    });
  }

  validateExistingId(id: string) {
    return of(false);
  }
}

describe('CreateEditProductComponent', () => {
  let component: CreateEditProductComponent;
  let fixture: ComponentFixture<CreateEditProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [CreateEditProductComponent,],
      providers: [
        { provide: ProductService, useClass: ProductTestingService },
        DatePipe
      ]
    });
    fixture = TestBed.createComponent(CreateEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the product', () => {
    let product: Product = {
      id: 'PM22', name: 'Tarjeta XYS', description: 'XYS description test', logo: 'https://img.freepik.com/vector-gratis/ilustracion-vector-banner-sello-circulo_53876-27183.jpg', date_release: new Date('2023-10-08'), date_revision: new Date('2024-10-08')
    };
    component.productService.createProduct(product).subscribe(data => {
      expect(data).toEqual(product);
    })
  });

  it('should update the product', () => {
    let product: Product = {
      id: 'PM22', name: 'Tarjeta XYS', description: 'XYS description test', logo: 'https://img.freepik.com/vector-gratis/ilustracion-vector-banner-sello-circulo_53876-27183.jpg', date_release: new Date('2023-10-08'), date_revision: new Date('2024-10-08')
    };
    component.productService.updateProduct(product).subscribe(data => {
      expect(data).toEqual(product);
    })
  });

  it('should validate existing id', () => {
    let idExists = false;
    let id = '21QWE';
    component.productService.validateExistingId(id).subscribe(data => {
      expect(data).toEqual(idExists);
    })
  });

  it('should add a year to date', () => {
    let date = '2022-09-21';
    let newDate = new Date('2023-09-21 00:00:00 GMT-0500');
    let resultDate = component.addOneYearToDate(date);
    expect(resultDate).toEqual(newDate);
  });

  it('should reset the form', () => {
    component.resetForm();
    expect(component.form.get('id')?.value).toBeNull();
    expect(component.form.get('name')?.value).toBeNull();
    expect(component.form.get('description')?.value).toBeNull();
    expect(component.form.get('logo')?.value).toBeNull();
    expect(component.form.get('date_release')?.value).toBeNull();
    expect(component.form.get('date_revision')?.value).toBeNull();
  });

});
