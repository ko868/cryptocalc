# 🚀 Crypto Calculator - Deployment Guide

## Quick Start (5분 안에 배포!)

### Option 1: Netlify (가장 쉬움) ⭐ RECOMMENDED

1. **Netlify 접속**
   - https://www.netlify.com 방문
   - "Sign up" 클릭 (GitHub/Google 계정으로 가능)

2. **사이트 배포**
   - "Add new site" → "Deploy manually" 클릭
   - 이 폴더를 드래그 앤 드롭 (index.html, styles.css, script.js)
   - 자동으로 배포 시작!

3. **완료!**
   - 2-3분 후 URL 제공됨 (예: `your-site-name.netlify.app`)
   - 무료 SSL 자동 적용

4. **커스텀 도메인 (선택사항)**
   - Site settings → Domain management
   - 도메인 연결 가능

---

### Option 2: GitHub Pages (추천)

1. **GitHub 계정 만들기**
   - https://github.com 방문
   - Sign up 클릭

2. **새 저장소 생성**
   - "New repository" 버튼 클릭
   - Repository name: `cryptocalc` (또는 원하는 이름)
   - Public 선택
   - "Create repository" 클릭

3. **파일 업로드 (GUI 방법)**
   - "uploading an existing file" 링크 클릭
   - index.html, styles.css, script.js 드래그 앤 드롭
   - "Commit changes" 클릭

4. **GitHub Pages 활성화**
   - Settings 탭 클릭
   - 왼쪽 메뉴에서 "Pages" 클릭
   - Source: "Deploy from a branch"
   - Branch: "main" 선택
   - "Save" 클릭

5. **완료!**
   - 2-3분 후: `https://your-username.github.io/cryptocalc`
   - 완전 무료, 무제한 트래픽

**Git 사용 방법 (선택사항):**
```bash
git init
git add .
git commit -m "Deploy crypto calculator"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cryptocalc.git
git push -u origin main
```

---

### Option 3: Vercel

1. **Vercel 접속**
   - https://vercel.com 방문
   - GitHub 계정으로 Sign up

2. **배포**
   - "New Project" 클릭
   - "Deploy" 탭에서 폴더 드래그 앤 드롭
   - 완료!

3. **URL 확인**
   - `your-project.vercel.app` 형식으로 제공

---

### Option 4: Cloudflare Pages

1. **Cloudflare 계정**
   - https://pages.cloudflare.com 방문
   - Sign up

2. **배포**
   - "Create a project" 클릭
   - GitHub 연동 또는 직접 업로드

---

## 💰 Google AdSense 추가 방법

### 1단계: AdSense 승인 받기
1. https://www.google.com/adsense 접속
2. 사이트 URL 등록
3. 승인 코드를 `<head>` 태그에 추가
4. 승인 대기 (1-2주)

### 2단계: 광고 유닛 생성
승인 후:
1. AdSense 대시보드 → "광고" → "광고 단위별"
2. "디스플레이 광고" 생성
3. 광고 코드 복사

### 3단계: HTML에 광고 삽입
추천 위치:

**위치 1: 계산기 위** (높은 가시성)
```html
<!-- 계산기 카드 위에 추가 -->
<div class="ad-container">
    <!-- AdSense 코드 여기에 삽입 -->
</div>
<div class="calculator-card">
```

**위치 2: 계산기 아래** (자연스러움)
```html
</div> <!-- calculator-card 닫는 태그 -->

<div class="ad-container">
    <!-- AdSense 코드 여기에 삽입 -->
</div>

<div class="features-grid">
```

**위치 3: FAQ 사이** (높은 참여율)
```html
<div class="faq-grid">
    <div class="faq-item">...</div>
    <div class="faq-item">...</div>

    <!-- 광고 삽입 -->
    <div class="faq-item ad-container">
        <!-- AdSense 코드 -->
    </div>

    <div class="faq-item">...</div>
</div>
```

**CSS 추가:**
```css
.ad-container {
    margin: 2rem 0;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 16px;
    text-align: center;
    min-height: 250px;
}
```

---

## 🌐 커스텀 도메인 연결

### 도메인 구매처
- **Namecheap** (추천): namecheap.com
- **GoDaddy**: godaddy.com
- **Google Domains**: domains.google

### 도메인 연결 방법

**GitHub Pages:**
1. Settings → Pages → Custom domain
2. 도메인 입력 (예: cryptocalc.com)
3. 도메인 제공업체에서 DNS 설정:
   ```
   Type: CNAME
   Name: www
   Value: your-username.github.io
   ```

**Netlify:**
1. Site settings → Domain management
2. "Add custom domain" 클릭
3. 자동 DNS 설정 가이드 제공

---

## 📊 Google Analytics 추가

1. **Google Analytics 계정 생성**
   - https://analytics.google.com
   - "관리" → "계정 만들기"

2. **추적 코드 받기**
   - "데이터 스트림" → "웹"
   - 측정 ID 복사 (예: G-XXXXXXXXXX)

3. **HTML에 추가**
   `index.html`의 `</head>` 태그 바로 위에:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

---

## 🔍 SEO 최적화 (검색 순위 올리기)

### Google Search Console 등록
1. https://search.google.com/search-console 접속
2. 속성 추가 → URL 입력
3. 소유권 확인
4. Sitemap 제출

### sitemap.xml 생성
`sitemap.xml` 파일 만들기:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>2025-01-21</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### robots.txt 생성
`robots.txt` 파일 만들기:
```txt
User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
```

---

## 📈 성능 최적화

### 1. 이미지 최적화
- 로고/아이콘을 SVG로 유지 (현재 완료)
- 추가 이미지는 WebP 형식 사용

### 2. 캐싱 설정
Netlify/Vercel은 자동으로 처리

### 3. CDN 활용
무료 호스팅 서비스들이 자동 제공

---

## 🎯 수익화 체크리스트

- [ ] 사이트 배포 완료
- [ ] 커스텀 도메인 연결 (선택)
- [ ] Google AdSense 신청
- [ ] AdSense 승인 (1-2주 대기)
- [ ] 광고 유닛 생성
- [ ] HTML에 광고 코드 삽입
- [ ] Google Analytics 설치
- [ ] Google Search Console 등록
- [ ] SEO 최적화 완료

---

## 💡 추가 팁

### 트래픽 늘리기
1. **소셜 미디어 홍보**
   - Reddit의 r/cryptocurrency
   - Twitter crypto 커뮤니티
   - Facebook crypto 그룹

2. **SEO 키워드**
   - "crypto calculator"
   - "bitcoin to usd converter"
   - "cryptocurrency price calculator"

3. **백링크 구축**
   - Crypto 포럼에 링크 공유
   - 블로그 게스트 포스팅

### 수익 극대화
1. **광고 위치 최적화** (A/B 테스트)
2. **콘텐츠 추가** (더 많은 페이지 = 더 많은 광고)
3. **모바일 최적화** (모바일 트래픽 많음)

---

## 🆘 문제 해결

### 사이트가 안 보여요
- 배포 후 2-3분 대기
- 캐시 삭제 (Ctrl + F5)
- 다른 브라우저에서 시도

### 광고가 안 나와요
- AdSense 승인 대기 중인지 확인
- 광고 코드가 올바른지 확인
- 트래픽이 충분한지 확인 (최소 일일 방문자 필요)

### 도메인 연결이 안 돼요
- DNS 전파 시간 대기 (최대 48시간)
- DNS 설정 재확인

---

## 📞 지원

- **GitHub Pages**: https://docs.github.com/pages
- **Netlify**: https://docs.netlify.com
- **AdSense**: https://support.google.com/adsense

---

**축하합니다! 🎉**

사이트 배포가 완료되면 전 세계 어디서나 접속 가능합니다!
미국 시장을 타겟으로 높은 AdSense 수익을 기대하세요!

Good luck! 💰
