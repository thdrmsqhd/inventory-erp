// components/transactions/TransactionsMainView.js
import { BaseComponent } from 'base';
import { TransactionViewModel } from './TransactionViewModel.js';
import { TransactionListTemplate } from './TransactionListView.js';
import { TransactionDetailTemplate } from './TransactionDetailView.js';

export class TransactionsMainView extends BaseComponent {
    constructor() {
        super();
        this.vm = new TransactionViewModel(this);
        this.state = {
            viewMode: 'list',
            transactions: [],
            filteredTransactions: [],
            selectedTransaction: null,
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

            if (action === 'back') {
                this.vm.goToList();
            }
        }, { capture: true });
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

        this.innerHTML = `
            <div class="transactions-view-root">
                ${this.state.viewMode === 'list'
                    ? TransactionListTemplate(this.state.filteredTransactions)
                    : TransactionDetailTemplate(this.state.selectedTransaction)
                }
            </div>
        `;
    }
}

if (!customElements.get('inventory-transactions')) {
    customElements.define('inventory-transactions', TransactionsMainView);
}

