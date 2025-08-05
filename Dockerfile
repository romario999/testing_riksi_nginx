# Stage 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_WAYFORPAY_MERCHANT_ACCOUNT
ARG NEXT_PUBLIC_WAYFORPAY_SECRET_KEY

ENV NEXT_PUBLIC_WAYFORPAY_MERCHANT_ACCOUNT=$NEXT_PUBLIC_WAYFORPAY_MERCHANT_ACCOUNT
ENV NEXT_PUBLIC_WAYFORPAY_SECRET_KEY=$NEXT_PUBLIC_WAYFORPAY_SECRET_KEY


COPY package*.json ./
COPY prisma ./prisma
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

#COPY --from=builder /app/schedule.mjs ./schedule.mjs


EXPOSE 3000
CMD ["node", "server.js"]
