export class TransactionViewModel {
    constructor(view) {
        this.view = view;
    }

    async loadTransactions() {
        this.view.setState({ loading: true, error: null });

        // 실무 예시:
        // const [txs, items, whs] = await Promise.all([
        //     this.view.fetchAPI('/api/transactions'),
        //     this.view.fetchAPI('/api/items'),
        //     this.view.fetchAPI('/api/warehouses')
        // ]);

        const mockTransactions = [
            { id: 'TRX-001', date: '2026-01-20', type: '입고', itemId: 'ITM-001', itemName: '샘플 상품 A', qty: 50, warehouseId: 'WH-001', warehouse: '서울 1번 창고', worker: '홍길동', memo: '초기 입고' },
            { id: 'TRX-002', date: '2026-01-15', type: '출고', itemId: 'ITM-002', itemName: '샘플 컨트롤러 v2', qty: 10, warehouseId: 'WH-002', warehouse: '서울 2번 창고', worker: '이순신', memo: '프로젝트 출고' }
        ];

        const mockItems = [
            { id: 'ITM-001', name: '샘플 상품 A' },
            { id: 'ITM-002', name: '샘플 컨트롤러 v2' },
            { id: 'ITM-003', name: 'GPIO 확장 보드' }
        ];

        const mockWarehouses = [
            { id: 'WH-001', name: '서울 1번 창고' },
            { id: 'WH-002', name: '서울 2번 창고' },
            { id: 'WH-003', name: '인천 창고' },
            { id: 'WH-004', name: '부산 창고' }
        ];

        try {
            this.view.setState({
                transactions: mockTransactions,
                filteredTransactions: mockTransactions,
                items: mockItems,
                warehouses: mockWarehouses,
                loading: false,
                error: null
            });
        } catch (e) {
            this.view.setState({ loading: false, error: e?.message ?? String(e) });
        }
    }

    filterTransactions(keyword) {
        const { transactions } = this.view.state;
        const list = Array.isArray(transactions) ? transactions : [];

        const q = (keyword ?? '').trim().toLowerCase();
        if (!q) {
            this.view.setState({ filteredTransactions: list });
            return;
        }

        const filtered = list.filter(t => {
            const id = String(t?.id ?? '').toLowerCase();
            const type = String(t?.type ?? '').toLowerCase();
            const itemId = String(t?.itemId ?? '').toLowerCase();
            const itemName = String(t?.itemName ?? '').toLowerCase();
            const warehouse = String(t?.warehouse ?? '').toLowerCase();
            const worker = String(t?.worker ?? '').toLowerCase();
            return id.includes(q) || type.includes(q) || itemId.includes(q) || itemName.includes(q) || warehouse.includes(q) || worker.includes(q);
        });

        this.view.setState({ filteredTransactions: filtered });
    }

    async selectTransaction(transactionId) {
        const { transactions } = this.view.state;
        const list = Array.isArray(transactions) ? transactions : [];
        const selectedTransaction = list.find(t => t.id === transactionId);

        if (!selectedTransaction) {
            this.view.setState({
                viewMode: 'list',
                selectedTransaction: null,
                error: `선택한 거래(${String(transactionId)})를 찾을 수 없습니다.`
            });
            return;
        }

        this.view.setState({
            viewMode: 'detail',
            selectedTransaction,
            error: null
        });
    }

    goToList() {
        this.view.setState({ viewMode: 'list', selectedTransaction: null });
    }

    goToForm(transaction = null) {
        this.view.setState({
            viewMode: 'form',
            selectedTransaction: transaction
        });
    }

    async saveTransaction(formData) {
        const { transactions } = this.view.state;
        const list = Array.isArray(transactions) ? [...transactions] : [];
        const index = list.findIndex(t => t.id === formData.id);

        if (index > -1) {
            // Update
            list[index] = { ...list[index], ...formData };
        } else {
            // Create
            list.unshift(formData);
        }

        this.view.setState({
            transactions: list,
            filteredTransactions: list,
            viewMode: 'list',
            selectedTransaction: null
        });

        // Optional: show success message
        console.log('Transaction saved:', formData);
    }

    async deleteTransaction(id) {
        if (!confirm('정말로 이 입출고 기록을 삭제하시겠습니까?')) return;

        const { transactions } = this.view.state;
        const list = Array.isArray(transactions) ? transactions.filter(t => t.id !== id) : [];

        this.view.setState({
            transactions: list,
            filteredTransactions: list,
            viewMode: 'list',
            selectedTransaction: null
        });
    }
}

