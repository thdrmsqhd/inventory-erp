// components/transactions/TransactionsMainView.js
import { BaseComponent } from 'base';
import { TransactionViewModel } from './TransactionViewModel.js';
import { TransactionListTemplate } from './TransactionListView.js';
import { TransactionDetailTemplate } from './TransactionDetailView.js';
import { TransactionFormTemplate } from './TransactionFormView.js';

export class TransactionsMainView extends BaseComponent {
    constructor() {
        super();
        this.vm = new TransactionViewModel(this);
        this.state = {
            viewMode: 'list',
            transactions: [],
            filteredTransactions: [],
            selectedTransaction: null,
            items: [],
            warehouses: [],
            loading: true,
            error: null
        };
    }

    connectedCallback() {
        this.vm.loadTransactions();
    }

    afterRender() {
        const root = this.querySelector('.transactions-view-root');
        if (!root) return;

        if (root.dataset.listenersBound === 'true') return;
        root.dataset.listenersBound = 'true';

        root.addEventListener('input', (e) => {
            const target = e.target;
            if (!(target instanceof HTMLInputElement)) return;
            if (target.matches('[data-action="filter"]')) {
                this.vm.filterTransactions(target.value);
            }
        });

        root.addEventListener('click', (e) => {
            const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
            if (!el) return;
            const action = el.getAttribute('data-action');

            if (action === 'select') {
                const id = el.getAttribute('data-id');
                if (id) this.vm.selectTransaction(id);
                return;
            }

            if (action === 'create') {
                this.vm.goToForm();
                return;
            }

            if (action === 'edit') {
                this.vm.goToForm(this.state.selectedTransaction);
                return;
            }

            if (action === 'delete') {
                const id = el.getAttribute('data-id');
                if (id) this.vm.deleteTransaction(id);
                return;
            }

            if (action === 'back') {
                this.vm.goToList();
            }
        }, { capture: true });

        root.addEventListener('submit', (e) => {
            const form = e.target;
            if (!(form instanceof HTMLFormElement)) return;
            e.preventDefault();

            const formData = new FormData(form);
            const itemParts = (formData.get('itemInfo') || '').split('|');
            const whParts = (formData.get('warehouseInfo') || '').split('|');

            const data = {
                id: formData.get('id'),
                date: formData.get('date'),
                type: formData.get('type'),
                itemId: itemParts[0] || '',
                itemName: itemParts[1] || '',
                qty: Number(formData.get('qty')),
                warehouseId: whParts[0] || '',
                warehouse: whParts[1] || '',
                worker: formData.get('worker'),
                memo: formData.get('memo')
            };

            this.vm.saveTransaction(data);
        });
    }

    render() {
        if (this.state.loading) {
            this.innerHTML = `
                <div class="transactions-view-root">
                    <div style="padding: 16px;">로딩 중...</div>
                </div>
            `;
            return;
        }

        if (this.state.error) {
            this.innerHTML = `
                <div class="transactions-view-root">
                    <div style="padding: 16px; color: #c0392b;">
                        데이터를 불러오는 중 오류가 발생했습니다: ${String(this.state.error)}
                    </div>
                </div>
            `;
            return;
        }

        let content = '';
        if (this.state.viewMode === 'list') {
            content = TransactionListTemplate(this.state.filteredTransactions);
        } else if (this.state.viewMode === 'detail') {
            content = TransactionDetailTemplate(this.state.selectedTransaction);
        } else if (this.state.viewMode === 'form') {
            content = TransactionFormTemplate(
                this.state.selectedTransaction,
                this.state.items || [],
                this.state.warehouses || []
            );
        }

        this.innerHTML = `
            <div class="transactions-view-root">
                ${content}
            </div>
        `;
    }
}

if (!customElements.get('inventory-transactions')) {
    customElements.define('inventory-transactions', TransactionsMainView);
}

