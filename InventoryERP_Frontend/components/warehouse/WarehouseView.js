import { BaseComponent } from 'base';
import { WarehouseViewModel } from './WarehouseViewModel.js';
import { WarehouseListTemplate } from './WarehouseListView.js';
import { WarehouseDetailTemplate } from './WarehouseDetailView.js';
import { WarehouseFormTemplate } from './WarehouseFormView.js';

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

    async connectedCallback() {
        this.render();
        await this.vm.loadWarehouses();
    }

    initEventListeners() {
        const root = this.querySelector('.warehouse-view-root');
        if (!root || root.dataset.listenersBound) return;

        root.addEventListener('click', (e) => {
            const el = e.target.closest('[data-action]');
            if (!el) return;

            const action = el.dataset.action;
            if (action === 'select') {
                const id = el.dataset.id;
                this.vm.selectWarehouse(id);
            } else if (action === 'back') {
                this.vm.goToList();
            } else if (action === 'filter') {
                // handled by input event if needed
            } else if (action === 'create') {
                this.vm.goToForm();
            } else if (action === 'edit') {
                const id = el.dataset.id;
                this.vm.goToForm(id);
            } else if (action === 'delete') {
                const id = el.dataset.id;
                if (id && confirm('정말 삭제하시겠습니까?')) {
                    this.vm.deleteWarehouse(id);
                }
            }
        });

        root.addEventListener('input', (e) => {
            const el = e.target.closest('[data-action="filter"]');
            if (el) {
                this.vm.filterWarehouses(el.value);
            }
        });

        root.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            this.vm.saveWarehouse(data);
        });

        root.dataset.listenersBound = 'true';
    }

    render() {
        const { viewMode, warehouses, filteredWarehouses, selectedWarehouse, loading, error } = this.state;

        let content = '';
        if (loading) {
            content = '<div class="loader">창고 정보를 불러오는 중...</div>';
        } else if (error) {
            content = `<div class="error-msg">${error}</div>`;
        } else {
            switch (viewMode) {
                case 'detail':
                    content = WarehouseDetailTemplate(selectedWarehouse);
                    break;
                case 'form':
                    content = WarehouseFormTemplate(selectedWarehouse);
                    break;
                case 'list':
                default:
                    content = WarehouseListTemplate(filteredWarehouses, this.vm);
                    break;
            }
        }

        this.innerHTML = `
            <div class="warehouse-view-root">
                ${content}
            </div>
        `;

        this.initEventListeners();
    }
}

customElements.define('inventory-warehouse', WarehouseView);

