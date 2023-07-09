import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { BrandService } from 'src/app/service/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  public configuration!: Config;
  public columns: Columns[] = [];
  public data: any[] = [];
  brands = [];

  brandIdToUpdate = 0;

  brandForm!: FormGroup;

  isEditMode = false;
  constructor(private brandService: BrandService, private fb: FormBuilder, private toast: NgToastService) { }

  ngOnInit() {
    this.columns = [
      { key: 'brandId', title: 'Brand ID' },
      { key: 'brandName', title: 'Brand Name' },
      {key:'action', title: 'Action'}

    ];
    this.getAllBrands();

    this.brandForm = this.fb.group({
      brandName: ['', Validators.required]
    })
  }
  getAllBrands() {
    this.brandService.getAll()
      .subscribe({
        next: (res) => {
          this.brands = res;
          this.data = this.brands;
          this.configuration = { ...DefaultConfig };
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onEdit(row: any){
    this.isEditMode = true;
    this.brandIdToUpdate = row.brandId;
    this.brandForm.setValue({
      brandName: row.brandName
    })
  }

  onAddClicked(){
    this.isEditMode = false;
  }
  addBrand(){
    this.brandService.createbrand(this.brandForm.value)
      .subscribe(res => {
        this.brandForm.reset();
        this.toast.success({ summary: "Brand Added!", detail: "SUCCESS", duration: 2000 });
        this.getAllBrands();
        document.getElementById("btn-close")?.click();
      })
  }

  updateBrand(){
    let storeObj = {
      brandId: this.brandIdToUpdate,
      ...this.brandForm.value
    };
    this.brandService.updatebrand(storeObj)
      .subscribe(res => {
        this.isEditMode = false;
        this.toast.success({ detail: "SUCCESS", summary: "Store Updated!", duration: 2000 });
        this.brandForm.reset();
        this.getAllBrands();
        document.getElementById("btn-close")?.click();
      });
  }
}
