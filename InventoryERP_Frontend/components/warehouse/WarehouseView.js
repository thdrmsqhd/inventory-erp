import { BaseComponent } from 'base';
import { WarehouseViewModel } from './WarehouseViewModel.js';
import { WarehouseListTemplate } from './WarehouseListView.js';
import { WarehouseDetailTemplate } from './WarehouseDetailView.js';

export class WarehouseView extends BaseComponent {
    constructor() {
        super();
        this.vm = new WarehouseViewModel(this);
        this.state = {
            viewMode: 'list',
            warehouses: [],
            filteredWarehouses: [],
            selectedWarehouse: null,
            loading: true,
            error: null
        };
    }

    connectedCallback() {
        this.vm.loadWarehouses();
    }

    afterRender() {
        const root = this.querySelector('.warehouse-view-root');
        if (!root) return;

        if (root.dataset.listenersBound === 'true') return;
        root.dataset.listenersBound = 'true';

        root.addEventListener('input', (e) => {
            const target = e.target;
            if (!(target instanceof HTMLInputElement)) return;
            if (target.matches('[data-action="filter"]')) {
                this.vm.filterWarehouses(target.value);
            }
        });

        root.addEventListener('click', (e) => {
            const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
            if (!el) return;
            const action = el.getAttribute('data-action');

            if (action === 'select') {
                const id = el.getAttribute('data-id');
                if (id) this.vm.selectWarehouse(id);
                return;
            }

            if (action === 'back') {
                this.vm.goToList();
            }
        }, { capture: true });
    }

    render() {
        const { loading, error } = this.state;

        if (loading) {
            this.innerHTML = `
                <div class="warehouse-view-root">
                    <div style="padding: 16px;">로딩 중...</div>
                </div>
            `;
            return;
        }

        if (error) {
            this.innerHTML = `
                <div class="warehouse-view-root">
                    <div style="padding: 16px; color: #c0392b;">
                        데이터를 불러오는 중 오류가 발생했습니다: ${String(error)}
                    </div>
                </div>
            `;
            return;
        }

        this.innerHTML = `
            <div class="warehouse-view-root">
                ${this.state.viewMode === 'list'
                    ? WarehouseListTemplate(this.state.filteredWarehouses, this.vm)
                    : WarehouseDetailTemplate(this.state.selectedWarehouse)
                }
            </div>
        `;
    }
}
if (!customElements.get('inventory-warehouse')) {
    customElements.define('inventory-warehouse', WarehouseView);
}

