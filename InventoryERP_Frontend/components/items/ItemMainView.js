// components/items/ItemsMainView.js
import { BaseComponent } from 'base';
import { ItemsViewModel } from './ItemsViewModel.js';
import { ItemListTemplate } from './ItemListView.js';
import { ItemDetailTemplate } from './ItemDetailView.js';

export class ItemsMainView extends BaseComponent {
    constructor() {
        super();
        this.vm = new ItemsViewModel(this);
        this.state = { 
            viewMode: 'list', // 'list' 또는 'detail'
            items: [], 
            filteredItems: [], 
            selectedItem: null,
            loading: true,
            error: null
        };
    }

    connectedCallback() {
        this.vm.loadItems();
    }

    afterRender() {
        const root = this.querySelector('.items-view-root');
        if (!root) return;

        if (root.dataset.listenersBound === 'true') return;
        root.dataset.listenersBound = 'true';

        root.addEventListener('input', (e) => {
            const target = e.target;
            if (!(target instanceof HTMLInputElement)) return;
            if (target.matches('[data-action="filter"]')) {
                this.vm.filterItems(target.value);
            }
        });

        root.addEventListener('click', (e) => {
            const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
            if (!el) return;
            const action = el.getAttribute('data-action');

            if (action === 'select') {
                const id = el.getAttribute('data-id');
                if (id) this.vm.selectItem(id);
                return;
            }

            if (action === 'back') {
                this.vm.goToList();
                return;
            }
        }, { capture: true });
    }

    render() {
        if (this.state.loading) {
            this.innerHTML = `
                <div class="items-view-root">
                    <div style="padding: 16px;">로딩 중...</div>
                </div>
            `;
            return;
        }

        if (this.state.error) {
            this.innerHTML = `
                <div class="items-view-root">
                    <div style="padding: 16px; color: #c0392b;">
                        데이터를 불러오는 중 오류가 발생했습니다: ${String(this.state.error)}
                    </div>
                </div>
            `;
            return;
        }

        // 현재 화면 모드(viewMode)에 따라 목록 또는 상세 화면을 표시합니다.
        this.innerHTML = `
            <div class="items-view-root">
                ${this.state.viewMode === 'list' 
                    ? ItemListTemplate(this.state.filteredItems) 
                    : ItemDetailTemplate(this.state.selectedItem)
                }
            </div>
        `;
    }
}
if (!customElements.get('inventory-items')) {
    customElements.define('inventory-items', ItemsMainView);
}

