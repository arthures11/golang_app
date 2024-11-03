import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from "./chat.service";

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective implements OnInit, OnDestroy {
  @Input() minSize = 200;
  @Input() maxSize = 800;
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Output() resizeEnd = new EventEmitter<void>();

  private dragging = false;
  private startPos = { x: 0, y: 0 };
  private currentPos = { x: 0, y: 0 };
  private prevSibling: HTMLElement | null = null;
  private nextSibling: HTMLElement | null = null;
  private frameRequest: number | null = null;

  constructor(private el: ElementRef<HTMLElement>, private chatService: ChatService) {}

  ngOnInit() {
    this.el.nativeElement.style.cursor = this.orientation === 'horizontal' ? 'col-resize' : 'row-resize';
    this.el.nativeElement.style.userSelect = 'none';

    this.prevSibling = this.el.nativeElement.previousElementSibling as HTMLElement;
    this.nextSibling = this.el.nativeElement.nextElementSibling as HTMLElement;

    if (this.prevSibling) {
      this.prevSibling.style.flexShrink = '0';
      this.prevSibling.style.flexGrow = '0';
    }

    if (this.nextSibling) {
      this.nextSibling.style.flexGrow = '1';
      this.nextSibling.style.flexShrink = '1';
    }

    this.setupListeners();
  }

  private setupListeners() {
    this.el.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.el.nativeElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    document.addEventListener('touchmove', this.onTouchMove.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  private onMouseDown(e: MouseEvent) {
    this.startDragging(e.clientX, e.clientY);
    e.preventDefault();
  }

  private onTouchStart(e: TouchEvent) {
    const touch = e.touches[0];
    this.startDragging(touch.clientX, touch.clientY);
    e.preventDefault();
  }

  private startDragging(clientX: number, clientY: number) {
    this.dragging = true;
    this.startPos = { x: clientX, y: clientY };
    this.currentPos = { x: clientX, y: clientY };
    this.el.nativeElement.classList.add('dragging');
  }

  private onMouseMove(e: MouseEvent) {
    if (this.dragging) {
      this.scheduleUpdate(e.clientX, e.clientY);
    }
  }

  private onTouchMove(e: TouchEvent) {
    if (this.dragging) {
      const touch = e.touches[0];
      this.scheduleUpdate(touch.clientX, touch.clientY);
    }
  }

  private scheduleUpdate(clientX: number, clientY: number) {
    this.currentPos = { x: clientX, y: clientY };
    if (this.frameRequest === null) {
      this.frameRequest = requestAnimationFrame(() => this.updatePosition());
    }
  }

  private updatePosition() {
    if (!this.prevSibling || !this.nextSibling) return;

    const delta = this.orientation === 'horizontal'
      ? this.currentPos.x - this.startPos.x
      : this.currentPos.y - this.startPos.y;

    if (this.orientation === 'horizontal') {
      let newSize = this.prevSibling.offsetWidth + delta;
      newSize = Math.max(this.minSize, Math.min(newSize, this.maxSize));
      this.prevSibling.style.width = `${newSize}px`;
      this.prevSibling.style.flexBasis = `${newSize}px`;
    } else {
      const totalHeight = this.prevSibling.offsetHeight + this.nextSibling.offsetHeight;
      let newUpperHeight = this.prevSibling.offsetHeight + delta;
      newUpperHeight = Math.max(this.minSize, Math.min(newUpperHeight, totalHeight - this.minSize));
      newUpperHeight = Math.min(newUpperHeight, this.maxSize);
      this.prevSibling.style.height = `${newUpperHeight}px`;
      this.nextSibling.style.height = `${totalHeight - newUpperHeight}px`;
    }

    this.startPos = this.currentPos;
    this.frameRequest = null;
  }

  private onMouseUp() {
    this.stopDragging();
  }

  private onTouchEnd() {
    this.stopDragging();
  }

  private stopDragging() {
    if (this.dragging) {
      this.dragging = false;
      this.el.nativeElement.classList.remove('dragging');
      this.resizeEnd.emit();
      this.chatService.triggerScrollToBottom();
    }
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
    document.removeEventListener('touchmove', this.onTouchMove.bind(this));
    document.removeEventListener('touchend', this.onTouchEnd.bind(this));
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
  }
}
