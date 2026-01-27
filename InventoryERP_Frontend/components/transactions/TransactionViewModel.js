export class TransactionViewModel {
    constructor(view) {
        this.view = view;
    }

    async loadTransactions() {
        this.view.setState({ loading: true, error: null });

        // 나중에 예: const txs = await this.view.fetchAPI('/api/transactions');
        const mockTransactions = [
            { id: 'TRX-001', date: '2026-01-20', type: '입고', itemId: 'ITM-001', itemName: '샘플 상품 A', qty: 50, warehouse: '서울 1번 창고', worker: '홍길동', memo: '초기 입고' },
            { id: 'TRX-002', date: '2026-01-15', type: '출고', itemId: 'ITM-002', itemName: '샘플 컨트롤러 v2', qty: 10, warehouse: '서울 2번 창고', worker: '이순신', memo: '프로젝트 출고' },
            { id: 'TRX-003', date: '2026-01-10', type: '입고', itemId: 'ITM-003', itemName: 'GPIO 확장 보드', qty: 20, warehouse: '인천 창고', worker: '홍길동', memo: '' }
        ];

        try {
            this.view.setState({
                transactions: mockTransactions,
                filteredTransactions: mockTransactions,
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
}

