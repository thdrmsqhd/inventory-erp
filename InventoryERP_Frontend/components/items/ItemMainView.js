// components/items/ItemsMainView.js
import { BaseComponent } from 'base';
import { ItemsViewModel } from './ItemsViewModel.js';
import { ItemListTemplate } from './ItemListView.js';
import { ItemDetailTemplate } from './ItemDetailView.js';
import { ItemFormTemplate } from './ItemFormView.js';

export class ItemsMainView extends BaseComponent {
    constructor() {
        super();
        this.vm = new ItemsViewModel(this);
        this.state = { 
            viewMode: 'list', // 'list', 'detail', 'form'
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

            if (action === 'create') {
                this.vm.goToForm();
            } else if (action === 'edit') {
                const id = el.getAttribute('data-id');
                this.vm.goToForm(id);
            } else if (action === 'delete') {
                const id = el.getAttribute('data-id');
                if (id && confirm('정말 이 품목을 삭제하시겠습니까?')) {
                    this.vm.deleteItem(id);
                }
            } else if (action === 'back') {
                this.vm.goToList();
            }
        });

        root.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = e.target;
            if (form.id === 'item-form') {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                this.vm.saveItem(data);
            }
        });
    }

    render() {
        const { viewMode, items, filteredItems, selectedItem, loading, error } = this.state;

        if (loading) {
            this.innerHTML = `
                <div class="items-view-root">
                    <div style="padding: 16px;">로딩 중...</div>
                </div>
            `;
            return;
        }

        if (error) {
            this.innerHTML = `
                <div class="items-view-root">
                    <div style="padding: 16px; color: #c0392b;">
                        데이터를 불러오는 중 오류가 발생했습니다: ${String(error)}
                    </div>
                </div>
            `;
            return;
        }

        let content = '';
        switch (viewMode) {
            case 'detail':
                content = ItemDetailTemplate(selectedItem);
                break;
            case 'form':
                content = ItemFormTemplate(selectedItem);
                break;
            case 'list':
            default:
                content = ItemListTemplate(filteredItems);
                break;
        }

        this.innerHTML = `
            <div class="items-view-root">
                ${content}
            </div>
        `;
    }
}
if (!customElements.get('inventory-items')) {
    customElements.define('inventory-items', ItemsMainView);
}

