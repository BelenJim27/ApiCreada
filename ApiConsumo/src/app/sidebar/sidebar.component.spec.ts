import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiderbarComponent } from './sidebar.component';


describe('SidebarComponent', () => {
  let component: SiderbarComponent;
  let fixture: ComponentFixture<SiderbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiderbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
