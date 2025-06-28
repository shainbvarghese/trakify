# Trackify Deployment Guide

This guide will help you deploy the Trackify application to various platforms.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB database (local or cloud)
- Git repository

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
```

## Local Development

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment Options

### Option 1: Heroku

1. **Create Heroku app:**
   ```bash
   heroku create your-trackify-app
   ```

2. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set NODE_ENV=production
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 2: Vercel (Frontend) + Railway (Backend)

#### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd client && npm install && npm run build`
3. Set output directory: `client/dist`
4. Set environment variables for API URL

#### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables
3. Deploy automatically

### Option 3: DigitalOcean App Platform

1. Connect your GitHub repository
2. Set environment variables
3. Configure build settings
4. Deploy

### Option 4: AWS EC2

1. **Launch EC2 instance**
2. **Install dependencies:**
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx
   ```

3. **Clone repository:**
   ```bash
   git clone your-repo-url
   cd trackify
   ```

4. **Install dependencies:**
   ```bash
   npm run install-all
   ```

5. **Build frontend:**
   ```bash
   npm run build
   ```

6. **Set up PM2:**
   ```bash
   npm install -g pm2
   pm2 start server/server.js --name trackify
   pm2 startup
   pm2 save
   ```

7. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## MongoDB Setup

### Local MongoDB
1. Install MongoDB
2. Start MongoDB service
3. Create database: `trackify`

### MongoDB Atlas (Cloud)
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Add IP whitelist
5. Create database user

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong JWT secrets
   - Use environment-specific configurations

2. **CORS Configuration:**
   - Configure CORS for production domains
   - Limit allowed origins

3. **File Uploads:**
   - Validate file types
   - Limit file sizes
   - Store files securely

4. **Database Security:**
   - Use strong passwords
   - Enable authentication
   - Use SSL connections

## Performance Optimization

1. **Frontend:**
   - Enable gzip compression
   - Use CDN for static assets
   - Optimize images
   - Enable caching

2. **Backend:**
   - Use compression middleware
   - Implement rate limiting
   - Optimize database queries
   - Use caching strategies

## Monitoring and Logging

1. **Application Monitoring:**
   - Use PM2 for process management
   - Implement health checks
   - Monitor error rates

2. **Database Monitoring:**
   - Monitor query performance
   - Set up alerts for slow queries
   - Regular backups

## Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Node.js version
   - Clear npm cache
   - Delete node_modules and reinstall

2. **Database Connection:**
   - Verify connection string
   - Check network connectivity
   - Verify credentials

3. **CORS Errors:**
   - Check CORS configuration
   - Verify allowed origins
   - Check request headers

4. **File Upload Issues:**
   - Check file size limits
   - Verify upload directory permissions
   - Check file type validation

### Debug Commands

```bash
# Check server logs
pm2 logs trackify

# Check application status
pm2 status

# Restart application
pm2 restart trackify

# Monitor resources
pm2 monit
```

## Support

For deployment issues, check:
1. Application logs
2. Server logs
3. Database logs
4. Network connectivity
5. Environment variables

Contact the development team for additional support. 