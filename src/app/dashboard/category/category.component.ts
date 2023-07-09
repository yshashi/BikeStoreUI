import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public configuration!: Config;
  public columns: Columns[] = [];
  public data: any[] = [];
  categories = [];
  categoryIdToUpdate = 0;

  categoryForm!: FormGroup;

  isEditMode = false;
  constructor(private categoryService: CategoryService, private fb: FormBuilder, private toast: NgToastService) { }

  ngOnInit() {
    this.columns = [
      { key: 'categoryId', title: 'Category ID' },
      { key: 'categoryName', title: 'Category Name' }

    ];
    this.getAllBrands();

    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    })
  }
  getAllBrands() {
    this.categoryService.getAll()
      .subscribe({
        next: (res) => {
          this.categories = res;
          this.data = this.categories;
          this.configuration = { ...DefaultConfig };
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onEdit(row: any){
    this.isEditMode = true;
    this.categoryIdToUpdate = row.categoryId;
    this.categoryForm.setValue({
      categoryName:row.categoryName
    })
  }

  updateCategory(){
    let storeObj = {
      categoryId: this.categoryIdToUpdate,
      ...this.categoryForm.value
    };
    this.categoryService.updatecategory(storeObj)
      .subscribe(res => {
        this.isEditMode = false;
        this.toast.success({ detail: "SUCCESS", summary: "Store Updated!", duration: 2000 });
        this.categoryForm.reset();
        this.getAllBrands();
        document.getElementById("btn-close")?.click();
      });
  }

  addCategory(){
    this.categoryService.createcategory(this.categoryForm.value)
    .subscribe(res=>{
      this.categoryForm.reset();
      this.toast.success({summary:"Category Added!", detail:"SUCCESS", duration: 2000});
      this.getAllBrands();
      document.getElementById("btn-close")?.click();
    })
  }
}
