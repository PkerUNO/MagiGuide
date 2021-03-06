import { DateTimeService } from './date-time.service';

describe('DateTimeService', () => {
	let service: DateTimeService;

	beforeEach(() => {
		service = new DateTimeService();
	});

	it('should be created', () => {
		// Assert
		expect(service).toBeTruthy();
	});

	describe('getCurrentDateTime()', () => {
		it('should return the current date and time', () => {
			// Arrange
			const mockDate = new Date('1992-04-12T09:00:00');
			jasmine.clock().install();
			jasmine.clock().mockDate(mockDate);

			// Act
			const result = service.getCurrentDateTime();

			// Assert
			expect(result).toEqual(mockDate);
			jasmine.clock().uninstall();
		});
	});

	describe('getTodayCutoff()', () => {
		beforeEach(() => {
			jasmine.clock().install();
		});

		afterEach(() => {
			jasmine.clock().uninstall();
		});

		it('should return a Date object for today at 2am', () => {
			// Arrange
			const mockDate = new Date('2018-04-12T15:39:21');
			const expectedDate = new Date('2018-04-12T02:00:00');
			jasmine.clock().mockDate(mockDate);

			// Act
			const result = service.getTodayCutoff();

			// Assert
			expect(result).toEqual(expectedDate);
		});

		it('should return a Date object for yesterday at 2am if time is between midnight and 2am', () => {
			// Arrange
			const mockDate = new Date('2019-02-25T01:23:55');
			const expectedDate = new Date('2019-02-24T02:00:00');
			jasmine.clock().mockDate(mockDate);

			// Act
			const result = service.getTodayCutoff();

			// Assert
			expect(result).toEqual(expectedDate);
		});
	});

	describe('isOlderThanHours()', () => {
		beforeEach(() => {
			jasmine.clock().install();
			jasmine.clock().mockDate(new Date('1992-04-12T20:00:00Z'));
		});

		afterEach(() => {
			jasmine.clock().uninstall();
		});

		it('should return true if date is older than current date minus supplied number of hours', () => {
			// Arrange
			const date = new Date('1992-04-12T10:00:00Z');
			const hours = 8;

			// Act
			const result = service.isOlderThanHours(date, hours);

			// Assert
			expect(result).toBe(true);
		});

		it('should return false if date is newer than current date minus supplied number of hours', () => {
			// Arrange
			const date = new Date('1992-04-12T18:00:00Z');
			const hours = 4;

			// Act
			const result = service.isOlderThanHours(date, hours);

			// Assert
			expect(result).toBe(false);
		});
	});
});
