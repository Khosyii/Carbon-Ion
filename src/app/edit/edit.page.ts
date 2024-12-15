import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import axios from 'axios';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  pelaporanId!: number;
  pelaporan: any;
  formData: {
    Lokasi: string;
    Tanggal: string;
    Catatan: string;
    // age: string;
    // email: string;
    pelaporanId?: number;
    update?: boolean;// Tambahkan opsional untuk pelaporanId
  } = {
    Lokasi: '',
    Tanggal: '',
    Catatan: '',
    // age: '',
    // email: '',
  };

  // formData = {
  //   firstName:"",
  //   lastName:"",
  //   gender:"",
  //   age:"",
  //   email:"",
  // }

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) =>{
      this.pelaporanId = +params['id'];
      // console.log(this.pelaporanId);
      this.getPelaporanData();
    })
  }

  getPelaporanData() {
    // axios.get('http://localhost/pelaporan.php?pelaporanId=$(this.pelaporanId)')
    axios.get(`http://localhost/pelaporan.php?pelaporanId=${this.pelaporanId}`)
    .then(
      (response: any) => {
      console.log(response.data);
      const data = response.data[0];
      if (data) {
      this.formData = {
        Lokasi:response.data[0].Lokasi,
        Tanggal:response.data[0].Tanggal,
        Catatan:response.data[0].Catatan,
        // age:response.data[0].age,
        // email:response.data[0].email,
        pelaporanId: this.pelaporanId,
      }
    }
      // this.pelaporan = response.data;
  })
  .catch((error: any) => {
    console.log(error)
  })
  }

  update() {
    console.log(this.formData)
    this.formData['update'] = true; // Menandai data untuk update
    this.formData['pelaporanId'] = this.pelaporanId; // Tambahkan ID pelaporan

    // Kirim data ke backend melalui POST
  axios.post("http://localhost/pelaporan.php", this.formData)
  .then(
    (response) => {
    console.log("Data berhasil diperbarui:", response.data);
    if(response.data == "1"){
      this.navCtrl.navigateForward('/database');
    }
  })
  .catch(error => {
    console.error("Error memperbarui data:", error);
  });
    // const payload = {
    //   ...this.formData, // Salin data dari formData
    //   update: true, // Tambahkan properti tambahan
    // };

    // axios
    //   .post('http://localhost/pelaporan.php', payload)
    //   .then((response) => {
    //     console.log('Update berhasil:', response.data);
    //     alert('Data berhasil diperbarui!');
    //   })
    //   .catch((error) => {
    //     console.error('Error updating data:', error);
    //     alert('Terjadi kesalahan saat memperbarui data.');
    //   });
  }


  // update() {
  //   console.log(this.formData);
  //   this.formData['update']= true;
  //   this.formData['pelaporanId']= this.pelaporanId;
  //   axios.post("http://localhost/pelaporan.php", this.formData)
  //   .then(
  //     (response) => {
  //     console.log(response.data);
  // })
  // .catch((error) => {
  //   console.log(error)
  // })
  // }

  //   console.log(this.formData);
  //   axios.post(`http://localhost/pelaporan.php`, {
  //     id: this.pelaporanId,
  //     ...this.formData, // Mengirim semua data form
  //   })
  //   .then((response: any) => {
  //     console.log('Data berhasil diperbarui:', response.data);
  //     alert('Data berhasil diperbarui!');
  //   })
  //   .catch((error: any) => {
  //     console.error('Error updating data:', error);
  //     alert('Terjadi kesalahan saat memperbarui data.');
  //   });
  // }


}
