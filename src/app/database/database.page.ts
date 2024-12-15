import { Component, OnInit } from '@angular/core';
import { ToastButton, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { NavController } from '@ionic/angular';
import * as L from 'leaflet';
@Component({
  selector: 'app-database',
  templateUrl: './database.page.html',
  styleUrls: ['./database.page.scss'],
})
export class DatabasePage{

  // email: string ='';
  password: string ='';
  pelaporan: any []=[];
  map: L.Map | undefined;
  constructor(private router: Router, public toastController: ToastController, private navCtrl:NavController) {
    // this.getPelaporan();
  }


  ionViewDidEnter(){
    this.getpelaporan();
    this.initMap();
  }


  getpelaporan(){
    axios.get('http://localhost/pelaporan.php')
    .then(
      (response: any) => {
      console.log(response.data);
      this.pelaporan = response.data;
  })
  .catch((error: any) => {
    console.log(error)
  })
  }

  navigateToEdit(id: number){
    console.log(id);
    this.navCtrl.navigateForward(`/edit/${id}`);
  }

  deletePelaporan(id: number){
    // console.log(id)
    axios.get(`http://localhost/pelaporan.php?deleteId=${id}`)
    .then(
      (response) => {
      console.log('Response:', response.data);
    //   if (response.data.status === 'success') {
    //     // this.pelaporan = response.data.data;
    //     this.loadData(); // Pastikan fungsi ini ada untuk memuat data ulang
    // } else {
    //     console.error('Gagal menghapus data:', response.data.message);
    // }
      this.pelaporan = response.data;
      // this.pelaporan = response.data;
  })
  .catch((error: any) => {
    console.log('Error saat menghapus:', error)
  })
  }

  ionViewWillEnter() {
    this.getpelaporan(); // Pastikan data diperbarui setiap kali halaman dilihat
  }


  doRefresh(event: any) {
    console.log('Refreshing data...');
    this.loadData();  // Fungsi untuk mengambil data terbaru

    // Pastikan memberi tahu IonRefresher bahwa refresh selesai
    event.target.complete();
  }
  // ngOnInit() {
  // }

  loadData() {
    // Pastikan load data berfungsi, misalnya menggunakan axios
    axios.get('http://localhost/pelaporan.php')
      .then(response => {
        this.pelaporan = response.data;
      })
      .catch(error => {
        console.log('Error loading data:', error);
      });
  }



// onDeleteClick(id: number) {
//   console.log('Delete icon clicked for ID:', id);
//   this.deletePelaporan(id);
// }
initMap() {
  if (!this.map) {
    this.map = L.map('map').setView([-7.797068, 110.370529], 15); // Koordinat Yogyakarta
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }
  const marker = L.marker([-7.797068, 110.370529]) // Lokasi marker
      .addTo(this.map) // Tambahkan ke peta
      .bindPopup('Titik Kemacetan - Malioboro') // Popup yang muncul saat marker diklik
      .openPopup(); // Membuka popup secara default
  }


  refreshPage() {
    console.log('Refresh button clicked');
    this.getpelaporan(); // Ambil ulang data pelaporan
    this.initMap(); // Refresh peta jika diperlukan
  }
}

