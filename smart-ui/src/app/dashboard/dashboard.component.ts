import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule], // Allows us to bind HTML inputs to TypeScript variables
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cityMapCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private trafficTimer: any;
  private http = inject(HttpClient); // Injecting the HTTP service

  
  private readonly API_CONFIG = {
    gatewayUrl: 'http://127.0.0.1:3000/api/register'
  };

  // Data model bound to our HTML form
  citizenData = {
    name: '',
    nationalId: '',
    email: ''
  };

  // The function triggered by the Submit button
  submitRegistration() {
    this.http.post(this.API_CONFIG.gatewayUrl, this.citizenData)
      .subscribe({
        next: (response: any) => {
          alert('Success! Citizen profile dispatched to Node.js Gateway and saved in MongoDB.');
          console.log('[Client] Registration successful:', response);
          // Clear the form after successful submission
          this.citizenData = { name: '', nationalId: '', email: '' };
        },
        error: (err) => {
          alert('Validation Error: Check the browser console or Node.js terminal. Ensure the National ID is unique.');
          console.error('[Client Error]', err);
        }
      });
  }

  ngAfterViewInit(): void {
    // Ensuring the DOM is loaded before manipulating the graphics canvas
    this.trafficTimer = setInterval(() => this.renderLiveTraffic(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.trafficTimer);
  }

  renderLiveTraffic() {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Clear previous frame
      ctx.fillStyle = '#f4f4f9';
      ctx.fillRect(0, 0, canvas.width, canvas.height); 
      
      ctx.fillStyle = '#333';
      ctx.font = '13px Arial';
      ctx.fillText('🔴 LIVE: Polling Intersection IoT Sensors...', 70, 20);

      const groundY = 150; 
      const startX = 60;   

      // Draw Axes
      ctx.beginPath();
      ctx.moveTo(startX, 55);
      ctx.lineTo(startX, groundY); 
      ctx.lineTo(350, groundY);    
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Scale
      ctx.fillStyle = '#555';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right'; 
      ctx.fillText('100', startX - 10, groundY - 100 + 4);
      ctx.fillText('50', startX - 10, groundY - 50 + 4);
      ctx.fillText('0', startX - 10, groundY + 4);
      ctx.textAlign = 'left'; 

      // Data simulation
      const northTrafficVolume = Math.floor(Math.random() * 80) + 20; 
      const southTrafficVolume = Math.floor(Math.random() * 90) + 30; 
      
      // Rasterize Northbound
      ctx.fillStyle = '#007bff';
      ctx.fillRect(100, groundY - northTrafficVolume, 50, northTrafficVolume); 
      ctx.textAlign = 'center'; 
      ctx.fillStyle = '#333';
      ctx.font = '13px Arial';
      ctx.fillText('Northbound', 125, groundY + 20); 
      ctx.fillStyle = '#007bff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`Vol: ${northTrafficVolume}`, 125, groundY + 40); 
      
      // Rasterize Southbound
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(220, groundY - southTrafficVolume, 50, southTrafficVolume);
      ctx.fillStyle = '#333';
      ctx.font = '13px Arial';
      ctx.fillText('Southbound', 245, groundY + 20); 
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`Vol: ${southTrafficVolume}`, 245, groundY + 40); 
      
      ctx.textAlign = 'left'; 
    }
  }
}
