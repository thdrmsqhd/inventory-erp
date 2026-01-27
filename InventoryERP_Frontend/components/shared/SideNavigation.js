import { BaseComponent } from 'base';

export class SideNavigation extends BaseComponent {
    constructor() {
        super();
        this.menus = [
            { title: '대시보드', icon: 'fas fa-chart-line', tag: 'inventory-dashboard' },
            { title: '창고관리', icon: 'fas fa-warehouse', tag: 'inventory-warehouse' },
            { title: '품목관리', icon: 'fas fa-boxes-stacked', tag: 'inventory-items' },
            { title: '입/출고관리', icon: 'fas fa-exchange-alt', tag: 'inventory-transactions' },
            { title: '사용자관리', icon: 'fas fa-users-cog', tag: 'inventory-users' }
        ];
        // 현재 선택된 태그 저장 상태
        this.state = { activeTag: 'inventory-dashboard' };
    }

    connectedCallback() {
        this.render();
        this.initEventListeners();
    }

    initEventListeners() {
        this.addEventListener('click', (e) => {
            const item = e.target.closest('.nav-item');
            if (!item || !this.contains(item)) return;

            const { tag, title } = item.dataset;
            if (!tag) return;

            this.handleMenuClick(tag, title);
        });
    }

    // 메뉴 클릭 이벤트 핸들러
    handleMenuClick(tag, title) {
        this.setState({ activeTag: tag });
        
        // 전역 이벤트 발생 (AppRoot가 수신하여 화면 전환)
        window.dispatchEvent(new CustomEvent('menu-change', {
            detail: { tag, title }
        }));
    }

    render() {
        this.innerHTML = `
            <style>
                .sidebar {
                    width: 260px;
                    height: 100%;
                    background-color: #2c3e50;
                    color: white;
                    display: flex;
                    flex-direction: column;
                }
                .sidebar-header {
                    padding: 30px 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .logo-img {
                    width: 35px;
                    height: 35px;
                    filter: brightness(0) invert(1);
                }
                .logo-text {
                    font-size: 1.2rem;
                    font-weight: bold;
                    letter-spacing: 1px;
                }
                .logo-text span { color: #3498db; }
                
                .nav-list {
                    list-style: none;
                    padding: 20px 0;
                    flex-grow: 1;
                }
                .nav-item {
                    padding: 15px 25px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    transition: all 0.2s;
                    color: #bdc3c7;
                }
                .nav-item:hover {
                    background-color: rgba(255,255,255,0.1);
                    color: white;
                }
                .nav-item.active {
                    background-color: #3498db;
                    color: white;
                    border-left: 4px solid white;
                }
                .sidebar-footer {
                    padding: 20px;
                    background-color: rgba(0,0,0,0.2);
                    font-size: 0.85rem;
                }
            </style>

            <nav class="sidebar">
                <div class="sidebar-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/2897/2897785.png" class="logo-img">
                    <div class="logo-text">Inventory<span>ERP</span></div>
                </div>
                <ul class="nav-list">
                    ${this.menus.map(m => `
                        <li class="nav-item ${this.state.activeTag === m.tag ? 'active' : ''}" data-tag="${m.tag}" data-title="${m.title}">
                            <i class="${m.icon}"></i>
                            <span>${m.title}</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="sidebar-footer">
                    <i class="fas fa-user-circle"></i> Admin (38-39)
                </div>
            </nav>
        `;
    }
}

customElements.define('inventory-sidebar', SideNavigation);
