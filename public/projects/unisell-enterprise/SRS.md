# SRS: UniSell Enterprise – Digital Products & SaaS Marketplace

**Version:** 3.0 (Marketplace Core)  
**Category:** E-commerce / Digital Marketplace  
**Inspiration:** Envato, Gumroad, LemonSqueezy  
**Target Audience:** Software Houses, Digital Creators, Agencies

---

## 1. 📝 Executive Summary

**UniSell Enterprise** is a high-performance, single-vendor digital marketplace platform designed to sell software, templates, APIs, and SaaS subscriptions. Unlike general e-commerce stores, UniSell is engineered specifically for **digital assets**, featuring a built-in **License Verification Server**, **DRM (Digital Rights Management)**, and **Source Code Protection**.

It operates on a **White-Label Model**, meaning the entire platform can be deployed for a client (e.g., a design agency) to sell their own assets under their own brand, with the original owner (you) retaining control via a master license.

**Core Philosophy:** "The Shopify for Software Companies."

---

## 2. 🎯 Problem Analysis (The "Why")

### 🔴 The Market Gap
Software companies and individual creators currently face a fragmented ecosystem:
1.  **Selling Code:** They use CodeCanyon (30-50% fees, high competition).
2.  **Selling SaaS:** They use Stripe/Paddle (complex integration, no storefront).
3.  **Selling Design Assets:** They use Gumroad (limited customization).

**Pain Points:**
*   **No Ownership:** You don't own the customer data on third-party marketplaces.
*   **Piracy:** Sending a ZIP file via email leads to unauthorized sharing.
*   **Licensing Hell:** Manually generating license keys for software activation is unscalable.
*   **Global Taxes:** Handling VAT/GST for 100+ countries is a legal nightmare.

### ✅ The UniSell Solution
A unified "Digital Operating System" that handles:
1.  **Asset Hosting:** Secure, encrypted storage (S3/R2) with signed download links.
2.  **Smart Licensing:** Auto-generates license keys (Standard vs Extended) that call home to verify validity.
3.  **SaaS Billing:** Built-in subscription management for recurring revenue products.
4.  **White-Labeling:** The ability to "clone" the store for a client in minutes.

---

## 3. 🛠️ Technical Architecture & Stack

### Core Stack
*   **Frontend:** Next.js 14 (App Router), React Server Components, TailwindCSS, ShadcnUI.
*   **Backend:** NestJS (Microservices Architecture).
*   **Database:** PostgreSQL (Primary Transactional), Redis (Caching), ElasticSearch (Product Search).
*   **Storage:** Cloudflare R2 (Zero egress fees) or AWS S3.
*   **Payments:** Stripe Connect (Split payments), PayPal, Crypto (USDT/USDC).
*   **DevOps:** Docker, Kubernetes (K8s), GitHub Actions.

### Key Microservices
1.  **Auth Service:** Handles JWT, 2FA, and Role-Based Access (Super Admin, Author, Customer).
2.  **Product Service:** Manages metadata, versions, and file associations.
3.  **License Service:** The "Heart" of the system. Validates keys via API (`POST /verify-license`).
4.  **Order Service:** Handles cart, checkout, and invoice generation.
5.  **Analytics Service:** Aggregates sales data for dashboards.

---

## 4. 📱 Functional Modules

### 1. Product Management (The "Envato" Model)
*   **Product Types:**
    *   **Source Code:** ZIP files with versioning (v1.0, v1.1).
    *   **SaaS:** Recurring subscription plans (Starter, Pro).
    *   **Design Assets:** Figma/PSD files.
    *   **Video Access:** Access to external video content (not an LMS, just access control).
*   **Live Preview:** Iframe-based previewer with responsive toggle (Desktop/Tablet/Mobile).
*   **Changelog System:** Automated changelog display from Git commits or manual entry.

### 2. The License Server (Anti-Piracy)
*   **Key Generation:** `US-XXXX-YYYY-ZZZZ` format.
*   **Activation Limits:** "Standard License" = 1 Domain. "Extended License" = Unlimited.
*   **Phone Home:** The sold software sends a heartbeat to UniSell to check if the license is active/banned.
*   **Revocation:** Admin can ban a key, instantly disabling the software on the client's server.

### 3. White-Label Client Engine
*   **Tenant Config:** `client-config.json` defines branding (Logo, Colors, Font).
*   **Custom Domain:** CNAME mapping allows clients to run the store on `store.their-agency.com`.
*   **SMTP Relay:** Emails sent via the client's own SMTP server.

### 4. Sales & Marketing
*   **Affiliate System:** Users can generate referral links (Cookies track for 30 days).
*   **Flash Sales:** Time-based discounts with countdown banners.
*   **Bundles:** "Buy React Template + Node Backend" for a 20% discount.

---

## 5. 🔒 Security & Compliance
*   **Signed URLs:** Download links expire in 60 minutes.
*   **Geo-Blocking:** Prevent purchases from high-risk countries.
*   **VAT Automation:** Integration with TaxJar/Quaderno for auto-tax calculation.

---

## 6. 📅 Implementation Roadmap (For Developers)

### Phase 1: Core Commerce (Weeks 1-4)
*   Setup Next.js + NestJS monorepo.
*   Implement Auth (Clerk or Custom JWT).
*   Build Product Listing and Detail pages.
*   Integrate Stripe Checkout.

### Phase 2: The License Engine (Weeks 5-6)
*   Build `LicenseService`.
*   Create API endpoints for verification.
*   Implement "My Licenses" dashboard for users.

### Phase 3: Asset Management (Weeks 7-8)
*   Integrate Cloudflare R2.
*   Build Secure Download Manager (Signed URLs).
*   Implement Version Control system for products.

### Phase 4: Analytics & Polish (Weeks 9-10)
*   Build Admin Dashboard (Recharts).
*   Implement Affiliate System.
*   SEO Optimization (Sitemap, Metadata).
