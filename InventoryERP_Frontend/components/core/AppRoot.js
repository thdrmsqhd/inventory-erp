import { BaseComponent } from 'base';

export class AppRoot extends BaseComponent {
    constructor() {
        super();
        // 초기 상태 설정
        this.state = {
            currentTitle: '대시보드',
            currentTag: 'inventory-dashboard'
        };
    }

    connectedCallback() {
        this.renderLayout();
        this.initEventListeners();
        this.updateContent();
    }

    /**
     * 전역 메뉴 변경 이벤트를 수신하여 화면을 전환합니다.
     */
    initEventListeners() {
        window.addEventListener('menu-change', (e) => {
            const { tag, title } = e.detail;
            
            // 상태 업데이트 (타이틀과 컨텐츠 태그 변경)
            this.state = Object.assign({}, this.state, {
                currentTitle: title,
                currentTag: tag
            });
            this.updateContent();
        });
    }

    /**
     * 시계 및 현재 날짜 업데이트 로직
     */
    startClock() {
        const clockEl = this.querySelector('#realtime-clock');
        if (!clockEl) return;

        const update = () => {
            const now = new Date();
            clockEl.innerText = now.toLocaleString('ko-KR', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false
            });
        };
        
        this.clockInterval = setInterval(update, 1000);
        update();
    }

    disconnectedCallback() {
        if (this.clockInterval) clearInterval(this.clockInterval);
    }

    // 초기 레이아웃 1회 렌더링
    renderLayout() {
        this.innerHTML = `
            <div class="container">
                <inventory-sidebar></inventory-sidebar>

                <main class="main-content">
                    <header class="content-header">
                        <h2 id="current-menu-title">${this.state.currentTitle}</h2>
                        <div class="header-actions">
                            <i class="fas fa-clock"></i>
                            <span id="realtime-clock"></span>
                        </div>
                    </header>
                    
                    <div id="content-area" class="content-body">
                        <!-- Content will be injected here -->
                    </div>
                </main>
            </div>
        `;
        this.startClock();
    }

    // 상태 변경 시 콘텐츠 영역만 갱신
    updateContent() {
        const titleEl = this.querySelector('#current-menu-title');
        const contentArea = this.querySelector('#content-area');
        
        if (titleEl) titleEl.innerText = this.state.currentTitle;
        if (contentArea) {
            contentArea.innerHTML = `<${this.state.currentTag}></${this.state.currentTag}>`;
        }
    }

    render() {
        // BaseComponent requirements: usually called by setState.
        // But here we use manual update logic for performance/state preservation.
    }
}

// 브라우저에 컴포넌트 등록
customElements.define('erp-app-root', AppRoot);