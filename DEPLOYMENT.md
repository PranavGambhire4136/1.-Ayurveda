# Deployment Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- PM2 (for production process management)

## Backend Deployment Steps

1. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in all required environment variables
   - Set `NODE_ENV=production`
   - Update `FRONTEND_URL` to your production frontend URL

2. Install dependencies:
```bash
npm install
```

3. Install PM2 globally:
```bash
npm install -g pm2
```

4. Start the application:
```bash
pm2 start index.js --name "ayurveda-backend"
```

## Frontend Deployment Steps

1. Update environment variables:
   - Set `VITE_API_URL` to your production backend URL

2. Build the application:
```bash
npm run build
```

3. Deploy the contents of the `dist` folder to your web server

## Security Checklist

- [ ] All environment variables are properly set
- [ ] MongoDB connection uses authentication
- [ ] CORS is configured for production domains
- [ ] SSL/TLS is enabled
- [ ] Rate limiting is configured
- [ ] Security headers are enabled
- [ ] Cookie security settings are configured for production

## Monitoring and Maintenance

- Use PM2 for process management and monitoring
- Set up logging and error tracking
- Configure automated backups for MongoDB
- Set up SSL certificate auto-renewal

## Troubleshooting

1. Cookie Issues:
   - Ensure `secure` flag is set for HTTPS
   - Check `sameSite` configuration
   - Verify domain settings
   - Check CORS configuration

2. CORS Issues:
   - Verify frontend URL in CORS configuration
   - Check allowed methods and headers
   - Ensure credentials are properly handled

3. Performance Issues:
   - Monitor MongoDB performance
   - Check server resources
   - Review API rate limiting settings
