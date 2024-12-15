import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  // firstName: string="";
  // lastName: string="";
  // gender: string="";
  // age: string="";
  // email: string="";

  formData = {
    Lokasi:"",
    Tanggal:"",
    Catatan:"",
    // age:"",
    // email:""
  }
  constructor(
    private router: Router // Injeksi Router
  ) { }


  ngOnInit() {
  }

  create() {
    console.log(this.formData);

    axios.post("http://localhost/pelaporan.php", this.formData)
    .then(
      (response) => {
      console.log(response);
      alert('Data berhasil ditambahkan!');
      this.router.navigate(['/tabs/database']);
  })
  .catch((error) => {
    console.log(error);
    alert('Terjadi kesalahan saat menambahkan data!');
  })
    // console.log('create');

    // console.log(this.firstName);
    // console.log(this.lastName);
    // console.log(this.gender);
    // console.log(this.age);
    // console.log(this.email);
  }

}
