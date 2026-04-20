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
      // 1. Clear the canvas
      ctx.fillStyle = '#f4f4f9';
      ctx.fillRect(0, 0, canvas.width, canvas.height); 
      
      // 2. Titles at the top
      ctx.fillStyle = '#333';
      ctx.font = '13px Arial';
      ctx.fillText('🔴 LIVE: Polling Intersection IoT Sensors...', 70, 20);

      //ctx.fillStyle = '#111';
      //ctx.font = 'bold 16px Arial';
      //ctx.fillText('Real-Time Vehicle Traffic Volume', 75, 45);
      
      // 3. Define Graph Boundaries
      const groundY = 150; // The X-axis line
      const startX = 60;   // The Y-axis line

      // 4. Draw the X and Y Axes lines
      ctx.beginPath();
      ctx.moveTo(startX, 55);
      ctx.lineTo(startX, groundY); // Vertical Y-Axis
      ctx.lineTo(350, groundY);    // Horizontal X-Axis
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5. Draw Y-Axis Scale Numbers (Left Side)
      ctx.fillStyle = '#555';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right'; // Aligns text to the left of the axis
      ctx.fillText('100', startX - 10, groundY - 100 + 4);
      ctx.fillText('50', startX - 10, groundY - 50 + 4);
      ctx.fillText('0', startX - 10, groundY + 4);
      ctx.textAlign = 'left'; // Reset alignment

      // Generate Live Data
      const northTrafficVolume = Math.floor(Math.random() * 80) + 20; 
      const southTrafficVolume = Math.floor(Math.random() * 90) + 30; 
      
      // 6. Render Northbound Bar & Bottom Text
      ctx.fillStyle = '#007bff';
      ctx.fillRect(100, groundY - northTrafficVolume, 50, northTrafficVolume); 
      
      ctx.textAlign = 'center'; // Center text under the bars
      ctx.fillStyle = '#333';
      ctx.font = '13px Arial';
      ctx.fillText('Northbound', 125, groundY + 20); 
      
      // The exact number placed below the label
      ctx.fillStyle = '#007bff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`Vol: ${northTrafficVolume}`, 125, groundY + 40); 
      
      // 7. Render Southbound Bar & Bottom Text
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(220, groundY - southTrafficVolume, 50, southTrafficVolume);
      
      ctx.fillStyle = '#333';
      ctx.font = '13px Arial';
      ctx.fillText('Southbound', 245, groundY + 20); 
      
      // The exact number placed below the label
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`Vol: ${southTrafficVolume}`, 245, groundY + 40); 
      
      ctx.textAlign = 'left'; // Reset alignment for the next frame
    }
  }
}
