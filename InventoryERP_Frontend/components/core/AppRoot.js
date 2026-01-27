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
        this.render();
        this.initEventListeners();
    }

    /**
     * 전역 메뉴 변경 이벤트를 수신하여 화면을 전환합니다.
     */
    initEventListeners() {
        window.addEventListener('menu-change', (e) => {
            const { tag, title } = e.detail;
            
            // 상태 업데이트 (타이틀과 컨텐츠 태그 변경)
            this.setState({
                currentTitle: title,
                currentTag: tag
            });
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
        
        setInterval(update, 1000);
        update();
    }

    // 상태가 변경될 때마다 실행되어 UI를 갱신합니다.
    render() {
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
                        <${this.state.currentTag}></${this.state.currentTag}>
                    </div>
                </main>
            </div>
        `;

        this.startClock();
    }
}

// 브라우저에 컴포넌트 등록
customElements.define('erp-app-root', AppRoot);