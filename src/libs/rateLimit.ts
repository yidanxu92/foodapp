type RateLimitStore = {
    [key: string]: { count: number; lastRequest: number };
  };
  
  const rateLimitStore: RateLimitStore = {};
  
  const rateLimit = (limit: number, timeWindow: number) => {
    return {
      check: (key: string) => {
        const now = Date.now();
        
        if (!rateLimitStore[key]) {
          rateLimitStore[key] = { count: 1, lastRequest: now };
          return false;
        }
        
        const { count, lastRequest } = rateLimitStore[key];
        
        if (now - lastRequest < timeWindow) {
          if (count >= limit) return true;
          rateLimitStore[key].count += 1;
        } else {
          rateLimitStore[key] = { count: 1, lastRequest: now };
        }
        
        return false;
      }
    };
  };
  
  export default rateLimit;
  