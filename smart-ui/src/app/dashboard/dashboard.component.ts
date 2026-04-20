import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cityMapCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private trafficTimer: any;

  ngAfterViewInit(): void {
    // Ensuring the DOM is loaded before we attempt to manipulate the canvas context
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
      // Clear the previous frame to prevent ghosting
      ctx.fillStyle = '#f4f4f9';
      ctx.fillRect(0, 0, canvas.width, canvas.height); 
      
      ctx.fillStyle = '#333';
      ctx.font = '13px Arial';
      ctx.fillText('🔴 LIVE: Polling Intersection IoT Sensors...', 70, 20);

      // Define the origin points for the graph axes. Leaving room for the labels.
      const groundY = 150; 
      const startX = 60;   

      // Drawing the foundational axes
      ctx.beginPath();
      ctx.moveTo(startX, 55);
      ctx.lineTo(startX, groundY); 
      ctx.lineTo(350, groundY);    
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#555';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right'; 
      ctx.fillText('100', startX - 10, groundY - 100 + 4);
      ctx.fillText('50', startX - 10, groundY - 50 + 4);
      ctx.fillText('0', startX - 10, groundY + 4);
      ctx.textAlign = 'left'; 

      // Simulating data streams
      const northTrafficVolume = Math.floor(Math.random() * 80) + 20; 
      const southTrafficVolume = Math.floor(Math.random() * 90) + 30; 
      
      // Rasterizing the bar charts based on the generated numbers
      ctx.fillStyle = '#007bff';
      ctx.fillRect(100, groundY - northTrafficVolume, 50, northTrafficVolume); 
      
      ctx.textAlign = 'center'; 
      ctx.fillStyle = '#333';
      ctx.font = '13px Arial';
      ctx.fillText('Northbound', 125, groundY + 20); 
      
      ctx.fillStyle = '#007bff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`Vol: ${northTrafficVolume}`, 125, groundY + 40); 
      
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
