import { formatDate } from '@utils/date-formatting';

describe('formatDate', () => {
  it('should return Date containing yyyy/MM/DD format', () => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    expect(formattedDate.length).toBeLessThan(currentDate.toISOString().length);
    expect(formattedDate.length).toBe(10);
  });
});
