import { BaseComponent } from 'base';
import { ApiService } from 'services';

export class SideNavigation extends BaseComponent {
    constructor() {
        super();
        this.menuChangeHandler = this.handleExternalMenuChange.bind(this);
        // 상태에는 로딩/오류/메뉴 리스트/선택 태그를 포함
        this.state = {
            loading: true,
            error: null,
            menus: [],
            activeTag: 'inventory-dashboard'
        };
    }

    connectedCallback() {
        this.render();
        this.initEventListeners();
        this.loadMenus();
        window.addEventListener('menu-change', this.menuChangeHandler);
    }

    disconnectedCallback() {
        window.removeEventListener('menu-change', this.menuChangeHandler);
    }

    initEventListeners() {
        this.addEventListener('click', (e) => {
            const actionEl = e.target.closest('[data-action]');
            if (actionEl && actionEl.dataset.action === 'retry') {
                this.loadMenus();
                return;
            }

            const item = e.target.closest('.nav-item');
            if (!item || !this.contains(item)) return;

            const { tag, title } = item.dataset;
            if (!tag) return;

            this.handleMenuClick(tag, title);
        });
    }

    // 서버 또는 fallback 메뉴를 불러옵니다.
    async loadMenus() {
        this.setState({ loading: true, error: null });
        try {
            const menus = await ApiService.fetchNavigation();
            this.setState({ menus: Array.isArray(menus) ? menus : [], loading: false });
        } catch (error) {
            this.setState({ error: error?.message ?? '네트워크 오류', loading: false });
        }
    }

    // 메뉴 클릭 이벤트 핸들러
    handleMenuClick(tag, title) {
        this.setState({ activeTag: tag });
        
        // 전역 이벤트 발생 (AppRoot가 수신하여 화면 전환)
        window.dispatchEvent(new CustomEvent('menu-change', {
            detail: { tag, title, source: 'side-navigation' }
        }));
    }

    handleExternalMenuChange(event) {
        const { detail } = event ?? {};
        if (!detail || detail.source === 'side-navigation') {
            return;
        }

        const { tag } = detail;
        if (!tag) return;

        this.setState({ activeTag: tag });
    }

    render() {
        const { menus, activeTag, loading, error } = this.state;
        const navList = menus.map((m) => `
            <li class="nav-item ${activeTag === m.tag ? 'active' : ''}" data-tag="${m.tag}" data-title="${m.title}">
                <div class="menu-icon"><i class="${m.icon}"></i></div>
                <div class="menu-body">
                    <span>${m.title}</span>
                    ${m.description ? `<small>${m.description}</small>` : ''}
                </div>
                ${m.badge ? `<span class="menu-badge">${m.badge}</span>` : ''}
            </li>
        `).join('');

        this.innerHTML = `
            <style>
                .sidebar {
                    width: 260px;
                    height: 100%;
                    background-color: #2c3e50;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .sidebar-header {
                    padding: 28px 20px;
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
                    margin: 0;
                }
                .nav-item {
                    padding: 12px 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transition: background 0.25s ease;
                    color: #bdc3c7;
                }
                .nav-item:hover {
                    background-color: rgba(255,255,255,0.08);
                    color: #fff;
                }
                .nav-item.active {
                    background-color: #3498db;
                    color: white;
                    border-left: 4px solid white;
                }
                .menu-icon { width: 24px; text-align: center; font-size: 1rem; }
                .menu-body { flex: 1; display: flex; flex-direction: column; }
                .menu-body small {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.7);
                }
                .menu-badge {
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 0.75rem;
                    background: rgba(255,255,255,0.15);
                }
                .sidebar-footer {
                    padding: 18px 20px;
                    font-size: 0.85rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background-color: rgba(0,0,0,0.2);
                }
                .status-tag {
                    margin-left: auto;
                    font-size: 0.7rem;
                    padding: 2px 8px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.15);
                }
                .sidebar .loader {
                    padding: 16px;
                    text-align: center;
                    font-size: 0.9rem;
                }
                .sidebar .error {
                    padding: 18px;
                    text-align: center;
                    font-size: 0.85rem;
                    color: #f6c23e;
                }
                .sidebar .reload-btn {
                    border: 1px solid rgba(255,255,255,0.4);
                    background: transparent;
                    color: inherit;
                    padding: 6px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 8px;
                }
            </style>

            <nav class="sidebar">
                <div class="sidebar-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/2897/2897785.png" class="logo-img">
                    <div class="logo-text">Inventory<span>ERP</span></div>
                </div>
                ${loading ? '<div class="loader">메뉴 로딩 중...</div>' : ''}
                ${error ? `
                    <div class="error">
                        ${error}
                        <button class="reload-btn" type="button" data-action="retry">다시 시도</button>
                    </div>
                ` : ''}
                ${!loading && !error ? `<ul class="nav-list">${navList}</ul>` : ''}
                <div class="sidebar-footer">
                    <i class="fas fa-user-circle"></i> Admin (38-39)
                    <span class="status-tag">온라인</span>
                </div>
            </nav>
        `;
    }
}

customElements.define('inventory-sidebar', SideNavigation);
