export function getReadableDateTime(dateString: string) {
    return dateString.replace('T', ' ').substring(0, 16);
  }

  export function getNewYorkTime(): string {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  
    return formatter.format(date);
  }