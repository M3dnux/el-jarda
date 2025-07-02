# Use Node.js 18 Alpine image for smaller size
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application
COPY . .

# Build the React frontend
RUN npm run build

# Create uploads directory with proper permissions
RUN mkdir -p public/uploads && chmod 755 public/uploads

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app

# Switch to the non-root user
USER nextjs

# Expose the port (Koyeb will set the PORT environment variable)
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
