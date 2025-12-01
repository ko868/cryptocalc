# 🚀 Crypto-Calc 배포 가이드 (한국어)

## 📋 목차
1. [Netlify 배포하기](#1-netlify-배포하기)
2. [도메인 구매하기](#2-도메인-구매하기)
3. [도메인 연결하기](#3-도메인-연결하기)
4. [Google AdSense 신청하기](#4-google-adsense-신청하기)
5. [문제 해결](#5-문제-해결)

---

## 1. Netlify 배포하기

### 준비물:
- GitHub 계정 (무료)
- Netlify 계정 (무료)

### Step 1: GitHub에 코드 업로드

**1-1. GitHub 계정 만들기**
- https://github.com 접속
- "Sign up" 클릭
- 이메일 인증 완료

**1-2. 새 Repository 만들기**
```
1. GitHub 로그인
2. 우측 상단 "+" 클릭 → "New repository"
3. Repository 이름: cryptocalc (또는 원하는 이름)
4. Public 선택 (무료)
5. "Create repository" 클릭
```

**1-3. 코드 업로드**

**방법 A: GitHub 웹사이트에서 직접 업로드 (초보자 추천)**
```
1. 생성된 Repository 페이지에서 "uploading an existing file" 클릭
2. 다음 파일들을 드래그 앤 드롭:
   - index.html
   - styles.css
   - script.js
   - privacy.html
   - terms.html
   - contact.html
3. "Commit changes" 클릭
```

**방법 B: Git 명령어 사용 (개발자용)**
```bash
# 현재 폴더에서 실행
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/당신의아이디/cryptocalc.git
git push -u origin main
```

---

### Step 2: Netlify에 배포하기

**2-1. Netlify 계정 만들기**
- https://netlify.com 접속
- "Sign up" 클릭
- "Sign up with GitHub" 선택 (가장 쉬움)
- GitHub 계정으로 로그인

**2-2. 사이트 배포**
```
1. Netlify 대시보드에서 "Add new site" 클릭
2. "Import an existing project" 선택
3. "Deploy with GitHub" 클릭
4. GitHub 권한 승인
5. Repository 선택: cryptocalc
6. 설정 확인:
   - Branch to deploy: main
   - Build command: (비워두기)
   - Publish directory: (비워두기)
7. "Deploy site" 클릭
```

**2-3. 배포 완료! 🎉**
```
몇 초 후 배포 완료!
임시 URL이 생성됩니다:
예: https://random-name-123456.netlify.app
```

**이 URL로 접속해서 사이트가 잘 작동하는지 확인하세요!**

---

## 2. 도메인 구매하기

### 추천 도메인 등록 업체:

#### 🥇 Cloudflare (가장 저렴 - 추천!)
- 가격: ~$10/년
- 웹사이트: https://www.cloudflare.com/products/registrar/
- 장점: 가장 저렴, 추가 비용 없음, DNS 빠름

#### 🥈 Namecheap (초보자 친화적)
- 가격: ~$12-15/년
- 웹사이트: https://www.namecheap.com
- 장점: 사용하기 쉬움, 한국 카드 결제 가능

#### 🥉 GoDaddy (유명함)
- 가격: ~$15-20/년
- 웹사이트: https://www.godaddy.com
- 장점: 유명하고 안정적

### 도메인 구매 방법 (Namecheap 기준):

```
1. Namecheap.com 접속
2. 검색창에 "cryptocalc.net" 입력
3. "Add to cart" 클릭
4. 옵션 선택:
   ✅ Domain Registration (1년)
   ❌ WhoisGuard (무료 포함되어 있음)
   ❌ Premium DNS (필요없음)
   ❌ Email (필요없음)
5. "Confirm Order" 클릭
6. 계정 만들기 및 결제
7. 구매 완료!
```

**💡 팁: 첫 구매 시 쿠폰 코드 검색하면 1-2달러 할인!**

---

## 3. 도메인 연결하기

### Netlify에서 설정:

**3-1. Netlify 도메인 설정**
```
1. Netlify 대시보드 → 배포한 사이트 선택
2. "Domain settings" 클릭
3. "Add custom domain" 클릭
4. "cryptocalc.net" 입력
5. "Verify" 클릭
6. "Add domain" 클릭
```

**3-2. Netlify DNS 정보 확인**
```
Netlify가 보여주는 정보를 메모하세요:
- DNS 서버 주소 또는
- A 레코드/CNAME 정보
```

---

### 도메인 등록 업체에서 DNS 설정:

#### Namecheap 설정:

**방법 A: Netlify DNS 사용 (추천 - 가장 쉬움)**
```
1. Namecheap 로그인
2. "Domain List" → cryptocalc.net 옆 "Manage" 클릭
3. "Nameservers" 섹션에서 "Custom DNS" 선택
4. Netlify DNS 서버 입력:
   - dns1.p08.nsone.net
   - dns2.p08.nsone.net
   - dns3.p08.nsone.net
   - dns4.p08.nsone.net
   (Netlify가 제공한 정확한 주소 사용)
5. ✅ 체크 클릭하여 저장
```

**방법 B: Namecheap DNS 유지 (고급)**
```
1. Namecheap 로그인
2. "Domain List" → "Manage" → "Advanced DNS"
3. "Add New Record" 클릭
4. 다음 레코드 추가:

A Record:
- Type: A Record
- Host: @
- Value: 75.2.60.5 (Netlify IP)
- TTL: Automatic

CNAME Record:
- Type: CNAME Record
- Host: www
- Value: random-name-123456.netlify.app
- TTL: Automatic

5. "Save Changes" 클릭
```

#### Cloudflare 설정:
```
1. Cloudflare 로그인
2. 도메인 선택
3. "DNS" 탭 클릭
4. "Add record" 클릭
5. 레코드 추가:
   - Type: CNAME
   - Name: @
   - Target: random-name-123456.netlify.app
   - Proxy status: Proxied (주황색)
6. www 레코드도 추가:
   - Type: CNAME
   - Name: www
   - Target: random-name-123456.netlify.app
7. "Save" 클릭
```

---

### 3-3. SSL 인증서 (HTTPS) 자동 활성화

```
1. Netlify 대시보드 → "Domain settings"
2. "HTTPS" 섹션 확인
3. "Verify DNS configuration" 클릭
4. 자동으로 Let's Encrypt SSL 인증서 발급
5. 10-30분 정도 소요
```

---

### 3-4. 연결 완료 확인

**DNS 전파 대기:**
- DNS 변경은 5분 ~ 48시간 소요 (보통 10-30분)
- https://cryptocalc.net 접속해서 확인
- https://www.cryptocalc.net도 확인

**DNS 전파 확인 도구:**
- https://www.whatsmydns.net
- 여기에 cryptocalc.net 입력하면 전세계 DNS 전파 상태 확인 가능

---

## 4. Google AdSense 신청하기

### 준비 체크리스트:
- ✅ 도메인 연결 완료 (cryptocalc.net)
- ✅ HTTPS 활성화 완료
- ✅ Privacy Policy 페이지 있음
- ✅ Terms of Service 페이지 있음
- ✅ Contact 페이지 있음
- ✅ 유용한 콘텐츠 제공
- ✅ 사이트가 정상 작동

### AdSense 신청 절차:

**4-1. Google AdSense 신청**
```
1. https://www.google.com/adsense 접속
2. "Get started" 클릭
3. Gmail 계정으로 로그인 (naomikon777@gmail.com)
4. 정보 입력:
   - Website: https://cryptocalc.net
   - Country: United States (미국 타겟팅)
5. "Save and continue" 클릭
```

**4-2. AdSense 코드 삽입**
```
Google이 제공하는 코드를 받게 됩니다:

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX"
     crossorigin="anonymous"></script>

이 코드를 index.html의 <head> 섹션에 추가하세요!
```

**4-3. 코드 삽입 방법:**

**GitHub에서 수정:**
```
1. GitHub Repository 접속
2. index.html 클릭
3. 연필 아이콘(Edit) 클릭
4. <head> 태그 안에 AdSense 코드 붙여넣기
5. "Commit changes" 클릭
```

**Netlify가 자동으로 재배포합니다! (1-2분 소요)**

**4-4. 사이트 확인**
```
1. AdSense 대시보드로 돌아가기
2. "I've placed the code" 체크
3. "Request review" 클릭
```

**4-5. 승인 대기**
```
- 검토 기간: 1-2주 (최대 4주)
- 승인 기준:
  ✅ 유용한 콘텐츠
  ✅ 정책 준수
  ✅ 충분한 트래픽 (필수는 아님)
  ✅ 독창적인 콘텐츠
```

---

### AdSense 광고 배치 (승인 후):

**index.html 수정 - 광고 위치 추천:**

**1. 헤더 아래 (상단 배너)**
```html
<header class="header">
    <!-- 기존 헤더 -->
</header>

<!-- 광고 1: 상단 배너 -->
<div style="text-align: center; margin: 20px 0;">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXX"
         data-ad-slot="XXXXX"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
```

**2. 계산기 아래 (중앙 광고)**
```html
<div class="result-section">
    <!-- 기존 결과 표시 -->
</div>

<!-- 광고 2: 계산기 하단 -->
<div style="text-align: center; margin: 30px 0;">
    <!-- AdSense 코드 -->
</div>
```

**3. 푸터 위 (하단 광고)**
```html
<!-- 광고 3: 하단 -->
<div style="text-align: center; margin: 20px 0;">
    <!-- AdSense 코드 -->
</div>

<footer class="footer">
    <!-- 기존 푸터 -->
</footer>
```

---

## 5. 문제 해결

### 문제 1: 도메인이 연결되지 않아요
```
✓ DNS 전파 대기 (최대 48시간)
✓ Netlify DNS 설정 다시 확인
✓ 도메인 등록 업체 DNS 설정 확인
✓ 브라우저 캐시 삭제 (Ctrl + F5)
✓ whatsmydns.net에서 전파 상태 확인
```

### 문제 2: HTTPS가 안 돼요
```
✓ DNS 전파 완료 후 시도
✓ Netlify에서 "Verify DNS" 클릭
✓ Let's Encrypt 인증서 발급 대기 (최대 24시간)
✓ Mixed Content 오류 확인 (http:// 링크 제거)
```

### 문제 3: AdSense 승인이 거부됐어요
```
✓ 콘텐츠 추가 (블로그 포스트, 가이드 등)
✓ Privacy Policy, Terms 페이지 확인
✓ Contact 페이지 작동 확인
✓ 최소 10-15페이지 권장
✓ 1개월 후 재신청
```

### 문제 4: GitHub 업로드가 안 돼요
```
✓ 파일 크기 확인 (100MB 이하)
✓ Repository가 Public인지 확인
✓ 파일 이름에 특수문자 없는지 확인
✓ 웹 업로드 대신 GitHub Desktop 사용 시도
```

### 문제 5: API가 작동하지 않아요
```
✓ CoinGecko API 상태 확인: https://status.coingecko.com
✓ 브라우저 콘솔(F12) 에러 확인
✓ CORS 에러 시 → 정상 (CoinGecko는 CORS 허용)
✓ API 요청 제한 확인 (무료: 10-50 calls/분)
```

---

## 📊 배포 후 체크리스트

### 필수 확인 사항:
- [ ] https://cryptocalc.net 접속 가능
- [ ] https://www.cryptocalc.net 접속 가능
- [ ] HTTPS (자물쇠 아이콘) 표시됨
- [ ] 모바일에서 정상 작동
- [ ] 계산기 기능 작동
- [ ] Privacy Policy 페이지 접속 가능
- [ ] Terms of Service 페이지 접속 가능
- [ ] Contact 페이지 접속 가능
- [ ] Light/Dark 모드 전환 작동
- [ ] API 데이터 로딩 정상
- [ ] 이메일 링크 작동 (naomikon777@gmail.com)

### SEO 최적화 (선택):
- [ ] Google Search Console 등록
- [ ] Sitemap.xml 생성
- [ ] Robots.txt 생성
- [ ] Open Graph 메타태그 추가
- [ ] Google Analytics 연결

---

## 🎉 완료!

축하합니다! 이제 여러분의 암호화폐 계산기가 전세계에 공개되었습니다!

### 다음 단계:
1. ✅ SNS에 공유하기 (Twitter, Facebook, Reddit)
2. ✅ Crypto 커뮤니티에 홍보
3. ✅ SEO 최적화로 Google 검색 노출
4. ✅ AdSense 수익 모니터링
5. ✅ 사용자 피드백 받아서 개선

### 유용한 링크:
- Netlify 대시보드: https://app.netlify.com
- Google AdSense: https://www.google.com/adsense
- CoinGecko API 문서: https://www.coingecko.com/en/api
- GitHub Repository: https://github.com/yourusername/cryptocalc

---

## 💰 수익화 팁

### AdSense 수익 극대화:
1. **광고 배치 최적화**
   - 상단 배너 (가장 높은 CPC)
   - 계산기 아래 (사용자 참여 후)
   - 사이드바 (데스크탑)

2. **트래픽 늘리기**
   - Reddit r/cryptocurrency 홍보
   - Twitter crypto 커뮤니티
   - Product Hunt 등록
   - SEO 최적화

3. **미국 트래픽 집중**
   - 미국 시간대에 홍보
   - 영어 콘텐츠 강화
   - 미국 crypto 포럼 활용

4. **CTR 향상**
   - 광고와 콘텐츠 자연스럽게 배치
   - 반응형 광고 사용
   - A/B 테스트

### 예상 수익 (미국 트래픽 기준):
- 일 방문자 100명: $1-3/일
- 일 방문자 500명: $5-15/일
- 일 방문자 1,000명: $10-30/일
- 일 방문자 10,000명: $100-300/일

**실제 수익은 CPC, CTR, 트래픽 품질에 따라 다릅니다!**

---

궁금한 점이 있으면 언제든지 물어보세요! 🚀
