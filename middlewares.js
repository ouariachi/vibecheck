const BLOCK_TIME = 600000;
const MAX_REQUEST_PER_MINUTE = 30;
const MAX_REQUEST_WHILE_BLOCKED = 6;

/**
 * The information of these variables will be lost 
 * when the program execution is interrupted or terminated.
 */
const requestDatesByIP = {};
const blockedIPs = {};

const requestLimitMiddleware = (req, res, next) => {
  const clientIp = req.ip;
  
  if(blockedIPs[clientIp]) {
    updateBlockCount(clientIp);

    const blockData = blockedIPs[clientIp]; 
    if(blockData.count >= MAX_REQUEST_WHILE_BLOCKED) return res.status(403).json({ error: "Forbidden. You have been permanently blocked." });
    
    const diffTime = blockData.date.getTime() - Date.now();
    if(diffTime <= BLOCK_TIME) return res.status(429).json({ 
      error: `Too many requests. You can try ${MAX_REQUEST_WHILE_BLOCKED - blockData.count} more times before being permanently blocked.` 
    });
  }

  if(process.env.ALLOWED_IPS && process.env.ALLOWED_IPS.includes(clientIp)) return next();
  

  if(!requestDatesByIP[clientIp]) {
    requestDatesByIP[clientIp] = [new Date()];
    return next();
  } else {
    requestDatesByIP[clientIp].push(new Date());
  }
  
  const clientRequestDates = requestDatesByIP[clientIp];
  const lastMinuteRequests = clientRequestDates.filter(date => date.getTime() >= Date.now() - 60000);
  
  // 30 requests per minute
  if(lastMinuteRequests.length > MAX_REQUEST_PER_MINUTE) {
    updateBlockCount(clientIp);

    requestDatesByIP[clientIp] = [];
    return res.status(429).json({ error: `Too many requests. Try again later.` });
  }

  next();
};

function updateBlockCount(clientIp) {
  if(!blockedIPs[clientIp]){
    blockedIPs[clientIp] = { date: new Date(), count: 1 };
  } else {
    blockedIPs[clientIp].date = new Date();
    blockedIPs[clientIp].count++;
  }
}

module.exports = {
  requestLimitMiddleware, 
  requestDatesByIP, 
  blockedIPs
}