import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Fastpass } from '../fastpass.model';
import { ViewFastpassComponent } from './view-fastpass.component';

describe('ViewFastpassComponent', () => {
	let compiled: any;
	let component: ViewFastpassComponent;
	let fixture: ComponentFixture<ViewFastpassComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ViewFastpassComponent ],
			imports: [ FontAwesomeModule ]
		})
		.compileComponents();

		library.add(faTrashAlt);
	}));

	beforeEach(() => {
		// Arrange
		fixture = TestBed.createComponent(ViewFastpassComponent);
		component = fixture.componentInstance;

		const inputFastpass = new Fastpass(
			'Hyperspace Mountain',
			new Date('May 27, 2018 15:20:00'),
			new Date('May 27, 2018 15:50:00'),
			new Date('May 27, 2018 12:40:00')
		);
		component.fastpass = inputFastpass;

		// Act
		fixture.detectChanges();
		compiled = fixture.debugElement.nativeElement;
	});

	it('should create', () => {
		// Assert
		expect(component).toBeTruthy();
	});

	it('should display the ride name', () => {
		// Assert
		expect(compiled.querySelector('.ride-name').textContent).toContain('Hyperspace Mountain');
	});

	it('should display the start time in 24H format', () => {
		// Assert
		expect(compiled.querySelector('.start-time').textContent).toContain('15:20');
	});

	it('should display the end time in 24H format', () => {
		// Assert
		expect(compiled.querySelector('.end-time').textContent).toContain('15:50');
	});

	it('should call removeFastpass() when the Remove button is clicked', () => {
		// Arrange
		spyOn(component, 'removeFastpass');

		// Act
		compiled.querySelector('.remove-fastpass').click();

		// Assert
		expect(component.removeFastpass).toHaveBeenCalled();
	});

	describe('removeFastpass()', () => {
		it('should emit remove with the fastpass', () => {
			// Arrange
			spyOn(component.remove, 'emit');

			// Act
			component.removeFastpass();

			// Assert
			expect(component.remove.emit).toHaveBeenCalledWith(component.fastpass);
		});
	});
});