import { formatDate } from '@utils/format-date';

describe('formatDate', () => {
  it('should return Date formatted containing only yyyy/MM/DD', () => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    expect(formattedDate.length).toBeLessThan(currentDate.toISOString().length);
    expect(formattedDate.length).toBe(10);
  });
});
