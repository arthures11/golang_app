import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.css'
})
export class CoinComponent implements OnInit{

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const coin = this.renderer.selectRootElement('#coin', true);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = coin.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      this.renderer.setStyle(coin, 'transform', `
        perspective(1000px)
        rotateY(${x * 20}deg)
        rotateX(${-y * 20}deg)
        translateZ(20px)
      `);
    };

    const handleMouseLeave = () => {
      this.renderer.setStyle(coin, 'transform', 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)');
    };


    
    const handleClick = (e: MouseEvent) => {
      const ripple = this.renderer.createElement('div');
      this.renderer.addClass(ripple, 'ripple');
      const rect = coin.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.renderer.setStyle(ripple, 'left', `${x}px`);
      this.renderer.setStyle(ripple, 'top', `${y}px`);
      this.renderer.appendChild(coin, ripple);
      
      setTimeout(() => this.renderer.removeChild(coin, ripple), 123); // Match duration with animation
    
      this.renderer.setStyle(coin, 'transform', `
        perspective(300px)
        rotateY(${(x / rect.width - 0.5) * 70}deg)
        rotateX(${-(y / rect.height - 0.5) * 70}deg)
        translateZ(-10px)
      `);
      setTimeout(() => {
        this.renderer.setStyle(coin, 'transform', 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)');
      }, 100);
    
      this.showAnimatedText(e.clientX, e.clientY);
    };

   // this.renderer.listen(coin, 'mousemove', handleMouseMove);
    this.renderer.listen(coin, 'mouseleave', handleMouseLeave);
    this.renderer.listen(coin, 'click', handleClick);
  }

  async showAnimatedText(x: number, y: number) {

    const animatedText = this.renderer.createElement('div');
    this.renderer.addClass(animatedText, 'animated-text');
    this.renderer.setStyle(animatedText, 'left', `${x}px`);
    this.renderer.setStyle(animatedText, 'top', `${y}px`);
    animatedText.innerText = '+$100';
    //await new Promise(resolve => setTimeout(resolve, 90));
    document.body.appendChild(animatedText);
  
    // Generate random direction
    const randomAngle = Math.random() * 360;
    const moveX = Math.cos(randomAngle) * 50; // Adjust distance as needed
    const moveY = Math.sin(randomAngle) * 50; // Adjust distance as needed
  
    this.renderer.setStyle(animatedText, 'transform', `translate(${moveX}px, ${moveY}px)`);

    setTimeout(() => this.renderer.removeChild(document.body, animatedText), 1500);
  }
}

