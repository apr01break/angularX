import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { dateReleaseValidator } from '../../validators/date-release.validator';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Message } from '../../models/message.model';



@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.css']
})
export class CreateEditProductComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscription: Subscription = Subscription.EMPTY;
  id: string | null;
  idExists: boolean = false;
  textMessage: string;
  messageType: string;
  saveInProgress: boolean = false;

  constructor(private formBuilder: FormBuilder,  public productService: ProductService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, dateReleaseValidator]],
      date_revision: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.suscription = this.productService.getProductToEdit().subscribe(product => {
        this.form.patchValue({
          id: product.id,
          name: product.name,
          description: product.description,
          logo: product.logo,
          date_release: this.datePipe.transform(product.date_release, 'yyyy-MM-dd', 'UTC'),
          date_revision: this.datePipe.transform(product.date_revision, 'yyyy-MM-dd', 'UTC')
        });
      });
      this.form.get('id')?.disable();
    }
  }

  checkIdExistence() {
    if (this.form.get('id')?.value == '') {
      this.idExists = false;
      return;
    }
    this.productService.validateExistingId(this.form.get('id')?.value).subscribe(data => {
      this.idExists = data;
    });
  }

  onDateReleaseChange() {
    this.form.patchValue({
      date_revision: this.datePipe.transform(this.addOneYearToDate(this.form.get('date_release')?.value), 'yyyy-MM-dd', 'UTC'),
    });
  }

  addOneYearToDate(date: string): Date {
    const newDate = new Date(date + " ");
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }

  resetForm() {
    this.form.reset({
      id: this.id
    });
  }

  saveProduct() {
    this.saveInProgress = true;
    const product: Product = {
      id: this.form.get('id')?.value,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      logo: this.form.get('logo')?.value,
      date_release: this.form.get('date_release')?.value,
      date_revision: this.form.get('date_revision')?.value
    };

    if (this.id == null) {
      this.productService.createProduct(product).subscribe({
        next: (data) => {
          this.saveInProgress = false;
          let message: Message = {
            textMessage: "Creado correctamente",
            messageType: "success"
          };
          this.productService.updateMessage(message);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.messageType = "error";
          this.textMessage = error;
          console.log(error);
        }
      });
    }
    else {
      this.productService.updateProduct(product).subscribe({
        next: (data) => {
          this.saveInProgress = false;
          let message: Message = {
            textMessage: "Actualizado correctamente",
            messageType: "success"
          };
          this.productService.updateMessage(message);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
