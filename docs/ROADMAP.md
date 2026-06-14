# Roadmap — HD-WEB

## Phase 1: Technical Foundation

- [ ] Build system consolidation (Vite or Next.js)
- [ ] TypeScript strict mode
- [ ] ESLint + Prettier
- [ ] CI/CD pipeline (typecheck + lint + build)
- [ ] .env.example documented

## Phase 2: Public Content Architecture

- [ ] Landing page architecture (SEO-optimized)
- [ ] Lead capture form components
- [ ] Public vacancy listings page
- [ ] Mobile-responsive layout system
- [ ] Design system integration from HD-CORE packages/tokens

## Phase 3: Lead Capture API

- [ ] Public lead submission endpoint following docs/API_CONTRACT.md
- [ ] Rate limiting (anti-spam)
- [ ] CAPTCHA integration
- [ ] Form validation using HD-CORE validators
- [ ] Trigger `WEB_LEAD_TO_CRM` n8n workflow on submission

## Phase 4: UI Pages

- [ ] Home / landing page
- [ ] About page
- [ ] Services page
- [ ] Careers page (public vacancies from HD-RH)
- [ ] Contact page with lead capture form
- [ ] Thank-you / confirmation pages

## Phase 5: Integrations

- [ ] n8n: WEB_LEAD_TO_CRM workflow trigger
- [ ] Event bus: publish web.lead.submitted
- [ ] HD-RH: consume rh.vacancy.published for public job listings
- [ ] Analytics: anonymized page view tracking

## Phase 6: SEO & Performance

- [ ] Meta tags, Open Graph, structured data
- [ ] Sitemap generation
- [ ] Core Web Vitals optimization
- [ ] Image optimization pipeline
- [ ] CDN configuration

## Phase 7: Observability

- [ ] Lead submission rate monitoring
- [ ] Conversion funnel analytics
- [ ] Error rate alerting
- [ ] Uptime monitoring

## Phase 8: Production Readiness

- [ ] GDPR cookie consent
- [ ] Privacy policy and terms of service pages
- [ ] DDoS protection and rate limiting at CDN level
- [ ] Security headers (CSP, HSTS, X-Frame-Options)
- [ ] Accessibility audit (WCAG 2.1 AA)
